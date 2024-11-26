import { getServerSession } from "next-auth";

export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    // If user is authenticated and they select /user/ the redirect to /user/dashboard/
    router.push("user/dashboard")
  );
}
