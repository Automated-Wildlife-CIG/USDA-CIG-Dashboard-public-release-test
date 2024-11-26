import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";

const HeatMap = () => {
  const { senSurfData, dataPlot } = useDashboardContext();
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    if (senSurfData && dataPlot) {
      let lidarDataArr = senSurfData?.userDeviceData[0].lidarData;
      let dataNumArr = senSurfData?.userDeviceData[0].dataNum;
      let chartData = senSurfData?.userDeviceData[0].chartData;

      /* This func is required to convert the 32 zones to an array Z-data
      for Heatmap. This data is sent within an array but each 
      line must be an array with 4 columns */
      const convertToArr = (arr, numColumns) => {
        return arr.reduce((result, num, index) => {
          const parsedNum = parseInt(num, 10);
          let rowIndex = Math.floor(index / numColumns);
          if (!result[rowIndex]) {
            result[rowIndex] = [];
          }
          result[rowIndex].push(parsedNum);
          return result;
        }, []);
      };

      /* Convert string date from dataObj to date object. This is required to convert date
      from utc to local time */
      function convertStringToDate(dateTimeString, chartData) {
        // or handle the case when dateTimeString is undefined
        if (!dateTimeString) {
          return null;
        }
        const [date, time] = dateTimeString.split(" ");
        const [month, day, year] = date.split("c/");
        const [hours, minutes] = time.split(":");
        return new Date(year, month - 1, day, hours, minutes);
      }

      let idx = Math.round(dataPlot?.binValue) - 1;
      let startText = dataPlot?.startText;
      /* Convert date to local time and use default date if null is passed*/
      const dateTimeGmtAsDateObj = convertStringToDate(startText);
      const defaultDate = new Date("01/01/2020");
      const dateTimeLocalAsDateObj = dateTimeGmtAsDateObj
        ? new Date(
            dateTimeGmtAsDateObj.getTime() -
              dateTimeGmtAsDateObj.getTimezoneOffset() * 60 * 1000,
          )
        : defaultDate;

      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      };

      const formattedDateTime = dateTimeLocalAsDateObj.toLocaleString(
        undefined,
        options,
      );

      const xValues = ["X1", "X2", "X3", "X4"];
      const yValues = ["Y8", "Y7", "Y6", "Y5", "Y4", "Y3", "Y2", "Y1"];
      const colorscaleValue = [
        [0, "#f7fbff"],
        [0.1, "#deebf7"],
        [0.2, "#c6dbef"],
        [0.3, "#9ecae1"],
        [0.4, "#6baed6"],
        [0.5, "#4292c6"],
        [0.6, "#2171b5"],
        [0.7, "#08519c"],
        [0.8, "#08306b"],
        [0.9, "#06264a"],
        [1, "#041830"],
      ];
      let nData = dataNumArr[idx];
      let cData = chartData[idx]; // [timestamp_utc, temperature, ambient_light, total_detects, id]
      let zData = [];
      if (lidarDataArr[idx] == undefined) {
        zData = convertToArr(lidarDataArr[1], 4);
      } else {
        zData = convertToArr(lidarDataArr[idx], 4);
      }

      // Create an empty array for the annotations
      let annotations = [];

      for (let i = 0; i < yValues.length; i++) {
        for (let j = 0; j < xValues.length; j++) {
          // Check if zData[i][j] is not undefined before calling toString()
          let text = zData[i] && zData[i][j] ? zData[i][j].toString() : "";
          let annotation = {
            x: xValues[j],
            y: yValues[i],
            text: text,
            font: {
              family: "Arial",
              size: 12,
              color: "black",
            },
            showarrow: false,
          };
          annotations.push(annotation);
        }
      }

      setData([
        {
          x: xValues,
          y: yValues,
          z: zData,
          colorscale: colorscaleValue,
          type: "heatmap",
          showscale: true,
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
        },
      ]);

      // Rest of the code...

      let title;
      if (cData && cData.length >= 4) {
        title = `Local ${cData[0]} | Temp. ${cData[1]} | Light ${cData[2]} | bVal ${Math.round(dataPlot?.binValue * 100) / 100}`;
      } else {
        title = "Data not available";
      }

      setLayout({
        title: {
          text: title,
          font: {
            size: 15,
            color: "white",
          },
        },
        annotations: annotations,
        // width: 700,
        height: 400,
        xaxis: {
          ticks: "",
          side: "top",
        },
        margin: {
          l: 45,
          r: 65,
          b: 55,
          t: 75,
        },
        yaxis: {
          ticks: "",
          ticksuffix: " ",
        },
        font: {
          color: "white",
          size: 13,
        },
        paper_bgcolor: "hsl(222.2, 84%, 4.9%)",
      });
    }
  }, [senSurfData, dataPlot]);

  return (
    <>
      {senSurfData && dataPlot ? (
        <Plot
          data={data}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%" }}
        />
      ) : senSurfData || dataPlot ? (
        <ImageDataLoading />
      ) : (
        <DataLoadingError />
      )}
    </>
  );
};

export default HeatMap;

const ImageDataLoading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="animate-pulse">Scroll over FusionChart for heatmap...</p>
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
