// import TokenClientTest from "@/components/TokenClientTest";

import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { redirect } from "next/navigation";
import LoginForm from "@/app/(pages)/login/LogInForm";
import TestComponent from "@/components/TestComponent";

export const metadata = {
  title: "FDT Welcome",
};

export default async function HomePage() {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/user/dashboard");
  }
  return (
    <div className="flex w-full flex-col items-center ">
      {/* <TestComponent /> */}
      <h1 className="mb-6 text-center text-6xl">Welcome to Field Data Tech</h1>
      <LoginForm />
    </div>
  );
}
