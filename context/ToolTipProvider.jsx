'use client'

import {
    TooltipProvider,
  } from "@/components/ui/tooltip";

  export function ToolTipProvider({ children }) {
    return <TooltipProvider>{children}</TooltipProvider>;
  }