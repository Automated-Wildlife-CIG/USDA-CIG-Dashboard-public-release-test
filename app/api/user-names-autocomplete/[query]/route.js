import { pool } from "../../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";

/* This route is used to query the user_profiles table. 
When a Customer buys a device then an FDS team elf is required
to register the device EUI and address. This also requires the users 
id from the user_profile table */

export async function GET(request, { params }) {
  const userQuery = params.query;
  console.log("user query", userQuery);
  try {
    const query = {
      text: "SELECT id, user_name_email FROM user_profile WHERE user_name_email LIKE $1",
      values: [`${userQuery}%`],
    };

    const data = await pool.query(query);

    console.log("data row length", data.rows.length);

    //NOTE: return 404 if no results found
    if (!data.rows.length > 0) {
      return NextResponse.json(
        { message: "No results found for this user", data },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(`Unable to get user names to register device ${err}`);
    return NextResponse.json({ message: `${err.message}` }, { status: 500 });
  }
}
