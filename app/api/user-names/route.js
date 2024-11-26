import { pool } from "../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";

/* This route is used to query the user_profiles table. 
When a Customer buys a device then an FDS team elf is required
to register the device EUI and address. This also requires the users 
id from the user_profile table */

export async function GET(req) {
  try {
    const query = {
      text: "SELECT id, user_name_email FROM user_profile",
    };

    const data = await pool.query(query);

    if (!data.rows.length > 0) {
      return NextResponse.json(
        { message: "No results found for this user", data },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(`Unable to get user names to register device ${err}`);
    return NextResponse.json({ message: `${err.message}` }, { status: 500 });
  }
}
