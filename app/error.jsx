"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const error = ({ error, reset }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-destructive text-6xl">
        {error.message || "something went wrong"}
      </h1>
      <br />

      <Button>
        <Link href="/">Log In/Register</Link>
      </Button>
    </div>
  );
};

export default error;
