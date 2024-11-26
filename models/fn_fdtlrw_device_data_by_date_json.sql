CREATE OR REPLACE FUNCTION fn_fdtlrw_device_data_by_date_json(device_eui TEXT, deployment_num TEXT, start_date DATE, end_date DATE)
RETURNS json
AS 
$body$
DECLARE
    table_name TEXT;
    device_data JSONB;
    chart_data TEXT[][];
    lidar_data TEXT[][];
    data_num TEXT[][];

BEGIN
    -- Query only one fdtlrw table by:
    -- device_eui, deployment_num, start_date, end_date
    device_data := json_build_object(
        'deviceEUI', device_eui,
        'deploymentNum', deployment_num, 
        'userDeviceData', json_build_array()
    );

    -- Generate temp table using the device_eui and deployment_num
    table_name := format('fdtlrw%s_%s', device_eui, deployment_num);

    -- Generate chartData from the generated table - array 
    EXECUTE format('SELECT array_agg(array[
        to_char(timestamp_utc, ''MM/DD/YYYY HH24:MI''), 
        temperature::text, 
        ambient_light::text,
        total_detects::text
    ]) FROM %I WHERE date_utc >= %L AND date_utc <= %L', 
    table_name, start_date, end_date) INTO chart_data;

    EXECUTE format('SELECT array_agg(array[ 
        num_new_detects::text, 
        secs_until_sign_switch::text,
        direction::text,
        max_left_right_diff::text
    ]) FROM %I WHERE date_utc >= %L AND date_utc <= %L', 
    table_name, start_date, end_date) INTO data_num;

    -- Build the array of data for lidar surface chart
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
        zone_43_range,
        zone_44_range,
        zone_45_range,
        zone_50_range,
        zone_51_range,
        zone_52_range,
        zone_53_range,
        zone_58_range,
        zone_59_range,
        zone_60_range,
        zone_61_range
    ]) FROM %I WHERE date_utc >= %L AND date_utc <= %L',
    table_name, start_date, end_date) INTO lidar_data;

    -- Insert data from the generated table into device data
    device_data := jsonb_insert(
        device_data, 
        '{userDeviceData, -1}'::text[], 
        json_build_object(
            'chartData', chart_data, 
            'lidarData', lidar_data,
            'dataNum', data_num
        )::jsonb, false
    );

    -- Return the final device data as JSON
    RETURN device_data;
END;
$body$
LANGUAGE plpgsql;

SELECT * FROM fn_fdtlrw_device_data_by_date_json('000b33394fb60bc8', '0', '2023-04-13', '2023-04-14');
