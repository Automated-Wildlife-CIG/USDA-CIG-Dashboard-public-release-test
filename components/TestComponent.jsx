"use client";
import React, { useEffect } from "react";
import useUpdateDashboardContextIndexedDB from "@/hooks/IndexedDB/useUpdateDashboardContextIndexedDB";

export default function TestComponent() {
  const { updateIndexedDB } = useUpdateDashboardContextIndexedDB();

  let handleClick = async function () {
    updateIndexedDB("DashboardContextStore", "userDevices", "candles");
  };

  return (
    <div>
      <h1>User Devices</h1>
      <button onClick={handleClick}> click</button>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
