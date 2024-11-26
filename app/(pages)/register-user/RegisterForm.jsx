"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReCaptcha from "@/components/ReCaptcha";

export default function RegisterForm() {
  const [humanVerified, setHumanVerified] = useState(false);
  const router = useRouter();

  //CHANGE: (Imari) imported DevTool dynamically using next/dynamic to handle hydration error
  const DevTool = dynamic(
    () => import("@hookform/devtools").then((module) => module.DevTool),
    { ssr: false }
  );

  const {
    reset,
    resetField,
    watch,
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    // NOTE: (Imari) mode changed to onSubmit, this means validation will only occur when the form is submitted, the default mode is onChange which means validation will occur on every change to the form fields
    mode: "onSubmit",
  });

  const validationConfig = {
    //keys must match the name attribute of the input field
    //comment out validation rules to force server validation for testing
    //to test client side validation, set useForm mode property to 'onChange' and uncomment validation rules
    firstName: {
      required: "First Name is required",
      minLength: {
        value: 2,
        message: "First name must be at least 2 letters",
      },
    },
    lastName: {
      required: "Last Name is required",
      minLength: {
        value: 2,
        message: "Last name must be at least 2 letters",
      },
    },
    email: {
      required: "Email required",
      pattern: {
        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        message: "Email provided is not valid",
      },
    },
    password: {
      required: "Password required",
      minLength: {
        value: 8,
        message: "Password length must be 8 or more characters",
      },
      //CHANGE: (Imari) added pattern validation to password field to prevent spaces in the password
      pattern: {
        value: /^\S*$/,
        message: "No spaces are allowed in the password.",
      },
    },
    password2: {
      required: "Confirm Password required",
      //CHANGE: (Imari) removed minLength validation from password2 field, the password field already has a minLength validation, so the confirm password field does not need one

      //CHANGE: (Imari) validate function added to validate client side that the password and confirm password fields match
      validate: (value) => {
        if (watch("password") !== value) {
          return "Passwords do not match";
        }
      },
    },
  };

  const onSubmit = async (e) => {
    //CHANGE: (Imari) trim the password data before sending to backend
    e.password = e.password.trim();
    e.password2 = e.password2.trim();

    try {
      const res = await fetch("/api/auth/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });

      const resData = await res.json();

      if (res.ok) {
        console.log("res ok");
        console.log(res.message);
        router.push("/login");
      }

      if (!res.ok) {
        clearErrors();

        //reset password fields to null
        reset(
          {
            password: null,
            password2: null,
          },
          {
            keepErrors: true,
            keepDirty: true,
          }
        );

        //map errors from server to form fields

        Object.keys(resData).forEach((key) => {
          // console.log(key, resData[key]);

          if (key === "global") {
            setError("root.serverError", {
              type: "400",
              message: resData[key].message,
            });
          } else {
            setError(key, {
              type: resData[key].type,
              message: resData[key].message,
            });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    //CHANGE: (Imari) noValidate added to form, noValidate prevents the browser from validating the form, instead we use react-hook-form and server validation to validate the form
    <form onSubmit={handleSubmit(onSubmit)} name="registerForm" noValidate>
      {errors.root?.serverError?.message && (
        <div className="mb-4">
          <p className="form__error">{errors.root.serverError.message}</p>
        </div>
      )}

      <div className="form__field-container ">
        <div></div>
        <input
          placeholder="First Name"
          className="form__input "
          {...register("firstName", validationConfig.firstName)}
        />
        {errors.firstName?.message ? (
          <p className="form__error">{errors.firstName.message}</p>
        ) : null}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Last Name"
          className="form__input"
          {...register("lastName", validationConfig.lastName)}
        />
        {errors.lastName?.message ? (
          <p className="form__error">{errors.lastName.message}</p>
        ) : null}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Email"
          className="form__input"
          type="email"
          {...register("email", validationConfig.email)}
        />
        {errors.email?.message && (
          <p className="form__error">{errors.email.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Password"
          className="form__input"
          type="password"
          {...register("password", validationConfig.password)}
        />
        {errors.password?.message && (
          <p className="form__error">{errors.password.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Confirm Password"
          type="password"
          className="form__input"
          {...register("password2", validationConfig.password2)}
        />
        {errors.password2?.message && (
          <p className="form__error">{errors.password2.message}</p>
        )}
      </div>

      {humanVerified === false && (
        <div className="w-full flex justify-center mb-10 ">
          <ReCaptcha setHumanVerified={setHumanVerified} />
        </div>
      )}

      {humanVerified == true && (
        <>
          <Button className="w-full mb-10">Submit</Button>
          <div className="text-center">
            Already have an account? Log in
            <Link href="/login" className=" hover:font-semibold underline">
              here
            </Link>
          </div>
        </>
      )}
      <DevTool control={control} />
    </form>
  );
}