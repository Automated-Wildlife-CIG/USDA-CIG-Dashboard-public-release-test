CREATE OR REPLACE FUNCTION fn_generate_device_data_json(user_profile_id INTEGER, user_first_name TEXT)
RETURNS json
AS 
$body$
DECLARE
table_name text;
device_data jsonb;
center_cords jsonb;
chart_data text[][];
lidar_data text[][];
data_num text[][];
image_names_txt text[];
r RECORD;
BEGIN
-- initialize user device data
device_data := json_build_object(
	'userId', user_profile_id, 
	'firstName',user_first_name, 
	'userDeviceData', json_build_array());
RAISE NOTICE 'user_profile_id: %', user_profile_id;
RAISE NOTICE 'device_data: %', device_data;

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

	-- retrieve center coordinates from generated table
	EXECUTE format('SELECT json_build_object(''lat'', latitude::numeric, ''lng'', longitude::numeric) 
		FROM %I', table_name) LIMIT 1 INTO center_cords;

	-- retrieve distinct image names from generated table
	EXECUTE format('SELECT array_agg(DISTINCT image_name) FROM %I', table_name) INTO image_names_txt;

	-- generate chartData from the generated table - array 
	EXECUTE format('SELECT array_agg(array[
		to_char(timestamp_utc, ''MM/DD/YYYY HH24:MI''), 
		temperature::text, 
		ambient_light::text,
		total_detects::text]) FROM %I', 
		table_name) INTO chart_data;
	-- RAISE NOTICE 'chart_data: %', chart_data;

	EXECUTE format('SELECT array_agg(array[ 
		num_new_detects::text, 
		secs_until_sign_switch::text,
		direction::text,
		max_left_right_diff::text]) FROM %I', 
		table_name) INTO data_num;

	-- build the array of data for lidar surface chart
	EXECUTE format('SELECT array_agg(array[
		zone_2_range,
		zone_3_range,
		zone_4_range,
		zone_5_range,
		zone_10_range,
		zone_11_range,
		zone_12_range,
		zone_13_range,
		zone_18_range,
		zone_19_range,
		zone_20_range,
		zone_21_range,
		zone_26_range,
		zone_27_range,
		zone_28_range,
		zone_29_range,
		zone_34_range,
		zone_35_range,
		zone_36_range,
		zone_37_range,
		zone_42_range,
		zone_45_range,
		zone_50_range,
		zone_51_range,
		zone_52_range,
		zone_53_range,
		zone_58_range,
		zone_59_range,
		zone_60_range,
		zone_61_range]) FROM %I',
		table_name) INTO lidar_data;

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
			'chartData', chart_data, 
			'lidarData', lidar_data,
			'dataNum', data_num,
			'imageNames', image_names_txt)::jsonb, false);

	END LOOP;

	-- return the final device data as JSON
	RETURN device_data;
END;
$body$
LANGUAGE plpgsql;


SELECT * FROM fn_generate_device_data_json(1, 'Doug');