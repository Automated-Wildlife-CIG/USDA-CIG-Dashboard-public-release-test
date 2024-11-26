CREATE OR REPLACE FUNCTION fn_fdtlrw_deployment_num_json(user_profile_id INTEGER, user_first_name TEXT)
RETURNS json
AS 
$body$
DECLARE
table_name text;
user_device_data jsonb;
r RECORD;
BEGIN
-- Given the user_profile_id and user_first_name - Get all device EUI's and deployment numbers
-- This is used to populate the user-dashboard dropdown
user_device_data := json_build_object(
	'userId', user_profile_id, 
	'firstName',user_first_name, 
	'userDeviceData', json_build_array());
-- RAISE NOTICE 'user_profile_id: %', user_profile_id;
-- RAISE NOTICE 'device_data: %', user_device_data;

-- loop through the devices for the given user
FOR r IN
	SELECT DISTINCT ON (d.dev_eui::text, (((get_byte(du.data, 3)) & 15) * 256) + get_byte(du.data, 4))
	d.dev_eui::text AS dev_eui,
	(((get_byte(du.data, 3)) & 15) * 256) + get_byte(du.data, 4) AS deployment_num
	FROM device d
	JOIN device_up du ON d.dev_eui::text = encode(du.dev_eui, 'hex')
	WHERE d.user_id = user_profile_id

LOOP
	-- generate temp table using the dev_eui and deployment_num
	table_name := format('fdtlrw%s_%s', r.dev_eui, r.deployment_num);
	-- RAISE NOTICE 'table_name: %', table_name;
	
	-- insert data from generated table into device data
	user_device_data := jsonb_insert(
		user_device_data, 
		'{userDeviceData, -1}'::text[], 
		json_build_object(
			'deviceEUI', r.dev_eui, 
			'deploymentNumber', r.deployment_num
			)::jsonb, false);

	END LOOP;

	-- return the final device data as JSON
	RETURN user_device_data;
END;
$body$
LANGUAGE plpgsql;


SELECT * FROM fn_generate_device_data_json(1, 'Doug');