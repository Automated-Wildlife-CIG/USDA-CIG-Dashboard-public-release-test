/* This function is used to fetch data based on device eui and deployment number. 
When a marker is selected the device eui and deployment number is passed. 

The function will get all distinct dates for give device eui by dep num
- api/user/device-data/dates 

The function will take the total number of dates divided by 5 to get the max number 
of loops required to query the database for a given date range. This allows for smaller chunks of data to be pulled to avoid data restriction/slow response time. 

The chunks of data are then spliced back together on the client side to create the 
entire data object used to FusionChart, SurfaceChart and in the future images.
*/

import { useState, useEffect } from "react";
import { useDashboardContext } from "@/context/DashboardContext";

export default function useSensorySurfaceData() {
  const [isLoading, setIsLoading] = useState(false);
  const { senSurfDataSetter, selectedDevice } = useDashboardContext();

  let deviceEUI = selectedDevice?.deviceEUI;
  let deploymentNumber = selectedDevice?.deploymentNumber;
  let projectName = selectedDevice?.projectName;

  // console.log("deviceEUI in useSensorySurfaceData: ", deviceEUI);
  // console.log("deploymentNumber in useSensorySurfaceData: ", deploymentNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const timeZoneOffset = new Date().getTimezoneOffset();
        const res = await fetch(
          `/api/user-device-data/dates?devEui=${deviceEUI}&depNum=${deploymentNumber}`,
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
            startDate = dates[dates.length - 1];
          }

          let endDate = dates[0];
          dates = dates.slice(5);
          const res = await fetch(
            `/api/user-device-data/chart-data?devEui=${deviceEUI}&depNum=${deploymentNumber}&startDate=${startDate}&endDate=${endDate}&timeZoneOffset=${timeZoneOffset}`,
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
          deviceEUI: deviceEUI,
          deploymentNum: deploymentNumber,
          projectName: projectName,
          userDeviceData: [
            {
              dataNum: allDataNum,
              chartData: allChartData,
              lidarData: allLidarData,
            },
          ],
        };

        // This will update the sensory fusionChart and 3D-Surface Chart data
        // updateMarkerData(
        //   'Doug-1',
        //   senSurfData.projectName,
        //   senSurfData.deviceEUI,
        //   senSurfData.userDeviceData[0].imageNames,
        //   null,
        //   senSurfData.userDeviceData[0].chartData,
        //   senSurfData.userDeviceData[0].dataNum,
        //   senSurfData.userDeviceData[0].lidarData,
        //   senSurfData.deploymentNum
        // )

        senSurfDataSetter(senSurfData);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error getting the chart data: ${error}`);
        setError(error); // Set the error state when an error occurs
        setIsLoading(false);
      }
    };

    if (selectedDevice) {
      fetchData();
    }
  }, [selectedDevice, senSurfDataSetter]);

  return isLoading;
}
