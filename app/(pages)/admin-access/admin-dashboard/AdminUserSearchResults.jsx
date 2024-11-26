"use client";
import { useContext } from "react";
import { CustomerPanelContext } from "@/context/CustomerPanelProvider";
import fetchUsersAutocomplete from "@/lib/fetchUsersAutocomplete";

export default function AdminUserSearchResults() {
  const {
    setSearchTerm,
    customerSearchResults,
    setCustomerSearchResults,
    setCustomer,
    setCustomerIsSelected,
  } = useContext(CustomerPanelContext);

  const selectCustomer = async (e) => {
    const userSelection = e.target.textContent.replace(/\s/g, "");

    try {
      const res = await fetchUsersAutocomplete(userSelection);

      const user_email = res.rows[0].user_name_email;
      const userId = res.rows[0].id;

      setCustomer((prev) => {
        return { ...prev, user_email, userId };
      });

      setSearchTerm(null);

      setCustomerIsSelected(true);

      setCustomerSearchResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`result-box w-full border-l border-r border-b border-solid border-gray-300 py-2 px-4 rounded-b bg-background   ${
        customerSearchResults?.length > 0 ? "block absolute" : "hidden"
      }`}
    >
      <ul>
        {customerSearchResults?.length > 0 &&
          customerSearchResults.map((result, index) => (
            <li
              key={index}
              onMouseDown={(e) => e.preventDefault()}
              onClick={selectCustomer}
              className="cursor-pointer mb-1"
            >
              {result.user_name_email}
            </li>
          ))}
       
      </ul>
    </div>
  );
}
