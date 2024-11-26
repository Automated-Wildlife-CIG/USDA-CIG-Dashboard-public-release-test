-- This function will check all tables starting with fdtltw
-- Will check latitude and longitude for rows with '#'
CREATE OR REPLACE FUNCTION fn_check_bad_data()
RETURNS SETOF text AS $$
DECLARE
    _table_name text;
    _exists boolean;
BEGIN
    FOR _table_name IN
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name LIKE 'fdtlrw%'
    LOOP
        EXECUTE format('
            SELECT EXISTS (
                SELECT 1
                FROM %I
                WHERE latitude::text LIKE ''%%#%%'' OR longitude::text LIKE ''%%#%%''
            )', _table_name)
        INTO _exists;

        IF _exists THEN
            RETURN NEXT _table_name;
        END IF;
    END LOOP;
    RETURN;
END; $$ LANGUAGE plpgsql;

SELECT * FROM fn_check_bad_data();