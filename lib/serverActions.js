"use server";

//can I get user server side data from here to validate authorization?

export async function senSurfDataFetch({ devEui, depNum }) {
  try {
    const timeZoneOffset = new Date().getTimezoneOffset();

    ///// GET DATES FOR SELECTED DEVICE BASED ON DEVICE EUI AND DEPLOYMENT NUMBER

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-device-data/dates?devEui=${devEui}&depNum=${depNum}`,
    );
    let dates = await res.json();

    ///// USE DATES TO SET TO SET THESE VARIABLES FOR THE CHART DATA FETCH /////
    const ceilCnt = Math.ceil(dates.length / 5);
    const floorCnt = Math.floor(dates.length / 5);

    ///// INITIALIZE EMPTY VARIABLES /////

    let allChartData = [];
    let allDataNum = [];
    let allLidarData = [];
    let proName;
    let cnt = 0;
    let startDate;

    ///// SET START DATE   /////

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

      ///// SET END DATE  /////

      let endDate = dates[0];

      // where is dates used after this assignment?
      dates = dates.slice(5); // remove 5 dates

      ///// FETCH CHART DATA USING START AND END DATES /////
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-device-data/chart-data?devEui=${devEui}&depNum=${depNum}&startDate=${startDate}&endDate=${endDate}&timeZoneOffset=${timeZoneOffset}`,
        );
        const chartData = await res.json();

        ///// USE CHART DATA TO SET THESE VARIABLES /////
        let cData = chartData.userDeviceData[0].chartData;
        let dNum = chartData.userDeviceData[0].dataNum;
        let lData = chartData.userDeviceData[0].lidarData;

        proName = chartData.projectName;
        allChartData.push(...cData);
        allDataNum.push(...dNum);
        allLidarData.push(...lData);
        cnt += 1;
      } catch (error) {
        console.error(`Error fetching chart data: ${error}`);
        // Handle error fetching chart data
        throw error;
      }
    }

    //// SET THE SENSORY SURF DATA OBJECT ////

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
    // Handle error getting chart data
    throw error;
  }
}
