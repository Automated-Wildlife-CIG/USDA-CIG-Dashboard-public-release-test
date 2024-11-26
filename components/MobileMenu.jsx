"use client";

//TODO: Add SheetClose to Links

import React from "react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
  } from "@/components/ui/sheet";
  import { Separator } from "@/components/ui/separator";
  import { LuMenu } from "react-icons/lu";
  import { ToggleDarkLight } from "./ToggleDarkLight";
  import { authenticatedLinks, nonAuthenticatedLinks } from "@/lib/navLinks";

const MobileMenu = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <LuMenu className="lg:hidden h-10 w-10" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] pt-14">
          <div className="px-2 flex flex-col">
            {authenticatedLinks.map((link, idx) => (
              <Link key={idx} href={link.url} className="py-1 text-lg">
                <SheetClose >

                {link.title}
                </SheetClose>
              </Link>
            ))}
          </div>

          <Separator className="mb-4 mt-4" />
          <div className="px-2">
            <ToggleDarkLight />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;
