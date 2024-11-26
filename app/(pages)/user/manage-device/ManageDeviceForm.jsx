"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ReCaptcha from "@/components/ReCaptcha";
// import ErrorGoogle from "@/components/ErrorGoogleMap";
import fetchAllUserDeviceData from "@/lib/fetchAllUserDeviceData.js";

export default function RegisterDeviceForm({ title }) {
  const { data: session } = useSession();
  const [errMsgs, setErrMsgs] = useState(null);
  const [humanVerified, setHumanVerified] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [selectedDeviceData, setSelectedDeviceData] = useState(null);
  const router = useRouter();

  const userId = session?.user?.id || session?.token?.id;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchDeviceData() {
      try {
        const res = await fetchAllUserDeviceData(userId);
        // console.log(res.rows);
        setDeviceData(res.rows);
      } catch (error) {
        setErrMsgs(error.message);
      }
    }
    fetchDeviceData();
  }, []);

  useEffect(() => {
    if (selectedDevice && selectedDeployment) {
      const deploymentNumber = Number(selectedDeployment);
      const selectedData = deviceData.find(
        (device) =>
          device.dev_eui === selectedDevice &&
          device.deployment_num === deploymentNumber
      );

      setSelectedDeviceData(selectedData);
    }
  }, [selectedDevice, selectedDeployment]);

  const handleDeviceChange = (e) => {
    const newSelectedDevice = e.target.value;
    setSelectedDevice(newSelectedDevice);
    setSelectedDeployment(null);
    setSelectedDeviceData(null);
  };

  const handleDeploymentChange = (e) => {
    const newSelectedDeployment = e.target.value;
    setSelectedDeployment(newSelectedDeployment);

    if (selectedDevice) {
      const deploymentNumber = Number(newSelectedDeployment);
      const selectedData = deviceData.find(
        (device) =>
          device.dev_eui === selectedDevice &&
          device.deployment_num === deploymentNumber
      );
      setSelectedDeviceData(selectedData);
    }
  };

  const deployments = deviceData
    .filter((device) => device.dev_eui === selectedDevice)
    .map((device) => device.deployment_num);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/manage-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        alert("Great news, the device data has been updated.");
        setHumanVerified(false);
      } else {
        const errorData = await res.json();
        errorData.map((errorMsg) =>
          setError("register_error", {
            type: "manual",
            message: errorMsg,
          })
        );
      }
    } catch (error) {
      setErrMsgs(error.message);
      reset();
    }
  };

  if (errMsgs) {
    return <ErrorGoogle message={errMsgs} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="ManageDeviceDataFrm">
      <div className="form__field-container">
        <label className="text-md font-bold">Device EUI</label>
        <select
          {...register("devEUI", { required: true })}
          onChange={handleDeviceChange}
          className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3  text-gray-200"
        >
          <option value="">Select a device</option>
          {deviceData.map((device, index) => (
            <option className="text-black" key={index} value={device.dev_eui}>
              {device.dev_eui}
            </option>
          ))}
        </select>
        {errors.devEUI && <p className="form__error">Device EUI is required</p>}
      </div>

      <div className="form__field-container">
        <label className="text-md font-bold">Deployment Number</label>
        <select
          {...register("deploymentNumber", { required: true })}
          onChange={handleDeploymentChange}
          className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3 text-gray-200"
        >
          <option value="">Select a deployment</option>
          {deployments.map((deployment, index) => (
            <option className="text-black" key={index} value={deployment}>
              {deployment}
            </option>
          ))}
        </select>
        {errors.deploymentNumber && (
          <p className="form__error">Deployment number is required</p>
        )}
      </div>

      {selectedDeviceData && (
        <>
          <div className="form__field-container">
            <label className="text-md font-bold">Device Address</label>
            <input
              type="text"
              {...register("deviceAddr")}
              defaultValue={selectedDeviceData.device_addr}
              className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3 text-gray-200"
            />
          </div>
          <div className="form__field-container">
            <label className="text-md font-bold">Date Deployed</label>
            <input
              type="date"
              {...register("dateDeployed")}
              defaultValue={
                new Date(selectedDeviceData.date_deployed)
                  .toISOString()
                  .split("T")[0]
              }
              className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3 text-gray-200"
            />
          </div>

          <div className="form__field-container">
            <label className="text-md font-bold">Project Name</label>
            <input
              type="text"
              {...register("projectName")}
              defaultValue={selectedDeviceData.project_name}
              className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3 text-gray-200"
            />
          </div>

          <div className="form__field-container">
            <label className="text-md font-bold">Project Description</label>
            <input
              type="text"
              {...register("projectDescription")}
              defaultValue={selectedDeviceData.project_description}
              className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3 text-gray-200"
            />
          </div>

          <div className="form__field-container">
            <label className="text-md font-bold">Marker Name</label>
            <input
              type="text"
              {...register("markerName")}
              defaultValue={selectedDeviceData.marker_name}
              className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3 text-gray-200"
            />
          </div>

          <div className="form__field-container">
            <label className="text-md font-bold">Image Name</label>
            <input
              type="text"
              {...register("imageName")}
              defaultValue={selectedDeviceData.image_name}
              className="mt-2 w-full h-10 border-2 border-white bg-transparent pl-3 text-gray-200"
            />
          </div>
        </>
      )}

      {humanVerified === false && (
        <div className="w-full flex justify-center mb-10 ">
          <ReCaptcha setHumanVerified={setHumanVerified} />
        </div>
      )}

      {humanVerified == true && (
        <>
          <Button className="w-full mb-10">Modify</Button>
        </>
      )}
    </form>
  );
}
