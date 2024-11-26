"use client";

import { createContext, useContext, useEffect, useState } from "react";
// import { updateDashboardStateStorage } from "@/lib/localStorageDashboardStates";

export const DeviceSelectContext = createContext(null);

export default function DeviceSelectContextContextProvider({ children }) {
  const [showDevices, setShowDevices] = useState(false);

  //These useEffects are used to update localStorage when the state changes.

  // useEffect(() => {
  //   updateDashboardStateStorage("dataPlot", dataPlot);
  // }, [dataPlot]);

  // useEffect(() => {
  //   updateDashboardStateStorage("userDevices", userDevices);
  // }, [userDevices]);

  // useEffect(() => {
  //   updateDashboardStateStorage("selectedDevice", selectedDevice);
  // }, [selectedDevice]);

  // useEffect(() => {
  //   updateDashboardStateStorage(
  //     "latestDeviceDeployments",
  //     latestDeviceDeployments
  //   );
  // }, [latestDeviceDeployments]);

  // useEffect(() => {
  //   updateDashboardStateStorage(
  //     "showActiveDeviceMarkers",
  //     showActiveDeviceMarkers
  //   );
  // }, [showActiveDeviceMarkers]);

  return (
    <DeviceSelectContext.Provider
      value={{
        showDevices,
        setShowDevices,
      }}
    >
      {children}
    </DeviceSelectContext.Provider>
  );
}

// This approach exports the context as a custom hook.
// An advantage of this approach is that it reduces the amount of code
// needed to use the global context in a component.
// This approach also handles the (error) case where a component tries to use
// the global context outside of a SelectDeviceContextProvider.

// Usage (in client compoent only):
// import { useDashboardContext } from "@/contexts/SelectDeviceContext";
// const {dashboardState, setDashboardState} = useDashboardContext();

export function useDashboardContext() {
  const context = useContext(SelectDeviceContext);
  if (!context) {
    throw new Error(
      "Context must be used within a SelectDeviceContextProvider"
    );
  }
  return context;
}
