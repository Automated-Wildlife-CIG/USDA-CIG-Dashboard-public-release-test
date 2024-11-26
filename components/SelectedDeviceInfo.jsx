import React from "react";
import { useDashboardContext } from "@/context/DashboardContext";

export default function SelectedDeviceInfo() {
  const { selectedDevice } = useDashboardContext();

  return (
    <div className="h-full">
      <div className="mb-2">
        <h5 className="text-lg font-semibold mb-4">
          Project: {selectedDevice?.projectName}
        </h5>
        <p className="text-sm">Device EUI: {selectedDevice?.deviceEUI}</p>
        <p className="text-sm">
          Deployment Number: {selectedDevice?.deploymentNumber}
        </p>
      </div>
      <div className="mb-4">
        <h5 className="text-sm font-semibold">Project Description:</h5>
        <p className="text-sm">{selectedDevice?.projectDescription}</p>
      </div>
      <div>
        <h5 className="text-sm font-semibold">Type: {selectedDevice?.type}</h5>
        <p className="text-sm">{selectedDevice?.taxonomyDesc}</p>
      </div>
    </div>
  );
}
