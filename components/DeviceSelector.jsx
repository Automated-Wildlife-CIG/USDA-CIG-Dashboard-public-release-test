"use client";

import { useState, useContext, useRef } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DashboardContext } from "@/context/DashboardContext";

import { senSurfDataFetch } from "@/lib/serverActions";

export default function DeviceSelector() {

  const [open, setOpen] = useState(false);
  const [selectedDeviceInDeviceSelector, setSelectedDeviceInDeviceSelector] =
    useState(null);
  const {
    userDevices,
    selectedDeviceSetter,
    senSurfDataSetter,
  } = useContext(DashboardContext);

  const handleSelectDevice = (device) => {

    const fetchData = async () => {
      let devEui = device.deviceEUI;
      let depNum = device.deploymentNumber;
      try {
        const result = await senSurfDataFetch({ devEui, depNum });
        setSelectedDeviceInDeviceSelector(device);
        senSurfDataSetter(result);
        selectedDeviceSetter(device);
      } catch (error) {
        console.error(`Error in component: ${error}`);
        // handle the error
      }
    };

    fetchData();
  
  };

  // This set a default selectedDevice on page load if none is selected
  // purpose is so that an empty chart is not displayed on page load
  // useEffect(() => {
  //   if (selectedDevice) {
  //     setSelectedDeviceInDeviceSelector(selectedDevice);
  //     return;
  //   }
  // }, [userDevices, selectedDevice]);


  return (
    <div
      className={cn(
        "flex w-full items-center bg-[#262a33] px-4 py-2",
        "md:justify-evenly md:py-4",
      )}
    >
      <div className="mr-4 flex flex-wrap items-center gap-2">
        <p className="whitespace-nowrap text-xl font-bold text-foregroundFixed">
          Select Device
        </p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex w-[200px] items-center justify-between"
            >
              {selectedDeviceInDeviceSelector ? (
                selectedDeviceInDeviceSelector.deviceEUI
              ) : (
                <span className="text-muted-foreground">
                  Select device here
                </span>
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-14 w-[300px] p-0">
            <Command>
              <CommandInput
                placeholder="Search by device EUI..."
                className="h-9 "
              />
              <CommandEmpty>No device found.</CommandEmpty>
              <CommandGroup>
                <div className="flex flex-nowrap justify-evenly gap-6">
                  <p>Device</p>
                  <p>Dep #</p>
                </div>
                {userDevices &&
                  userDevices.map((device) => (
                    <CommandItem
                      key={device.deviceEUI + device.deploymentNumber}
                      onSelect={() => {
                        handleSelectDevice(device);
                        setOpen(false);
                      }}
                    >
                      <div className="flex flex-nowrap gap-6">
                        <p>{device.deviceEUI}</p>-
                        <p>{device.deploymentNumber}</p>
                      </div>

                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedDeviceInDeviceSelector?.deviceEUI ===
                            device.deviceEUI &&
                            selectedDeviceInDeviceSelector?.deploymentNumber ===
                              device.deploymentNumber
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
