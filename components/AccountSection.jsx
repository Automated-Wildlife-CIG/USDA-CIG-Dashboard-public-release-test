"use client";

import ProfileButton from "./ProfileButton";
import HeaderLogInRegisterLinks from "@/components/HeaderLogInRegisterLinks";
import { useSession } from "next-auth/react";

export default function AccountSection(serverSession) {
  const { data: session, status } = useSession();
  // console.log("session in account section: ", session);

  return (
    <div className="sm:flex">
      {serverSession ? (
        <ProfileButton serverSession={serverSession} />
      ) : (
        <HeaderLogInRegisterLinks />
      )}
    </div>
  );
}
