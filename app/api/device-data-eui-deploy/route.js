import { pool } from "../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";

/* This query will take a request containing the device EUI and deployment number.
This data will come from the session data generated when the user has been logged in.
It will return each registered device EUI and all of associated deployment numbers
*/

export async function GET(req) {
  try {
    const devEui = req.nextUrl.searchParams.get("deviceEUI");
    const depNum = req.nextUrl.searchParams.get("deploymentNum");

    const query = {
      text: "SELECT * FROM fn_device_data_by_date_json($1, $2)",
      values: [devEui, depNum],
    };

    const { rows } = await pool.query(query);
    const data = rows[0].fn_device_data_by_date_json;

    if (!data.userDeviceData.length > 0) {
      return NextResponse.json(
        { message: "No results found for this user", data },
        { status: 500 }
      );
    } else {
      return NextResponse.json(data, { status: 200 });
    }
  } catch (err) {
    console.log(`Error with fn_device_data_by_date_json: ${err}`);
    return NextResponse.json({ message: `${err.message}` }, { status: 500 });
  }
}
