//iMAGE SURFACE CHART PANEL

"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Images from "@/components/Images";
import HeatMap from "@/components/HeatMap";
import { Separator } from "@/components/ui/separator";
import SelectedDeviceInfo from "@/components/SelectedDeviceInfo";
import { useDashboardContext } from "@/context/DashboardContext";

export default function ImageSurfaceChartPanel({
  inforPanelTopWidth,
  screenWidth,
  layout2IsActive,
}) {
  const [activeTab, setActiveTab] = useState("image");
  const { selectedDevice, setTriggerMapReDraw } = useDashboardContext();


  return (
    <Card className="h-full w-full">
      <CardContent className="px-0.5 pb-0">
        <Tabs defaultValue="image" className="h-full">
          <TabsList className="tabs-list justify-evenly pt-4">
            <TabsTrigger
              value="image"
              onClick={() => setActiveTab("image")}
              className={activeTab === "image" && "cursor-default"}
            >
              Current Image
            </TabsTrigger>
            <Separator orientation="vertical" />
            <TabsTrigger
              value="heatMap"
              onClick={() => setActiveTab("heat-map")}
              className={activeTab === "heat-map" && "cursor-default"}
            >
              Heat Map
            </TabsTrigger>
          </TabsList>
          <Separator className="mb-3 mt-3" />
          <TabsContent value="image">
            <div className="tabs-content info-panel-content-layout1-height">
              {selectedDevice ? <Images /> : <DataLoading />}
            </div>
          </TabsContent>
          <TabsContent value="heatMap">
            <div className="tabs-content info-panel-content-layout1-height">
              {selectedDevice ? (
                <HeatMap inforPanelTopWidth={inforPanelTopWidth} />
              ) : (
                <DataLoading />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

const DataLoading = () => {
  return (
    <div className="flex h-full w-full animate-pulse flex-col items-center justify-center">
      <p>Data for Images & Heat Map loading...</p>
    </div>
  );
};
