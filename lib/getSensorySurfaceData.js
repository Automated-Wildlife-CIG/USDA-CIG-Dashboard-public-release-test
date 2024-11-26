/* This function is used to fetch data based on device eui and deployment number. 
When a marker is selected the device eui and deployment number is passed. 

The function will get all distinct dates for give device eui by dep num
- api/user/device-data/dates 

The function will take the total number of dates divided by 5 to get the max number 
of loops required to query the database for a given date range. This allows for smaller chunks of data to be pulled to avoid data restriction/slow response time. 

The chunks of data are then spliced back together on the client side to create the 
entire data object used to FusionChart, SurfaceChart and in the future images.
*/

/* 
DELETE ?? DELETE - I think this is being replaced by:
  -- hooks/useSensorySurfaceData.js
*/

export default async function getSensorySurfaceData(devEui, depNum) {
  console.log(
    "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
  );
  console.log(
    "IF THIS IS LOGGED TO THE CONSOLE THEN getSensorySurfaceData.js IS BEING CALLED!",
  );
  console.log(
    "IF BEING CALLED WHY ARE WE USING hooks/useSensorySurfaceData.js?",
  );
  console.log(
    "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
  );

  try {
    const timeZoneOffset = new Date().getTimezoneOffset();
    const res = await fetch(
      `/api/user-device-data/dates?devEui=${devEui}&depNum=${depNum}`,
    );
    let dates = await res.json();

    const ceilCnt = Math.ceil(dates.length / 5);
    const floorCnt = Math.floor(dates.length / 5);

    let allChartData = [];
    let allDataNum = [];
    let allLidarData = [];
    let proName;
    let cnt = 0;
    let startDate;

    /* Start date is the lower of the two dates 
        - e.g., 2023-04-16 is start and 2023-04-20 end date
        - dates array is always sorted high to low 
      */
    for (let i = 0; i < ceilCnt; i++) {
      if (cnt < floorCnt) {
        startDate = dates[4];
      } else {
        // Handle end of dates array
        startDate = dates[dates.length - 1];
      }

      let endDate = dates[0];
      dates = dates.slice(5); // remove 5 dates
      const res = await fetch(
        `/api/user-device-data/chart-data?devEui=${devEui}&depNum=${depNum}&startDate=${startDate}&endDate=${endDate}&timeZoneOffset=${timeZoneOffset}`,
      );
      const chartData = await res.json();

      let cData = chartData.userDeviceData[0].chartData;
      let dNum = chartData.userDeviceData[0].dataNum;
      let lData = chartData.userDeviceData[0].lidarData;

      proName = chartData.projectName;
      allChartData.push(...cData);
      allDataNum.push(...dNum);
      allLidarData.push(...lData);
      cnt += 1;
    }
    const senSurfData = {
      deviceEUI: devEui,
      deploymentNum: depNum,
      projectName: proName,
      userDeviceData: [
        {
          dataNum: allDataNum,
          chartData: allChartData,
          lidarData: allLidarData,
        },
      ],
    };
    return senSurfData;
  } catch (error) {
    console.error(`Error getting the chart data: ${error}`);
    alert("Trouble getting data on marker select or drop down select!");
  }
}
