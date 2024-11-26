//IMAGES.JSX

"use client";

import React, { useEffect } from "react"; // Import useEffect
import { useDashboardContext } from "@/context/DashboardContext";
import useFetchAllUserDevices from "@/hooks/useFetchAllUserDevices";
import CustomImage from "@/components/ui/custom/CustomImage";

export default function Images() {
  const { senSurfData, dataPlot } = useDashboardContext();
  const { loading, error } = useFetchAllUserDevices();

  let imageDataArr; // Declare imageData variable

  useEffect(() => {
    if (senSurfData && dataPlot) {
      let lidarDataArr = senSurfData?.userDeviceData[0].lidarData;
      let dataNumArr = senSurfData?.userDeviceData[0].dataNum;
      let chartData = senSurfData?.userDeviceData[0].chartData;

      // Create imageDataArr array
      imageDataArr = lidarDataArr.map((lidarData, index) => {
        return [
          chartData[index][0],
          dataNumArr[index][1],
          dataNumArr[index][3],
          ...lidarData,
        ];
      });
    }
  }, [senSurfData, dataPlot]);

  function checkAndReturnIndex(min, max, index) {
    if (index < min || index > max) {
      // If index is not within min and max, return a random integer between min and max
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      // If index is within min and max, return index
      return index;
    }
  }
  const index = checkAndReturnIndex(1, 15, dataPlot?.index);

  return (
    <>
      {loading ? (
        <ImageDataLoading />
      ) : error ? (
        <DataLoadingError />
      ) : senSurfData && dataPlot ? (
        <div className=" w-full">
          <div className="info-panel-content-layout1-height relative h-full w-full">
            <CustomImage
              src={`/images/users/2/${index}.jpeg`}
              alt="Current Image"
            />
          </div>
        </div>
      ) : (
        <div className=" w-full">
          <div className="info-panel-content-layout1-height relative h-full w-full">
            <CustomImage
              src={`/images/fdt-white-image.svg`}
              alt="Current Image"
            />
          </div>
        </div>
      )}
    </>
  );
}


const ImageDataLoading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="animate-pulse">Image data is loading...</p>
    </div>
  );
};

const DataLoadingError = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="animate-pulse">
        Error fetching the data. Try refreshing or contact FDS.
      </p>
    </div>
  );
};
