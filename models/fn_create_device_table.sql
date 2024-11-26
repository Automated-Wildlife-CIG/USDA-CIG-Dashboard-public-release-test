CREATE OR REPLACE FUNCTION public.fn_update_device_table()
  RETURNS trigger
AS $function$
DECLARE
    table_name TEXT;
    user_id INTEGER;
    device_id INTEGER;
BEGIN
    -- Create table or populate table fdtlrw[dev_eui][deployment_num]
    table_name := format('fdtlrw%s_%s',
    	encode(NEW.dev_eui, 'hex'),
    	(((get_byte(NEW.data, 3) & 15)*256)+get_byte(NEW.data, 4))::text); 
	--RAISE NOTICE 'DEVICE EUI %', encode(New.dev_eui, 'hex');
	--RAISE NOTICE 'Deployment Number %',(((get_byte(NEW.data, 3) & 15)*256)+get_byte(NEW.data, 4))::text;

    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = table_name) THEN
        EXECUTE format('CREATE TABLE %I (
            id SERIAL PRIMARY KEY,
            dev_eui VARCHAR(25),
            device_up_id UUID,
            user_id INTEGER,
            device_id INTEGER NOT NULL,
			device_addr INTEGER NOT NULL,
			pkg_type SMALLINT NOT NULL,
    		pkg_len SMALLINT NOT NULL,
			date_utc DATE,
			time_utc TIME WITH TIME ZONE NOT NULL,
            timestamp_utc TIMESTAMP WITH TIME ZONE NOT NULL,
			deployment_num SMALLINT NOT NULL,
			latitude VARCHAR(9) NOT NULL,
			longitude VARCHAR(10) NOT NULL,
			temperature SMALLINT NOT NULL,
			ambient_light SMALLINT NOT NULL,
            water_flow SMALLINT NOT NULL,		
			total_detects SMALLINT NOT NULL,
			num_new_detects SMALLINT NOT NULL,
			secs_until_sign_switch SMALLINT NOT NULL,
            direction VARCHAR(5) NOT NULL,
			max_left_right_diff SMALLINT NOT NULL,
			zone_2_range SMALLINT NOT NULL,
			zone_3_range SMALLINT NOT NULL, 
			zone_4_range SMALLINT NOT NULL, 
			zone_5_range SMALLINT NOT NULL, 
			zone_10_range SMALLINT NOT NULL,
			zone_11_range SMALLINT NOT NULL,
            zone_12_range SMALLINT NOT NULL,
            zone_13_range SMALLINT NOT NULL,
            zone_18_range SMALLINT NOT NULL,
            zone_19_range SMALLINT NOT NULL,
			zone_20_range SMALLINT NOT NULL,
            zone_21_range SMALLINT NOT NULL,
            zone_26_range SMALLINT NOT NULL,
            zone_27_range SMALLINT NOT NULL,
            zone_28_range SMALLINT NOT NULL,
            zone_29_range SMALLINT NOT NULL,
            zone_34_range SMALLINT NOT NULL,
            zone_35_range SMALLINT NOT NULL,
            zone_36_range SMALLINT NOT NULL,
            zone_37_range SMALLINT NOT NULL,
            zone_42_range SMALLINT NOT NULL,
            zone_43_range SMALLINT NOT NULL,
            zone_44_range SMALLINT NOT NULL,
            zone_45_range SMALLINT NOT NULL,
            zone_50_range SMALLINT NOT NULL,
            zone_51_range SMALLINT NOT NULL,
            zone_52_range SMALLINT NOT NULL,
            zone_53_range SMALLINT NOT NULL,
            zone_58_range SMALLINT NOT NULL,
            zone_59_range SMALLINT NOT NULL,
            zone_60_range SMALLINT NOT NULL,
            zone_61_range SMALLINT NOT NULL,
			image_type SMALLINT NOT NULL,
			image_time SMALLINT NOT NULL,
			image_id SMALLINT NOT NULL,
			start_block SMALLINT NOT NULL,
			end_block SMALLINT NOT NULL,
			image_data SMALLINT NOT NULL,
			image_name VARCHAR(50) NOT NULL,		   
            CONSTRAINT fk_device_up FOREIGN KEY (device_up_id)
                REFERENCES public.device_up (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE SET NULL,
            CONSTRAINT fk_user FOREIGN KEY (user_id)
                REFERENCES public.user_profile (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE SET NULL,
            CONSTRAINT fk_device FOREIGN KEY (device_id)
                REFERENCES public.device (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE SET NULL
            )', table_name);
    END IF;

    -- Get the user_id and device_id for the given dev_eui from the device table
    SELECT device.user_id, device.id 
	INTO user_id, device_id 
	FROM public.device 
	WHERE dev_eui = encode(NEW.dev_eui, 'hex')::text;

    EXECUTE format('INSERT INTO %I (
        dev_eui, device_up_id, user_id, device_id, 
        device_addr, pkg_type, pkg_len, date_utc, time_utc, timestamp_utc, deployment_num, 
        latitude, longitude, temperature, ambient_light, water_flow, total_detects, 
        num_new_detects, secs_until_sign_switch, direction, max_left_right_diff, 

        zone_2_range,  zone_3_range,  zone_4_range,  zone_5_range, 
        zone_10_range, zone_11_range, zone_12_range, zone_13_range,
        zone_18_range, zone_19_range, zone_20_range, zone_21_range,
        zone_26_range, zone_27_range, zone_28_range, zone_29_range,
        zone_34_range, zone_35_range, zone_36_range, zone_37_range,
        zone_42_range, zone_43_range, zone_44_range, zone_45_range,
        zone_50_range, zone_51_range, zone_52_range, zone_53_range,
        zone_58_range, zone_59_range, zone_60_range, zone_61_range,

        image_type, image_time, image_id, start_block,
        end_block, image_data, image_name)
		VALUES (
            $1, $2, $3, $4, 
            $5, $6, $7, $8, $9, $10, $11,
            $12, $13, $14, $15, $16, $17,
            $18, $19, $20, $21, 

            $22, $23, $24, $25, 
            $26, $27, $28, $29,
            $30, $31, $32, $33, 
            $34, $35, $36, $37, 
            $38, $39, $40, $41, 
            $42, $43, $44, $45, 
            $46, $47, $48, $49, 
            $50, $51, $52, $53, 
            
            $54, $55, $56, $57,
            $58, $59, $60)', table_name)
    USING encode(NEW.dev_eui, 'hex')::text,
		NEW.id, 
		user_id, 
		device_id,
		((get_byte(NEW.dev_addr,0))*16777216) + ((get_byte(NEW.dev_addr,1))*65536) +
		((get_byte(NEW.dev_addr,2))*256) + (get_byte(NEW.dev_addr,3)),
		((get_byte(NEW.data, 0)) & 240) / 16, --pkg_type
		length(NEW.data), --pk_len
	
	    ((((get_byte(New.data, 0) & 15) + 2020)::CHAR(4)) || 
		    '-' || (((get_byte(New.data, 1) & 240) / 16)::INTEGER::CHAR(2)) ||
		    '-' || (((get_byte(New.data, 1) & 15) * 2) + ((get_byte(New.data, 2) & 128) / 128)::INTEGER))::DATE, -- Date

		((((((get_byte(New.data, 2)) & 124))/4)::CHAR(2)) || ':' 
		    || (((((get_byte(New.data, 2)) & 3)*16)+(((get_byte(New.data, 3)) & 240)/16))::CHAR(2)) || ':00')::time AT TIME ZONE 'UTC', --time_utc

        (
            (
                ((get_byte(New.data, 0) & 15) + 2020)::CHAR(4) || '-' ||
                (((get_byte(New.data, 1) & 240) / 16)::INTEGER)::CHAR(2) || '-' ||
                (((get_byte(New.data, 1) & 15) * 2) + ((get_byte(New.data, 2) & 128) / 128)::INTEGER)::CHAR(2)
            ) || ' ' ||
            (
                ((((get_byte(New.data, 2)) & 124))/4)::CHAR(2) || ':' ||
                ((((get_byte(New.data, 2)) & 3)*16)+(((get_byte(New.data, 3)) & 240)/16))::CHAR(2) || ':00'
            )
        )::timestamp AT TIME ZONE 'UTC' AS timestamp_utc, -- timpestamp_utc

		(((get_byte(NEW.data, 3)) & 15)*256)+(get_byte(NEW.data, 4)), --deploy_num
		CASE WHEN (((get_byte(NEW.data,5))&64)/64) = 0 THEN '+' ELSE '-' END ||(((get_byte(NEW.data,5)&63)*2)+((get_byte(NEW.data,6)&128)/128))::CHAR(2)||'.'||TO_CHAR((((get_byte(NEW.data,6)&127)*1024)+((get_byte(NEW.data,7)*4))+((get_byte(NEW.data,8)&192)/64)), 'fm00000'), --latitude
		CASE WHEN (((get_byte(NEW.data,8))&32)/32) = 0 THEN '+' ELSE '-' END ||(((get_byte(NEW.data,8)&31)*8)+((get_byte(NEW.data,9)&224)/32))::CHAR(3)||'.'||TO_CHAR((((get_byte(NEW.data,9)&31)*4096)+((get_byte(NEW.data,10)*16))+((get_byte(NEW.data,11)&240)/16)), 'fm00000'), --lonngitude 
		(((get_byte(NEW.data, 11)) & 15)*256)+(get_byte(NEW.data, 12)),	--temp
		get_byte(NEW.data, 13), --light
        1, --waterflow
		(get_byte(NEW.data, 14))/4, --total_detects "aka motion"
		(((get_byte(NEW.data, 14)) & 3)*16) + (((get_byte(NEW.data, 15)))/64), --total_new_detects
		((get_byte(NEW.data, 15)) & 63), --secs_until_sign_switch_
        'Left', --direction
		get_byte(NEW.data,16), --max_left_right_diff
		get_byte(NEW.data,17), --zone_2_range
		get_byte(NEW.data,18), 
		get_byte(NEW.data,19),
        get_byte(NEW.data,20),
        get_byte(NEW.data,21), -- zone_10_range
        get_byte(NEW.data,22),
		get_byte(NEW.data,23),
        get_byte(NEW.data,24),
        get_byte(NEW.data,25), --zone_18_range
        get_byte(NEW.data,26), --zone_19_range
        get_byte(NEW.data,27), 
        get_byte(NEW.data,28),
        get_byte(NEW.data,29),
        get_byte(NEW.data,30),
        get_byte(NEW.data,31),
        get_byte(NEW.data,32), --zone_29_range
        get_byte(NEW.data,33), --zone_34_range
        get_byte(NEW.data,34),
        get_byte(NEW.data,35),
        get_byte(NEW.data,36),
        get_byte(NEW.data,37), --zone_44_range
        get_byte(NEW.data,38),
        get_byte(NEW.data,39),
        get_byte(NEW.data,40),
		get_byte(NEW.data,41), --zone_50_range
        get_byte(NEW.data,42),
        get_byte(NEW.data,43),
        get_byte(NEW.data,44),
        get_byte(NEW.data,45), --zone_58
        get_byte(NEW.data,46), --zone_59
        get_byte(NEW.data,47), --zone_60
        get_byte(NEW.data,48), --zone_61
		1, --image_type
		1, --image_time
		1, --image_id
		1, --start_block
		1, --end_block
		1, --image-data
		'S8107RF140708101_200516160007_00.jpg'; --image_name
		--((get_byte("data",49))*256) + (get_byte("data",50)); --crc16
    RETURN NEW;
END;
$function$
LANGUAGE plpgsql;