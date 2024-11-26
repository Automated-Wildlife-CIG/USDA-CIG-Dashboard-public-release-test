import React from "react";
import Dashboard from "./Dashboard";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/");
  }

  if (session.user.admin) {
    redirect("/admin-access/admin-dashboard");
  }

  return (
    <div className="h-full">
      <Dashboard />
    </div>
  );
}
