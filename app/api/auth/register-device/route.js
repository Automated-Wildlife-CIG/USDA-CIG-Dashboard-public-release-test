// import { pool } from "../../../../models/dbconfig.js";
import { pool } from "@/models/dbConfig.js";

import { NextResponse } from "next/server.js";

export async function POST(request) {
  let serverValidationErrors = {};

  const { devEUI, deviceAddress, deploymentNumber, userId } =
    await request.json();
  // console.log("devEUI", devEUI);
  // console.log("deviceAddress", deviceAddress);
  // console.log("deploymentNumber", deploymentNumber);
  // console.log("userId", userId);

  function isValidNineDigitValue(value) {
    // Check if input is a non-empty string and consists of exactly 9 digits
    return /^\d{9}$/.test(value);
  }

  if (!devEUI || !deviceAddress || !deploymentNumber || !userId) {
    console.log("Missing fields");

    serverValidationErrors.global = {
      type: 400,
      field: "none",
      message: "Please populate all fields",
    };
  }

  if (devEUI.length < 16) {
    serverValidationErrors.devEUI = {
      type: 400,
      field: "devEUI",
      message: "16 character device EUI required",
    };
  }

  if (!isValidNineDigitValue(deviceAddress)) {
    serverValidationErrors.deviceAddress = {
      type: 400,
      field: "deviceAddress",
      message: "9-digit device address required",
    };
  }

  if (deploymentNumber > 999) {
    serverValidationErrors.deploymentNumber = {
      type: 400,
      field: "deploymentNumber",
      message: "9-digit device address required",
    };
  }

  console.log("serverValidationErrors", serverValidationErrors);

  const existingDeviceEUI = await pool.query(
    "SELECT * FROM device WHERE dev_eui = $1",
    [devEUI]
  );

  if (existingDeviceEUI.rows.length > 0) {
    serverValidationErrors.devEUI = {
      type: 400,
      field: "devEUI",
      message: "The device EUI is not unique",
    };
  }

  const existingDeviceAddr = await pool.query(
    "SELECT * FROM device WHERE device_addr = $1",
    [deviceAddress]
  );

  if (existingDeviceAddr.rows.length > 0) {
    serverValidationErrors.deviceAddress = {
      type: 400,
      field: "deviceAddress",
      message: "The device address is not unique",
    };
  }

  if (Object.keys(serverValidationErrors).length > 0) {
    const formValidationErrors = JSON.stringify(serverValidationErrors);
    return new NextResponse(formValidationErrors, { status: 403 });
  } else {
    //if no form errors attempt to register device

    const registerNewDevice = {
      text: `INSERT INTO device (deployment_num, dev_eui, user_id, device_addr)
           VALUES ($1, $2, $3, $4);`,
      values: [
        parseInt(deploymentNumber),
        devEUI,
        userId,
        BigInt(deviceAddress),
      ],
    };

    try {
      await pool.query(registerNewDevice);
      return new NextResponse({ message: "Success" }, { status: 200 });
    } catch (err) {
      console.log(`Error when posting new device to database`);
      return new NextResponse({ error: `${err.message}` }, { status: 500 });
    }
  }
}
