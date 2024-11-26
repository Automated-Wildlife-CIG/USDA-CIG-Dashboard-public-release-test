import React, { createContext, useState } from "react";

export const CustomerPanelContext = createContext();

const CustomerPanelProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [customer, setCustomer] = useState({});
  const [customerIsSelected, setCustomerIsSelected] = useState(false);

  return (
    <CustomerPanelContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        customerSearchResults,
        setCustomerSearchResults,
        customer,
        setCustomer,
        customerIsSelected,
        setCustomerIsSelected,
      }}
    >
      {children}
    </CustomerPanelContext.Provider>
  );
};

export default CustomerPanelProvider;
