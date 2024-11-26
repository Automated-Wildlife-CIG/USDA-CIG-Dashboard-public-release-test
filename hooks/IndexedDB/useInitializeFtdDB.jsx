import { useEffect, useState } from "react";
import { openDB } from "idb";

const useInitializeFtdDB = () => {
  const [db, setDB] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await openDB("ftd_db", 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("DashboardContextStore")) {
              db.createObjectStore("DashboardContextStore", { keyPath: "id" });
            }
          },
        });

        setDB(db);
      } catch (error) {
        console.error("Error opening database:", error);
      }
    };

    initDB();
  }, []);

  return db;
};

export default useInitializeFtdDB;
