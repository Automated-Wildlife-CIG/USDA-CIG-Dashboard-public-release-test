import { useState, useEffect } from "react";
import { useDashboardContext } from "@/context/DashboardContext";
import { useSession } from "next-auth/react";
import { getLatestDeviceDeployments } from "@/lib/getLatestDeviceDeployments";
import { openDB } from "idb";

const useFetchAllUserDevices = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { latestDeviceDeploymentsSetter, userDevicesSetter } =
    useDashboardContext();

  const { data: session } = useSession();
  const id = session?.user?.id;
  const firstName = session?.user?.firstName;

  const fetchAllUserDevices = async () => {
    //TODO: handle fetch caching?
    try {
      const response = await fetch(
        `/api/user-device-data?userId=${id}&firstName=${firstName}`,
      );
      if (!response.ok) throw new Error("Unable to fetch user devices");
      const data = await response.json();
      userDevicesSetter([...data.userDeviceData]);
      latestDeviceDeploymentsSetter([
        ...getLatestDeviceDeployments(data.userDeviceData),
      ]);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchIndexedDB = async () => {
    try {
      const db = await openDB("ftd_db", 1);
      if (!db) {
        throw new Error("Unable to open indexedDB. Refresh the page to rebuild database.");
      } else {
        const userDeviceResult = await db.get(
          "DashboardContextStore",
          "userDevices",
        );

        if (userDeviceResult.value == null) {
          fetchAllUserDevices();
          return;
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchIndexedDB();
    }
  });

  return { loading, error };
};

export default useFetchAllUserDevices;
