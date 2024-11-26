'use client'
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardContext } from "@/context/DashboardContext";
import { useManageDeviceContext } from "@/context/ManageDeviceProvider";
import useFetchAllUserDevices from "@/hooks/useFetchAllUserDevices";
import ManageDeviceMap from "@/components/manageDeviceMap/ManageDeviceMap";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";


export default function AdminManageDevice() {
  const { userDevices } = useDashboardContext();
  const { selectedDeviceToManage, setSelectedDeviceToManage } =
    useManageDeviceContext();
  const { loading: devicesLoading } = useFetchAllUserDevices();
  const handleSelectDevice = (device) => {
    setSelectedDeviceToManage(device);
  };

  if (devicesLoading) {
    return <div>Loading Devices...</div>;
  }


  return (
    <div>
         <div className="mb-20">
      <div className="mb-6 flex flex-wrap items-center px-6">
        <h1 className="mr-24 text-2xl font-extrabold">Manage Devices</h1>

        <div className="flex">
          <div className="mr-24 flex flex-wrap items-center">
            <h1 className="mr-4 whitespace-nowrap text-2xl font-extrabold ">
              Selected Device:
            </h1>

            {selectedDeviceToManage ? (
              <p className="whitespace-nowrap text-xl">
                {selectedDeviceToManage.deviceEUI}
              </p>
            ) : (
              <p className="whitespace-nowrap text-xl">No Device Selected</p>
            )}
          </div>

          <div className="flex flex-wrap items-center whitespace-nowrap">
            <h1 className="mr-4 text-2xl font-extrabold  ">
              Selected Deployment:
            </h1>
            {selectedDeviceToManage?.deploymentNumber ? (
              <p className="whitespace-nowrap text-xl">
                {selectedDeviceToManage.deploymentNumber}
              </p>
            ) : (
              <p className="whitespace-nowrap text-xl">No Device Selected</p>
            )}
          </div>
        </div>
      </div>
      <div className="mb-8 max-w-md"></div>

      <Card className="flex w-full justify-center pt-6">
        <CardContent className="flex min-h-screen w-full flex-col items-center gap-20">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center">
              <Accordion type="single" collapsible className="max-w-md grow">
                {userDevices !== null &&
                  userDevices.map((device) => (
                    <AccordionItem
                      key={device.deviceEUI + device.deploymentNumber}
                      value={device.deviceEUI + device.deploymentNumber}
                      className="mb-2"
                    >
                      <AccordionTrigger
                        className="rounded-md px-3 hover:bg-accent hover:no-underline"
                        onClick={() => handleSelectDevice(device)}
                      >
                        {device.deviceEUI}
                      </AccordionTrigger>
                      <AccordionContent className="px-3">
                        <p>
                          Deployment: {device.deploymentNumber} (form field to
                          update)
                        </p>
                        <p>Device Type: {device.type} (form field to update)</p>
                        <p>...and other fields</p>

                        <Button className="mt-2">
                          Apply Changes (Will post to server)
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
            <div className="h-[600px]">
             
              <ManageDeviceMap />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
