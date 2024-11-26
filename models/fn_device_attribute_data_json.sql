CREATE OR REPLACE FUNCTION fn_device_attribute_data_json(user_profile_id INTEGER, user_first_name TEXT)
RETURNS json
AS 
$body$
DECLARE
table_name text;
device_data jsonb;
center_cords jsonb;
image_names_txt text[];
r RECORD;
table_exists BOOLEAN;
BEGIN
-- This will get all of the attribute data for the initial map load. 
-- This will be by user id - Only the devices that belong to them and all deployments
device_data := json_build_object(
    'userId', user_profile_id, 
    'firstName',user_first_name, 
    'userDeviceData', json_build_array());

-- loop through the devices for the given user
FOR r IN
    SELECT DISTINCT ON (d.dev_eui::text, (((get_byte(du.data, 3)) & 15) * 256) + get_byte(du.data, 4))
    d.dev_eui::text AS dev_eui,
    (((get_byte(du.data, 3)) & 15) * 256) + get_byte(du.data, 4) AS deployment_num,
    d.date_deployed,
    d.project_name,
    d.marker_name,
    d.project_description, 
    d.image_name,
    t.type,
    t.taxonomy_desc
    FROM device d
    JOIN device_up du ON d.dev_eui::text = encode(du.dev_eui, 'hex')
    JOIN taxonomy t ON d.taxonomy_id = t.id
    WHERE d.user_id = user_profile_id

LOOP
    -- generate temp table using the dev_eui and deployment_num
    table_name := format('fdtlrw%s_%s', r.dev_eui, r.deployment_num);
    
    -- check if table exists
    EXECUTE format('SELECT to_regclass(''%I'') IS NOT NULL', table_name) INTO table_exists;

    IF table_exists THEN
        -- get center coordinates from generated table
        EXECUTE format('SELECT json_build_object(''lat'', latitude::numeric, ''lng'', longitude::numeric) 
            FROM %I', table_name) LIMIT 1 INTO center_cords;

        -- get distinct image names from generated table
        EXECUTE format('SELECT array_agg(DISTINCT image_name) FROM %I', table_name) INTO image_names_txt;
        -- RAISE NOTICE 'image_names_txt: %', image_names_txt;

        -- insert data from generated table into device data
        device_data := jsonb_insert(
            device_data, 
            '{userDeviceData, -1}'::text[], 
            json_build_object(
                'deviceEUI', r.dev_eui, 
                'deploymentNumber', r.deployment_num, 
                'projectName', r.project_name, 
                'image',r.image_name,
                'markerName',r.marker_name,
                'dateDeployed',r.date_deployed,
                'projectDescription',r.project_description,
                'taxonomyDesc',r.taxonomy_desc, 
                'type',r.type,
                'centerCords', center_cords,
                'imageNames', image_names_txt)::jsonb, false);
    END IF;
END LOOP;

-- return the final device data as JSON
RETURN device_data;
END;
$body$
LANGUAGE plpgsql;

SELECT * FROM fn_device_attribute_data_json(2, 'Jenny');