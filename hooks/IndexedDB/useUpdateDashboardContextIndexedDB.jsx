import { openDB } from "idb";

const useUpdateDashboardContextIndexedDB = () => {
  const updateIndexedDB = async (storeName, key, value) => {
    try {
      const db = await openDB("ftd_db", 1);
      if (!db) {
        console.log("db not found");
        return;
      }

      if (db) {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        // Check if the key exists
        const retrievedValue = await store.get(key);
        if (retrievedValue === undefined) {
          console.log("Key does not exist");
          return;
        }

        // Update the value
        const request = store.put({ id: key, value: value });

        request.onsuccess = function (event) {
          console.log("Value updated successfully");
        };

        request.onerror = function (event) {
          console.log("Error updating value: ", request.error);
        };
      }
    } catch (error) {
      console.error("Error opening database:", error);
    }
  };

  return { updateIndexedDB };
};

export default useUpdateDashboardContextIndexedDB;
