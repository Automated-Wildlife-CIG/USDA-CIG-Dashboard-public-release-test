"use client";

import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ReCaptcha from "@/components/ReCaptcha";
import fetchAllUsersNames from "@/lib/fetchUsers.js";
import dynamic from "next/dynamic";
import { CustomerPanelContext } from "@/context/CustomerPanelProvider";


export default function AdminRegisterUserDeviceForm({ title }) {

  const DevTool = dynamic(
    () => import("@hookform/devtools").then((module) => module.DevTool),
    { ssr: false }
  );

  const [humanVerified, setHumanVerified] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const router = useRouter();

  const {
    searchTerm,
    setSearchTerm,
    customerSearchResults,
    setCustomerSearchResults,
    customer,
    setCustomer,
    customerIsSelected,
    setCustomerIsSelected,
  } = useContext(CustomerPanelContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    setError, // Added setError from react-hook-form
    formState: { errors },
  } = useForm({mode: "onSubmit"});

  /* Get all users id, firstName, lastName to populate and register device to user */
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetchAllUsersNames("/api/users/user-data");
        setUserNames(res.rows);
      } catch (error) {
        setErrMsgs(error.message);
      }
    }
    fetchUsers();
  }, []);

  const validationConfig = {
    //keys must match the name attribute of the input field
    //comment out validation rules to force server validation for testing
    //to test client side validation, set useForm mode property to 'onChange' and uncomment validation rules

    devEUI: {
      required: "16 character device EUI required",
      minLength: 16,
    },
    deviceAddress: {
      required: "9-digit device address required",
    },
    deploymentNumber: {
      required: "Deployment number required",
    },
  };

  const onSubmit = async (e) => {
    // e.userId = customer.userId;
    if (customer.userId) {
      e.userId = customer.userId;
    } else {
      alert("Please select a customer");
      return;
    }
    // console.log("customer id in AdminRegisterUserDeviceForm", customer.userId);
    // e.userId = customer.userId;
    // console.log("e in AdminRegisterUserDeviceForm", e);
    try {
      const res = await fetch("/api/auth/register-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });

      if (res.ok) {
        reset();
        alert("Great news, the device has been registered.");
        setHumanVerified(false);
        router.push("/user/dashboard");
      } else {

            // +++++++++++ REGISTER SERVER ERROR HANDLING +++++++++++

            if (res.status === 500) {
              alert("Error registering device. Please try again.");
              return;
            }

        // +++++++++++ FORM FIELD ERROR HANDLING +++++++++++
        const data = await res.json();
        console.log("These errors messages need to be displayed to the user.");
        console.log(data);

        Object.keys(data).forEach((key) => {
          console.log(key, data[key]);

          if (key === "global") {
            setError("root.serverError", {
              type: "400",
              message: data[key].message,
            });
          } else {
            setError(key, {
              type: data[key].type,
              message: data[key].message,
            });
          }
        });

        // +++++++++++ FIX ERROR HANDLING +++++++++++
      }
    } catch (error) {
      console.log("Error when POSTING to the database", error);
      reset();
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} name="registerDeviceFrm" className="bg-fusionChartBg">
          {errors.root?.serverError?.message && (
        <div className="mb-4">
          <p className="form__error">{errors.root.serverError.message}</p>
        </div>
      )}

      <div className="form__field-container ">
      <label>Device EUI</label>
        <input
          placeholder="Enter Device EUI: 000b33394fb60bca"
          className="form__input "
          {...register("devEUI", validationConfig.devEUI )}
        />
        {errors.devEUI?.message ? (
          <p className="form__error">{errors.devEUI.message}</p>
        ) : null}
      </div>

      <div className="form__field-container">
      <label>Device Address</label>
        <input
          placeholder="Enter Device Address: 123456789"
          className="form__input"
          {...register("deviceAddress", validationConfig.deviceAddress)}
        />
        {errors.deviceAddress?.message ? (
          <p className="form__error">{errors.deviceAddress.message}</p>
        ) : null}
      </div>

      <div className="form__field-container">
      <label>Deployment</label>
        <input
          placeholder="Deployment Number"
          className="form__input"
          {...register("deploymentNumber", validationConfig.deploymentNumber)}
        />
    
        {errors.deploymentNumber?.message ? (
          <p className="form__error">{errors.deploymentNumber.message}</p>
        ) : null}
      </div>

      {humanVerified === false && (
        <div className="w-full flex justify-center">
       
          <ReCaptcha setHumanVerified={setHumanVerified} />
        </div>
      )}

      {humanVerified == true && (
        <>
          <Button className="w-full mb-10">Submit</Button>
        </>
      )}
      <DevTool control={control} />
    </form>
  );
}
