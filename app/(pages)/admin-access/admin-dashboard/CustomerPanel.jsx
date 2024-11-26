"use client";
import { useContext } from "react";
import AdminUserSearch from "./AdminUserSearch";
import RegisterManageUserDevices from "./RegisterManageUserDevices";
import { CustomerPanelContext } from "@/context/CustomerPanelProvider";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomerPanel() {
  const {
    searchTerm,
    setSearchTerm,
    customerSearchResults,
    setCustomerSearchResults,
    customer,
    setCustomer,
    customerIsSelected,
    setCustomerIsSelected,
  } = useContext(CustomerPanelContext);

  return (
    <div className="mb-20">
      <div className="flex flex-wrap items-center px-6 mb-6">
        <h1 className="text-2xl font-extrabold mr-24">Admin Dashboard</h1>

        <div className="flex">
          <div className="flex flex-wrap items-center mr-24">
            <h1 className="text-2xl mr-4 font-extrabold whitespace-nowrap ">
              Selected Customer:
            </h1>
            {customerIsSelected ? (
              <p className="text-xl whitespace-nowrap">
                {customer?.user_email}
              </p>
            ) : (
              <p className="text-xl whitespace-nowrap">No Customer Selected</p>
            )}
          </div>

          <div className="flex flex-wrap items-center whitespace-nowrap">
            <h1 className="text-2xl mr-4 font-extrabold  ">Selected Device:</h1>
            <p className="text-xl">selected device eui here</p>
          </div>
        </div>
      </div>

      <Card className="w-full flex justify-center pt-6">
        <CardContent className="w-full flex flex-col items-center gap-20 min-h-screen">
          {!customerIsSelected && (
            <div className="flex gap-4 items-center mt-20">
              <h1 className="text-2xl font-extrabold whitespace-nowrap ">
                Select Customer to begin:
              </h1>
              <AdminUserSearch />
            </div>
          )}

          {customerIsSelected && <RegisterManageUserDevices />}
        </CardContent>
      </Card>
    </div>
  );
}
