import { useState } from "react";
import { deleteDB } from "idb";

function useDeleteDatabase() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const deleteDatabase = async (databaseName) => {
    setStatus("deleting");
    try {
      await deleteDB(databaseName, {
        // blocked() {
        //   console.log("Please close all other tabs with this site open!");
        //   setStatus("blocked");
        // },
      });
      console.log("Database successfully deleted");
      setStatus("deleted");
    } catch (err) {
      console.error("Failed to delete database:", err);
      setError(err);
      setStatus("error");
    }
  };

  return { deleteDatabase, status, error };
}

export default useDeleteDatabase;
