import dynamic from "next/dynamic";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation'



const LoginFormDynamic = dynamic(
  () => import("@/app/(pages)/login/LogInForm"),
  {
    ssr: false,
  }
);

export default async function LoginPage () {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/user/dashboard");
  }
  return <LoginFormDynamic />;
};


