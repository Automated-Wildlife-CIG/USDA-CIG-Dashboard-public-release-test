"use client";

import { useState, useContext, useEffect } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DashboardContext } from "@/context/DashboardContext";

export default function MapViewSelector({ className }) {
  const [open, setOpen] = useState(false);
  const [selectedViewInMapViewSelector, setSelectedViewInMapViewSelector] =
    useState(null);
  const { mapView, mapViewSetter, setTriggerMapReDraw } =
    useContext(DashboardContext);

  const handleSelectView = (view) => {
    setSelectedViewInMapViewSelector(view);
    mapViewSetter(view.value);
    setTriggerMapReDraw((prev) => prev + 1);
  };

  const mapViewStates = [
    { name: "Selected Device", value: "current-device" },
    { name: "Active Devices", value: "active-devices" },
    { name: "All Devices", value: "all-devices" },
  ];

  useEffect(() => {
    // update local Map View state if map view is changed from outside of this component
    if (selectedViewInMapViewSelector?.value !== mapView) {
      let currentName;
      let currentValue;

      switch (mapView) {
        case "all-devices":
          currentName = "All Devices";
          currentValue = "all-devices";
          break;
        case "current-device":
          currentName = "Selected Device";
          currentValue = "current-device";
          break;
        case "active-devices":
          currentName = "All Active Devices";
          currentValue = "active-devices";
          break;
        default:
          currentName = "All Devices";
          currentValue = "all-devices";
          break;
      }

      setSelectedViewInMapViewSelector({
        name: currentName,
        value: currentValue,
      });
    }
  }, [mapView]);

  return (
    <div className={cn("", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex items-center justify-between"
          >
            <span className="text-foreground">
              {selectedViewInMapViewSelector?.name ? (
                <span>Now Viewing: {selectedViewInMapViewSelector.name}</span>
              ) : (
                "select"
              )}
            </span>
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" ml-8 p-0 ">
          <Command>
            <CommandGroup>
              {mapViewStates.map((mapViewState, idx) => (
                <CommandItem
                  key={idx}
                  onSelect={() => {
                    handleSelectView(mapViewState);
                    setOpen(false);
                  }}
                >
                  {mapViewState.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
