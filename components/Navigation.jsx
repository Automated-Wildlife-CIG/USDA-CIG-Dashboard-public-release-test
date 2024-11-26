"use client";
import React, { useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import {
  authenticatedLinks,
  nonAuthenticatedLinks,
  authenticatedAdmin,
} from "@/lib/navLinks";

export default function Navigation() {
  const { data: session, status } = useSession();

  let linksToUse = nonAuthenticatedLinks;
  if (status === "authenticated") {
    linksToUse = session.user.admin ? authenticatedAdmin : authenticatedLinks;
  }

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          {linksToUse.map((link, idx) => {
            let title = link.title;
            if (
              title === "Welcome" &&
              session &&
              session.user &&
              session.user.firstName
            ) {
              title += `, ${session.user.firstName}`;
            }
            return (
              <NavigationMenuItem key={idx}>
                <Link href={link.url} passHref legacyBehavior>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    style={{ fontSize: "18px" }}
                  >
                    {title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
