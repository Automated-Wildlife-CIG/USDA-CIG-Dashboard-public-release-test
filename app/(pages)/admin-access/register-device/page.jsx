"use client";

import { useSession } from "next-auth/react";
import RegisterDeviceForm from "./RegisterDeviceForm";
import LoadingPage from "../../loading-page/page.jsx";

export default function RegisterDevice() {
  const { data: session, status } = useSession();
  console.log("Someone has accessed the admin-register device page.");
  console.log(session);

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    return <p>Register Device Access Denied</p>;
  }

  return <RegisterDeviceForm />;
}
