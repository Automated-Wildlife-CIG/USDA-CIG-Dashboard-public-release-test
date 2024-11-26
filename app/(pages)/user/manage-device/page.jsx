"use client";

import { useSession } from "next-auth/react";
import ManageDeviceForm from "./ManageDeviceForm";
import LoadingPage from "../../loading-page/page.jsx";

export default function RegisterDevice() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    return <p>Manage Device Access Denied</p>;
  }

  return <ManageDeviceForm />;
}
