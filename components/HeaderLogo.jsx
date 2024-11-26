"use client";

import React from "react";
import Link from "next/link";
import FDTBirdLogo from "@/public/images/FDTBirdLogo";

const HeaderLogo = () => {
  return (
    <Link
      href="/"
      className="ml-4 hidden sm:ml-8 md:flex md:flex-auto  md:items-center lg:ml-0 "
    >
      {/* <div className=" h-12 w-20 relative hidden sm:block">
        <Image
          src="/images/fdt-logo-bird-white.svg"
          alt="FDT White Image"
          fill
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div> */}
      <div className=" relative hidden h-12 w-20 text-primary sm:block">
        <FDTBirdLogo />
      </div>
      <div className="flex md:ml-4 md:flex-col md:whitespace-nowrap">
        <span className="inline-block text-lg"> Field Data Technologies</span>
        <span className="inline-block text-lg">
          {" "}
          Science Ready Smart Cameras
        </span>
      </div>
    </Link>
  );
};

export default HeaderLogo;
