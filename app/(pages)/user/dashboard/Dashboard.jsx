"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// CONTEXT
import { useDashboardContext } from "@/context/DashboardContext";

// COMPONENTS, IMAGES
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import FusionChartDashboard from "@/components/FusionChartDashboard";
import MapInfoPanel from "./MapInfoPanel";
import ImageSurfaceChartPanel from "./ImageSurfaceChartPanel";
import DeviceSelector from "@/components/DeviceSelector";

import layout2Icon from "@/public/images/layout-2-icon.svg";
import layout1Icon from "@/public/images/layout-1-icon.svg";

import ToolTipComponent from "@/components/ui/custom/ToolTipComponent";

//UTILS, HOOKS
import { cn } from "@/lib/utils";
import useFetchAllUserDevices from "@/hooks/useFetchAllUserDevices";

export default function Dashboard() {
  //STATES
  const [layout1IsActive, setLayout1IsActive] = useState(true);
  const [layout2IsActive, setLayout2IsActive] = useState(false);
  const [inforPanelTopWidth, setInforPanelTopWidth] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);
  const { selectedDevice } = useDashboardContext();
  const { loading, error } = useFetchAllUserDevices();

  //REFS
  const fusionPanelRef = useRef(null);
  const infoPanelTopRef = useRef(null);

  //EVENT HANDLERS AND FUNCTIONS
  const handleCollapseInfoPanelTop = () => {
    setLayout2IsActive(true);
    setLayout1IsActive(false);
  };

  const handleExpandInfoPanelTop = () => {
    setLayout2IsActive(false);
    setLayout1IsActive(true);
  };

  const selectLayout = (e) => {
    let target = e.target.parentNode.id;
    switch (target) {
      case "layout1":
        setLayout1IsActive(true);
        setLayout2IsActive(false);
        infoPanelTopRef.current.expand();
        break;
      case "layout2":
        setLayout1IsActive(false);
        setLayout2IsActive(true);
        infoPanelTopRef.current.collapse();
        break;
      default:
        setLayout1IsActive(false);
        setLayout2IsActive(false);
        break;
    }
  };

  const checkScreenSize = useCallback(() => {
    if (window.innerWidth > 1400) {
      if (screenWidth === "desktop") {
        return;
      }
      setScreenWidth("desktop");
    }

    if (window.innerWidth <= 1400 && window.innerWidth > 1000) {
      if (screenWidth === "tablet") {
        return;
      } else {
        if (!infoPanelTopRef.current.isCollapsed()) {
          infoPanelTopRef.current.collapse();
        }
        setScreenWidth("tablet");
        setLayout2IsActive(true);
        setLayout1IsActive(false);
      }
    }

    if (window.innerWidth <= 1000) {
      if (screenWidth === "mobile") {
        return;
      }

      setScreenWidth("mobile");
      setLayout2IsActive(true);
      setLayout1IsActive(false);
    }
  }, [screenWidth, setScreenWidth]);

  const handlePanelResize = (size) => {
    // console.log("info panel top size set", size);
    setInforPanelTopWidth(size);
  };

  //EFFECTS

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      <div className="mb-20 ">
        <div className="mb-6 flex items-center justify-between px-6">
          <div className="w-full">
            <h1 className="mb-12 whitespace-nowrap text-center text-3xl font-extrabold ">
              Device Dashboard
            </h1>

            <div className="grid  w-full grid-cols-3">
              <div className="col-span-1 text-center text-lg lg:text-xl">
                <h1 className="font-extrabold">Project</h1>
                <p className="text-lg lg:text-xl">
                  {selectedDevice?.projectName}
                </p>
              </div>

              <div className="col-span-1 whitespace-nowrap text-center text-lg lg:text-xl">
                <h1 className="font-extrabold">Device</h1>
                <p className="text-lg lg:text-xl">
                  {selectedDevice?.deviceEUI}
                </p>
              </div>

              <div className="col-span-1 whitespace-nowrap text-center text-lg lg:text-xl">
                <h1 className="font-extrabold">Deployment</h1>
                <p>{selectedDevice?.deploymentNumber}</p>
              </div>
            </div>
          </div>

          {/* Layout Selection Buttons */}
          <div
            className={
              screenWidth === "desktop" ? "flex gap-4 self-end" : "hidden"
            }
          >
            <ToolTipComponent content={"Layout 1"}>
              <div
                onClick={selectLayout}
                id="layout1"
                className={cn("relative block h-8 w-8 disabled:opacity-50", {
                  hidden: screenWidth !== "desktop",
                })}
                disabled={layout1IsActive}
                role="button"
                onKeyDown={selectLayout}
              >
                <Image priority src={layout1Icon} alt="layout 1 icon" fill />
              </div>
            </ToolTipComponent>

            <ToolTipComponent content={"Layout 2"}>
              <div
                id="layout2"
                onClick={selectLayout}
                className="relative block h-8 w-8 disabled:opacity-50"
                disabled={layout2IsActive}
                role="button"
                onKeyDown={selectLayout}
              >
                <Image priority src={layout2Icon} alt="layout 2 icon" fill />
              </div>
            </ToolTipComponent>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="mb-4 border">
          <ResizablePanel
            id="fusion-panel"
            defaultSize={70}
            minSize={50}
            ref={fusionPanelRef}
            className="p-4"
          >
            <div className="flex h-full flex-col">
              <div className=" w-full bg-fusionChartBg ">
                <DeviceSelector />
              </div>
              <div className="flex-1 ">
                {loading ? (
                  <FusionDataLoading />
                ) : error ? (
                  <FusionDataLoadingError />
                ) : selectedDevice ? (
                  <FusionChartDashboard />
                ) : (
                  <FusionSelectDeviceSkeleton />
                )}
              </div>
            </div>
          </ResizablePanel>

          {screenWidth === "desktop" ? (
            <ResizableHandle withHandle />
          ) : (
            <ResizableHandle />
          )}

          <ResizablePanel
            id="info-panel-top"
            ref={infoPanelTopRef}
            defaultSize={30}
            minSize={30}
            maxSize={50}
            collapsible
            onCollapse={handleCollapseInfoPanelTop}
            onExpand={handleExpandInfoPanelTop}
            onResize={handlePanelResize}
          >
            <div className="p-4">
              <div className="h-[452px]">
                <MapInfoPanel
                  screenWidth={screenWidth}
                  layout2IsActive={layout2IsActive}
                />
              </div>
              <div className="relative h-[452px]">
                <ImageSurfaceChartPanel
                  inforPanelTopWidth={inforPanelTopWidth}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {screenWidth !== "desktop" || layout2IsActive ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div
              id="info-panel-bottom-image-heat-map"
              className="h-full w-full"
            >
              <div className="flex h-[500px] items-center justify-center">
                <MapInfoPanel
                  screenWidth={screenWidth}
                  layout2IsActive={layout2IsActive}
                />
              </div>
            </div>

            <div id="info-panel-bottom-map-device-info" className="w-full">
              <div className="flex h-full items-center justify-center">
                <ImageSurfaceChartPanel
                  screenWidth={screenWidth}
                  layout2IsActive={layout2IsActive}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

const FusionSelectDeviceSkeleton = () => {
  return (
    <div className="flex min-h-[800px] w-full flex-col items-center justify-center">
      <p className="animate-pulse">Select a device</p>
    </div>
  );
};

const FusionDataLoadingError = () => {
  return (
    <div className="flex min-h-[800px] w-full flex-col items-center justify-center">
      <p className="animate-pulse">
        Error fetching the data. Try refreshing or contact FDS.
      </p>
    </div>
  );
};

const FusionDataLoading = () => {
  return (
    <div className="flex min-h-[800px] w-full flex-col items-center justify-center">
      <p className="animate-pulse">The data is loading...</p>
    </div>
  );
};
