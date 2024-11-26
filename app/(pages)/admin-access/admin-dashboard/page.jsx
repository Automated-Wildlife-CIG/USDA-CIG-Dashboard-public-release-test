import AdminDashboard from "./AdminDashboard";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user.admin) {
    redirect("/");
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
