import { pool } from "../../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";

/* 
This request will get all of the distinct dates for a given device EUI & deployment number.
The dates will be an array of string  and used within getSensorySurfaceData function:
-  `/api/user-device-data/chart-data?devEui=${devEui}&depNum=${depNum}&startDate=${startDate}&endDate=${endDate}&timeZoneOffset=${timeZoneOffset}`,
*/
export async function GET(req) {
  try {
    const devEui = req.nextUrl.searchParams.get("devEui");
    const depNum = req.nextUrl.searchParams.get("depNum");
    const table = `fdtlrw${devEui}_${depNum}`;
    const dateUtc = "date_utc";

    // first query database for range of distinct dates
    const distQuery = {
      text: `SELECT DISTINCT(${dateUtc}) FROM ${table} ORDER BY date_utc DESC`,
    };

    const results = await pool.query(distQuery);
    const distDates = results.rows;
    // convert to array of dates w/yyyy-mm-dd format
    const distDatesArr = distDates.map((idx) => {
      // convert date to
      const deviceDates = idx.date_utc.toISOString().substring(0, 10);
      return deviceDates;
    });

    // Get the first 10 dates
    const firstTenDates = distDatesArr.slice(0, 10);
    // Log the total number of dates
    console.log(`Total number of dates: ${distDatesArr.length}\n`);
    // Log all dates
    console.log(`All dates: ${distDatesArr}\n`);
    // Log the first 10 dates
    console.log(`First 10 dates: ${firstTenDates}`);
    // Return the first 10 dates
    return NextResponse.json(firstTenDates, { status: 200 });
  } catch (err) {
    console.log(`Error with distinct count: ${err}`);
    return NextResponse.json({ message: `${err.message}` }, { status: 500 });
  }
}
