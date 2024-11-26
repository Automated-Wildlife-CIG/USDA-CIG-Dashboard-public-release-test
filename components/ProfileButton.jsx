"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VscAccount } from "react-icons/vsc";
import { useSession, signOut } from "next-auth/react";
import useDeleteDatabase from "@/hooks/IndexedDB/useDeleteDatabase";

const ProfileButton = () => {
  const { data: session, status } = useSession();
  const { deleteDatabase } = useDeleteDatabase();
  const router = useRouter();

  const handleSignOut = async () => {
    deleteDatabase("ftd_db");
    console.log("signing out")
    const data = await signOut({ redirect: true, callbackUrl: "/" });
    return;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session && (
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              <VscAccount className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
        )}

        {/* {!session && <VscAccount className="h-7 w-7 mr-1" />} */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-2 mt-2" />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/user/manage-device">Dashboard</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="cursor-pointer">
          <Link href="/user/manage-device">Manage Device</Link>
        </DropdownMenuItem> */}
        {/* <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem> */}

        <DropdownMenuSeparator className="mb-2 mt-2" />
        {session && (
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            Sign Out
          </DropdownMenuItem>
        )}
        {!session && (
          <DropdownMenuItem className="cursor-pointer">
            {" "}
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
