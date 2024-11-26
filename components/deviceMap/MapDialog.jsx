import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MapControls from "./MapControls";
import { useDashboardContext } from "@/context/DashboardContext";
import { Maximize2 } from "lucide-react";

import DeviceMap from "@/components/deviceMap/DeviceMap";

export default function MapDialog() {
  const { selectedDevice } = useDashboardContext();
  return (
    <Dialog className="map-dialog h-screen w-screen">
      <DialogTrigger asChild>
        
          <div className="flex gap-1 ">
            <p>Map</p>
            <Maximize2 size={16} className="ml-4 mt-0.5 cursor-pointer" />
          </div>
    
      </DialogTrigger>
      <DialogContent className="h-full w-full max-w-screen-xl ">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MapControls /> Project: {selectedDevice?.projectName} Selected
            Device {selectedDevice?.deviceEUI} Deployment:
            {selectedDevice?.deploymentNumber}{" "}
          </DialogTitle>
          <DialogDescription className="h-full pb-10">
            <div className="relative mt-10 h-full w-full">
              <div className="absolute top-0"></div>

              <DeviceMap />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
