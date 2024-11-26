import { useEffect, useState } from "react";
import { openDB } from "idb";
import { set } from "react-hook-form";

export default async function useGetIndexedDB() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const db = await openDB("ftd_db", 1);
    if (!db) {
        setError("db not found");
      console.log("db not found");
      return;
    }
  useEffect(() => {

    //create function to check if indexedDB exists
    
  }, []);
  return {loading, error};
}
