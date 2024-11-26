import { pool } from "../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";

/* 
This route is called to populate the all GoogleMap Markers

This query will take a request containing the user id and first name.
This data will come from the session data generated when the user has been logged in.
It will return each registered device EUI and all of associated deployment numbers


*/

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("userId");
  const firstName = req.nextUrl.searchParams.get("firstName");

  // Check if userId and firstName are provided
  if (!userId || !firstName) {
    return NextResponse.json(
      { message: "Missing required parameters: userId and firstName" },
      { status: 400 },
    );
  }

  const query = {
    text: "SELECT * FROM fn_device_attribute_data_json($1, $2)",
    values: [userId, firstName],
  };

  try {
    const { rows } = await pool.query(query);

    // Check if rows are returned from the query
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { message: "No results found for this user" },
        { status: 404 },
      );
    }

    const data = rows[0]?.fn_device_attribute_data_json;

    // Check if userDeviceData is returned in the data
    if (!data?.userDeviceData || data.userDeviceData.length === 0) {
      return NextResponse.json(
        { message: "No results found for this user" },
        { status: 404 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(`Error with fn_device_attribute_data_json: ${err}`);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
