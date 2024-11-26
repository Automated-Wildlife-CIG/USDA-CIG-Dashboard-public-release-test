"use client";

import { useEffect, useContext } from "react";
import fetchUsersAutocomplete from "@/lib/fetchUsersAutocomplete";
import AdminUserSearchResults from "./AdminUserSearchResults";
import { CustomerPanelContext } from "@/context/CustomerPanelProvider";
import { Search } from "lucide-react"

export default function AdminUserSearch() {
  const {
    searchTerm,
    setSearchTerm,
    customer,
    customerSearchResults,
    setCustomerSearchResults,
  } = useContext(CustomerPanelContext);

  const resetSearch = () => {
    setSearchTerm("");
    setCustomerSearchResults([]);
  };

  const handleInputChange = async (event) => {
    //remove all whitespace from search term
    const userInput = event.target.value.replace(/\s/g, "");
    if (event.target.value.length === 0) {
      resetSearch();
    } else {
      setSearchTerm(userInput);
    }
  };

  useEffect(() => {
    async function fetchUsers(data) {
      try {
        const res = await fetchUsersAutocomplete(data);
        // console.log("res.rows", res.rows);
        setCustomerSearchResults(res.rows);
        if (res.rows) {
          console.log("interim customer search results", res.rows)
          setCustomerSearchResults(prev => {
            return [...prev, res.rows]
          });
        }
      } catch (error) {
        console.log("error from fetch users autocomplet", error.message);
      }
    }

    if (searchTerm && searchTerm.length > 1) {
      fetchUsers(searchTerm);
    }
  }, [searchTerm]);

  return (
  
      <div className="search-container w-full justify-center bg-background">
        <div className="search-input">
          <div className="flex items-center whitespace-nowrap">
            <div className="relative">
              <Search className="absolute right-2 top-1 h-4 w-4 shrink-0 opacity-50" />
              <input
                type="text"
                value={searchTerm}
                placeholder= "Search customers"
                onChange={handleInputChange}
                onBlur={resetSearch}
                className={` border-solid border-gray-300 border px-2  rounded-md  ${
                  customerSearchResults?.length > 0
                    ? "rounded-t border-t border-l border-r"
                    : "bg-background"
                }`}
              />

              <AdminUserSearchResults />
            </div>
          </div>
        </div>
      </div>
    
  );
}
