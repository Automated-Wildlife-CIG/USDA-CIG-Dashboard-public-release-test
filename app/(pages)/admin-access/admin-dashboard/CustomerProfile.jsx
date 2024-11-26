"use client";

import { useContext } from "react";

import { CustomerPanelContext } from "@/context/CustomerPanelProvider";

export default function CustomerProfile() {
  const { customer } = useContext(CustomerPanelContext);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <p>
          Current customer email:{" "}
          {Object.keys(customer).length > 0 ? customer.user_email : null}
        </p>
        <p>
          Current customer id:{" "}
          {Object.keys(customer).length > 0 ? customer.userId : null}
        </p>
      </div>
    </div>
  );
}
