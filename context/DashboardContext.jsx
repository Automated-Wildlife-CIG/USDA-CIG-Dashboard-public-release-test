"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import useInitializeFtdDB from "@/hooks/IndexedDB/useInitializeFtdDB";
import useUpdateDashboardContextIndexedDB from "@/hooks/IndexedDB/useUpdateDashboardContextIndexedDB";

export const DashboardContext = createContext(null);

export default function DashboardContextProvider({ children }) {
  const [senSurfData, setSenSurfData] = useState(null);
  const [dataPlot, setDataPlot] = useState(null);
  const [userDevices, setUserDevices] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [latestDeviceDeployments, setLatestDeviceDeployments] = useState(null);
  const [showSelectedDeviceInfo, setShowSelectedDeviceInfo] = useState(false);
  const [showActiveDevicesOnly, setShowActiveDevicesOnly] = useState(true);
  const [mapViewCenter, setMapViewCenter] = useState(null);
  const [mapView, setMapView] = useState(null);
  const [triggerMapReDraw, setTriggerMapReDraw] = useState(0);

  const { updateIndexedDB } = useUpdateDashboardContextIndexedDB();

  /*

  These setters will update the state and also update the indexedDB. There one for each state except for triggerMapReDraw.
  triggerMapReDraw is used to force a re-render of the map when the map view is changed. It is not stored in indexedDB

  the useCallback hook is used to memoize the setters so that they are not re-created on each render, because they are custom setters they are not automatically memoized by react
  */

  const userDevicesSetter = useCallback((data) => {
    setUserDevices(data);
    updateIndexedDB("DashboardContextStore", "userDevices", data);
  }, []);

  const latestDeviceDeploymentsSetter = useCallback((data) => {
    setLatestDeviceDeployments(data);
    updateIndexedDB("DashboardContextStore", "latestDeviceDeployments", data);
  }, []);

  const senSurfDataSetter = useCallback((data) => {
    setSenSurfData(data);
    updateIndexedDB("DashboardContextStore", "senSurfData", data);
  }, []);

  const dataPlotSetter = useCallback((data) => {
    setDataPlot(data);
    updateIndexedDB("DashboardContextStore", "dataPlot", data);
  }, []);

  const selectedDeviceSetter = useCallback((data) => {
    setSelectedDevice(data);
    updateIndexedDB("DashboardContextStore", "selectedDevice", data);
  }, []);

  const showSelectedDeviceInfoSetter = useCallback((data) => {
    setShowSelectedDeviceInfo(data);
    updateIndexedDB("DashboardContextStore", "showSelectedDeviceInfo", data);
  }, []);

  const showActiveDevicesOnlySetter = useCallback((data) => {
    setShowActiveDevicesOnly(data);
    updateIndexedDB("DashboardContextStore", "showActiveDevicesOnly", data);
  }, []);

  const mapViewCenterSetter = useCallback((data) => {
    setMapViewCenter(data);
    updateIndexedDB("DashboardContextStore", "mapViewCenter", data);
  }, []);

  const mapViewSetter = useCallback((data) => {
    setMapView(data);
    updateIndexedDB("DashboardContextStore", "mapView", data);
  }, []);

  /*

  The useInitializeFtdDB hook will check for the existence of dashboard_context_db in indexedDB
  if it exists, it will return the data from the FTDStore
  If the db does not exist, it will create it and return an empty object
  If data returned, it will be used to set the states in this useEffect below

  */
  const db = useInitializeFtdDB();

  const checkAndAddToDB = async (targetStore, items) => {
    const tx = db.transaction(targetStore, "readwrite");
    const store = tx.objectStore(targetStore);

    //check for state in indexedDB, if none add null state to indexedDB, if state exists, set context state to value in indexedDB

    items.forEach(async (item) => {
      const dbItem = await store.get(item.id);
      if (!dbItem) {
        // console.log(`adding ${item.id} to indexedDB`);
        await store.add(item);
      } else {
        //set application state to value in indexedDB
        switch (dbItem.id) {
          case "senSurfData":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setSenSurfData(dbItem.value);
            break;
          case "dataPlot":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setDataPlot(dbItem.value);
            break;
          case "userDevices":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setUserDevices(dbItem.value);
            // console.log(`setting ${dbItem.id} from indexedDB`);
            break;
          case "selectedDevice":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setSelectedDevice(dbItem.value);
            break;
          case "latestDeviceDeployments":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setLatestDeviceDeployments(dbItem.value);
            break;
          case "showSelectedDeviceInfo":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setShowSelectedDeviceInfo(dbItem.value);
            break;
          case "showActiveDevicesOnly":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setShowActiveDevicesOnly(dbItem.value);
            break;
          case "mapViewCenter":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setMapViewCenter(dbItem.value);
            break;
          case "mapView":
            // console.log(`setting ${dbItem.id} from indexedDB`);
            setMapView(dbItem.value);
            break;

          default:
            break;
        }
      }
    });
    await tx.done;
  };

  useEffect(() => {
    const keys = [
      "senSurfData",
      "dataPlot",
      "userDevices",
      "selectedDevice",
      "latestDeviceDeployments",
      "showSelectedDeviceInfo",
      "showActiveDevicesOnly",
      "mapViewCenter",
      "mapView",
    ];

    if (db) {
      const items = keys.map((key) => ({
        id: key,
        value: null,
      }));

      checkAndAddToDB("DashboardContextStore", items);
    }
  }, [db]);

  return (
    <DashboardContext.Provider
      value={{
        senSurfData,
        senSurfDataSetter,
        dataPlot,
        dataPlotSetter,
        userDevices,
        userDevicesSetter,
        selectedDevice,
        selectedDeviceSetter,
        latestDeviceDeployments,
        latestDeviceDeploymentsSetter,
        showSelectedDeviceInfo,
        showActiveDevicesOnly,
        showActiveDevicesOnlySetter,
        mapViewCenter,
        mapViewCenterSetter,
        mapView,
        mapViewSetter,
        triggerMapReDraw,
        setTriggerMapReDraw,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/*

This approach exports the context as a custom hook.
An advantage of this approach is that it reduces the amount of code
needed to use the global context in a component.
This approach also handles the (error) case where a component tries to use
the global context outside of a DashboardContextProvider.

Usage (in client compoent only):
import { useDashboardContext } from "@/contexts/DashboardContext";
const {dashboardState, setDashboardState} = useDashboardContext();

*/

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider",
    );
  }
  return context;
}
