import React, { useEffect, useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";
import DeviceMap from "@/components/deviceMap/DeviceMap";
import { Separator } from "@/components/ui/separator";
import MapControls from "@/components/deviceMap/MapControls";
import MapDialog from "@/components/deviceMap/MapDialog";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SelectedDeviceInfo from "@/components/SelectedDeviceInfo";

export default function MapInfoPanel({ screenWidth, layout2IsActive }) {
  const { selectedDevice, setTriggerMapReDraw } = useDashboardContext();
  const [activeTab, setActiveTab] = useState("map");

  useEffect(() => {
    setTriggerMapReDraw((prev) => prev + 1);
    if (screenWidth !== "desktop" || layout2IsActive) {
      setTriggerMapReDraw((prev) => prev + 1);
    } else {
      setTriggerMapReDraw((prev) => prev + 1);
    }
  }, [screenWidth, layout2IsActive]);

  return (
    <Card className=" h-full w-full ">
      <CardContent className="h-full px-0 pb-0  ">
        <Tabs defaultValue="map" className="h-full ">
          <TabsList className="tabs-list flex justify-evenly  pt-4">
            <TabsTrigger
              value="map"
              onClick={() => setActiveTab("map")}
              className={cn("", activeTab === "map" && "cursor-default")}
            >
              <MapDialog />
            </TabsTrigger>
            <Separator orientation="vertical" />
            <TabsTrigger
              value="deviceInfo"
              onClick={() => setActiveTab("info")}
              className={activeTab === "info" && "cursor-default"}
            >
              Device Info
            </TabsTrigger>
          </TabsList>

          <Separator className="mb-3 mt-3" />
          <TabsContent value="map" className="px-0">
            {/* This div determines map size, height must be explicit */}
            <div
              className={cn(
                "tabs-content relative",
                layout2IsActive
                  ? "info-panel-content-layout2-height "
                  : "info-panel-content-layout1-height",
              )}
            >
              {selectedDevice ? (
                <>
                  <DeviceMap />
                  <div className="absolute left-2 right-2 top-2">
                    <MapControls />
                  </div>
                </>
              ) : (
                mapLoadingSkeleton
              )}
            </div>
          </TabsContent>
          <TabsContent value="deviceInfo">
            {selectedDevice ? (
              <div className="tabs-content">
                <SelectedDeviceInfo />
              </div>
            ) : (
              mapLoadingSkeleton
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

const mapLoadingSkeleton = (
  <div className="flex min-h-[445px] w-full animate-pulse flex-col items-center justify-center">
    Map Data Loading...
  </div>
);
const selectADeviceSkeleton = (
  <div className="flex min-h-[445px] w-full animate-pulse flex-col items-center justify-center">
    Select a device
  </div>
);
