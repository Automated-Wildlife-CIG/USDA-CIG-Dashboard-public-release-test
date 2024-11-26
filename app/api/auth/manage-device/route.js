import { pool } from "../../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";

/* 
  POST request are api/auth
  Update the attribute device table for user 
 */

export async function POST(request) {
  const {} = await request.json();

  const updateDeviceData = {
    text: `INSERT INTO device (deployment_num, dev_eui, user_id, device_addr)
           VALUES ($1, $2, $3, $4);`,
    values: ["", "", "", ""],
  };

  try {
    await pool.query(registerNewDevice);
    return new NextResponse({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log(`Error updating device attribute data to database`);
    return new NextResponse({ error: `${err.message}` }, { status: 500 });
  }
}
