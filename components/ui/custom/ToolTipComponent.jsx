"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ToolTipComponent({children, content, onClick, id}) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          className="w-50 rounded bg-background px-2 text-sm text-foreground"
          id={id}
          onClick={onClick ? () => onClick() : undefined}
        >
          <div className="flex w-9 items-center justify-center font-semibold text-foreground">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </>
  );
}
