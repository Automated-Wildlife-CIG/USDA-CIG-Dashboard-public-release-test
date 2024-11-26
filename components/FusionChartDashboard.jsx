import React, { useEffect, useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";
import schemaJson from "@/lib/schema.json";

export default function FusionChartDashboard() {
  // Declare state variables
  const [data, setData] = useState(null);
  const [dataIsLoading, setDataIsLoading] = useState(null);
  const { senSurfData, dataPlotSetter } = useDashboardContext();

  // Function to handle scroll data update
  const handleScrollDataUpdate = (dataPlotCurrent) => {
    dataPlotSetter(dataPlotCurrent);
  };

  // Effect to set data when senSurfData changes
  useEffect(() => {
    if (senSurfData) {
      setData(senSurfData);
    }
  }, [senSurfData]);

  // Effect to set dataIsLoading to false when data is not null
  useEffect(() => {
    if (data !== null) {
      setDataIsLoading(false);
    }
  }, [data]);

  // Effect to handle FusionCharts setup and rendering
  useEffect(() => {
    // Check if window is defined (i.e., if we're on the client side)
    if (typeof window !== "undefined") {
      // Dynamically import FusionCharts modules
      Promise.all([
        import("fusioncharts"),
        import("fusioncharts/fusioncharts.timeseries"),
        import("react-fusioncharts"),
        import("fusioncharts/themes/fusioncharts.theme.candy"),
        import("fusioncharts/fusioncharts.excelexport"),
      ]).then((modules) => {
        const FusionCharts = modules[0].default;
        const TimeSeries = modules[1].default;
        const ReactFC = modules[2].default;
        const FusionTheme = modules[3].default;
        const ExcelExport = modules[4].default;

        // Initialize FusionCharts with necessary modules
        ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme, ExcelExport);

        if (data) {
          const chartDataArr = data?.userDeviceData[0].chartData;
          const projectName = data.projectName;
          const eui = data.deviceEUI;
          const deploymentNum = data.deploymentNum;

          const schema = new FusionCharts.DataStore().createDataTable(
            chartDataArr,
            schemaJson,
          );

          const dataSource = {
            chart: {
              bgColor: "#FF0000",
              multiCanvas: true,
              canvasHeightProportion: "3:2:3",
              exportenabled: true,
              // logourl: "/images/fdt-white-image.svg",
              // logoscale: "5",
              // logposition: "BR",
              theme: "candy",
            },
            caption: {
              text: `Project Name: ${projectName}`,
            },
            subcaption: {
              text: `Device EUI: ${eui}_${deploymentNum}`,
            },
            xAxis: {
              outputTimeFormat: {
                second: "%b %-d, %Y, %-I:%-M:%-S %p",
              },
            },
            yAxis: [
              {
                plot: {
                  value: "Temperature (degC)",
                  type: "smooth-line",
                  connectnulldata: true,
                },
                referencezone: [
                  {
                    label: "Light Range",
                    valuemin: "1300",
                    valuemax: "1500",
                    style: {
                      marker: {
                        fill: "#B4F5E6",
                        stroke: "#B4F5E6",
                      },
                      "marker-text": {
                        fill: "#000000",
                      },
                      "marker:hover": {
                        fill: "#98DECD",
                      },
                      "marker-zone:hover": {
                        stroke: "#B4F5E6",
                      },
                      "marker-notch:hover": {
                        stroke: "#B4F5E6",
                      },
                    },
                  },
                ],
              },
              {
                plot: {
                  value: "Light",
                  type: "area",
                  connectnulldata: true,
                  style: {
                    plot: {
                      "fill-opacity": "0.75",
                    },
                  },
                },
              },
              {
                plot: {
                  value: "Detections per Minute",
                  type: "column",
                },
              },
            ],
          };

          const chartConfigs = {
            type: "timeseries",
            width: "100%",
            height: "800",
            dataFormat: "json",
            renderAt: "fusioncharts-container",
            dataSource: {
              ...dataSource,
              data: schema,
            },
          };

          let eventListener = function (eventObj) {
            handleScrollDataUpdate(eventObj.data);
          };

          const fusionChartReady = new FusionCharts(chartConfigs);
          fusionChartReady.addEventListener("dataPlotRollout", eventListener);
          fusionChartReady.render("fusioncharts-container");
        }

        return () => {
          FusionCharts.items["fusioncharts-container"]?.dispose();
        };
      });
    }
  }, [data]);

  //TODO: skeleton while loading?
  if (dataIsLoading) {
    return <FusionChartSkeleton />;
  }

  return <div className=" w-full" id="fusioncharts-container"></div>;
}

const FusionChartSkeleton = () => {
  return (
    <div className="flex h-[863px] justify-center">
      <div>
        <p className="animate-pulse">Data Loading... </p>
      </div>
    </div>
  );
};

const SelectDeviceSkeleton = () => {
  return (
    <div className="flex h-full justify-center">
      <p className="animate-pulse">Select device... </p>
    </div>
  );
};
