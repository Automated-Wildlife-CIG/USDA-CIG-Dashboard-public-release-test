import { pool } from "../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";

/* Get the device attribute data for active user */

export async function GET(req) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const query = {
      text: "SELECT * FROM device WHERE user_id = $1",
      values: [userId],
    };

    const data = await pool.query(query);

    if (!data.rows.length > 0) {
      // +++++ This might not be the best way to handle this +++++
      // User might not have any attribute data at this point
      return NextResponse.json(
        { message: "No results found for this user", data },
        { status: 500 }
      );
    } else {
      return NextResponse.json(data, { status: 200 });
    }
  } catch (err) {
    console.log(`Error trying to access device data by user: ${err}`);
    return NextResponse.json({ message: `${err.message}` }, { status: 500 });
  }
}
