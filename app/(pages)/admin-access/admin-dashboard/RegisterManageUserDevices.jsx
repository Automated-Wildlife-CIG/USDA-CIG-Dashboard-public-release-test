"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AdminRegisterUserDeviceForm from "./AdminRegisterUserDeviceForm";
import { Separator } from "@/components/ui/separator";

export default function RegisterManageUserDevices() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-2xl font-extrabold mb-10">
        Register or Manage User Devices
      </h1>
      <div className=" mx-auto">
        <Tabs defaultValue="registerDevice" className="w-[400px]">
          <TabsList className="tabs-list">
            <TabsTrigger value="registerDevice">Register Device</TabsTrigger>
            <Separator orientation="vertical" />
            <TabsTrigger value="manageDevice">Manage Device</TabsTrigger>
          </TabsList>
          <TabsContent value="registerDevice">
            <AdminRegisterUserDeviceForm />
          </TabsContent>
          <TabsContent value="manageDevice">
            This form will use deviceEUI from a dropdown.
            <br />
            <br />
            Is it correct to say that a device may have a deployment history?
            <br />
            <br />
            When the user is selected in the search window, should all of their
            devices be also fetched? Or only on a as needed basis? <br />
            <br />
            Would pagination be needed if there are many devices? Is it likely a
            user would have many devices? <br />
            <br />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
