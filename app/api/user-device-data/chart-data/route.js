import { pool } from "../../../../models/dbConfig.js";
import { NextResponse } from "next/server.js";
const fs = require("fs");

export async function GET(req, res) {
  const devEui = req.nextUrl.searchParams.get("devEui");
  const depNum = req.nextUrl.searchParams.get("depNum");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  const timeZoneOffset = req.nextUrl.searchParams.get("timeZoneOffset");

  // Function to determine if daylight savings time is in effect
  function isDaylightSaving(time) {
    const jan = new Date(time.getFullYear(), 0, 1);
    const jul = new Date(time.getFullYear(), 6, 1);
    const stdTimezoneOffset = Math.max(
      jan.getTimezoneOffset(),
      jul.getTimezoneOffset(),
    );

    return time.getTimezoneOffset() < stdTimezoneOffset;
  }

  // Function to convert date/time from data.userDeviceData[0].chartData
  function convertToLocalDateTime(data) {
    const convertedData = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const gmtDateTimeString = row[0];
      // Convert the GMT date and time string to a local Date object
      const gmtDateTimeParts = gmtDateTimeString.split(" ");
      const [date, time] = gmtDateTimeParts;
      const [month, day, year] = date.split("/");
      const [hours, minutes] = time.split(":");
      const gmtDateTime = new Date(
        Date.UTC(year, month - 1, day, hours, minutes),
      );
      // Minus 300 minutes required to convert from GMT to local time when code is deployed
      // getTime() is difference in milliseconds from Jan 1, 1970.
      // getTimeZoneOffset() is difference between UTC and local time in minutes
      const timeZoneOffset = -300; // EST is GMT-5
      const isDST = isDaylightSaving(gmtDateTime);
      const adjustedTimeZoneOffset = isDST ? -60 : 0; // EST is GMT-5, EDT is GMT-4

      const localDateTime = new Date(
        gmtDateTime.getTime() + adjustedTimeZoneOffset * 60 * 1000,
      );

      // Format the local date and time
      const localMonth = ("0" + (localDateTime.getMonth() + 1)).slice(-2);
      const localDay = ("0" + localDateTime.getDate()).slice(-2);
      const localYear = localDateTime.getFullYear();
      const localHours = ("0" + localDateTime.getHours()).slice(-2);
      const localMinutes = ("0" + localDateTime.getMinutes()).slice(-2);
      // Create a modified row with the converted local date and time
      const modifiedRow = [
        `${localMonth}/${localDay}/${localYear} ${localHours}:${localMinutes}`,
        ...row.slice(1),
      ];
      //const modifiedRow = [localDateTime, ...row.slice(1)];
      convertedData.push(modifiedRow);
    }
    return convertedData;
  }

  /* 
  - This function is for exporting data before sending to 
   front end to validate date/time conversion.
  - Data saved to csv root of project
  - Uncomment two lines of code below ----Testing Only ---- to export data. 
  - Required Testing Only 
  */
  function downloadCSV(data, filename) {
    const csvContent = data.map((row) => row.join(",")).join("\n");

    fs.access(filename, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist, create a new file
        fs.writeFile(filename, csvContent, "utf8", (err) => {
          if (err) {
            console.error("Error writing CSV file:", err);
          } else {
            console.log("CSV file saved:", filename);
          }
        });
      } else {
        // File exists, append data to the existing file
        fs.appendFile(filename, csvContent, "utf8", (err) => {
          if (err) {
            console.error("Error appending to CSV file:", err);
          } else {
            console.log("Data appended to CSV file:", filename);
          }
        });
      }
    });
  }

  const query = {
    text: "SELECT * FROM fn_fdtlrw_device_data_by_date_json($1, $2, $3, $4)",
    values: [devEui, depNum, startDate, endDate],
  };

  const queryProjectName = {
    text: "SELECT project_name FROM device WHERE dev_eui = ($1)",
    values: [devEui],
  };

  try {
    const results = await pool.query(query);
    const data = results.rows[0].fn_fdtlrw_device_data_by_date_json;
    const resultsProject = await pool.query(queryProjectName);
    data.projectName = resultsProject.rows[0].project_name;
    // ----Testing Only ----
    // const chartDataToExport = data.userDeviceData[0].chartData;
    // downloadCSV(chartDataToExport, "data_raw.csv");

    // --- Convert date time from GMT to machine local time ---
    const convertedData = convertToLocalDateTime(
      data.userDeviceData[0].chartData,
    );
    data.userDeviceData[0].chartData = convertedData;
    //downloadCSV(convertedData, 'data_converted.csv');
    // console.log(data.userDeviceData[0].dataNum);

    // console.log(data.userDeviceData[0].chartData);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(`Something went wrong getting data: ${error}`);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
