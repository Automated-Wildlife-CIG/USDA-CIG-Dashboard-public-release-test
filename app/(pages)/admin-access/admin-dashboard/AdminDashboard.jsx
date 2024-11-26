'use client'

import React from "react";
import CustomerPanelProvider from "@/context/CustomerPanelProvider";
import CustomerPanel from "./CustomerPanel";

export default function AdminDashboard() {
  return (
    <CustomerPanelProvider>
      <CustomerPanel />
    </CustomerPanelProvider>
  );
}
