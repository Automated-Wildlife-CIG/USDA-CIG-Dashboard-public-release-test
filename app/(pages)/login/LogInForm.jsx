"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";

import Link from "next/link";

export default function LoginForm({ title }) {
  const router = useRouter();

  const DevTool = dynamic(
    () => import("@hookform/devtools").then((module) => module.DevTool),
    { ssr: false },
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const validationConfig = {
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
      pattern: {
        value: /^\S*$/,
        message: "No spaces are allowed in the password.",
      },
    },
  };

  const onSubmit = async (e) => {
    const { email, password } = e;
    // console.log("login submitted");

    //NOTE: The response from the next-auth signIn function is a promise, not a typical http response. The status will always be 200, even if the server returns a 400 or 500 error. The response will contain an error object if the server returns an error. The error object will contain the error message sent from the next-auth sign in callback.
    // The error object will be a string. The string will need to be parsed into a JSON object before it can be used. The JSON object will contain the error messages from the next-auth sign in callback. The error messages will be in the following format:

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        clearErrors();

        let parsedErrors = JSON.parse(res.error);

        //map errors from server to form fields

        Object.keys(parsedErrors).forEach((key) => {
          if (key === "global") {
            setError("root.serverError", {
              type: "400",
              message: parsedErrors[key].message,
            });
          } else {
            setError(key, {
              type: parsedErrors[key].type,
              message: parsedErrors[key].message,
            });
          }
        });
      } else {
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.log("error in login form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="loginForm" noValidate>
      {errors.root?.serverError?.message && (
        <div className="mb-4">
          <p className="form__error">{errors.root.serverError.message}</p>
        </div>
      )}
      <h1
        id="login-header"
        className="mb-4 text-center text-4xl font-bold text-primary"
      >
        {title}
      </h1>
      <div></div>
      <div className="form__field-container">
        <input
          className="form__input"
          type="email"
          {...register("email", validationConfig.email)}
          placeholder="Email"
        />
        {errors?.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div className="form__field-container">
        <input
          className="form__input"
          type="password"
          {...register("password", validationConfig.password)}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-sm text-red-400">{errors?.password.message}</p>
        )}
      </div>

      <div className="mb-10 flex flex-col gap-4">
        <Button type="submit"> Submit </Button>

        {/* <Button
          type="button"
          id="sub-btn-google"
          onClick={() => signIn("google")}
          className="btn form__submit-button my-4"
        >
          Sign in with Google
        </Button>  */}
        {/* <button
          type="button"
          id="sub-btn-google"
          onClick={() => signIn("google")}
          className="btn form__submit-button my-4"
        >
          Sign in with Google
        </button> */}
      </div>

      <div className="text-center">
        Don't have an account? Register{" "}
        <Link href="/register-user" className=" underline hover:font-semibold">
          here
        </Link>
        .
      </div>
      <DevTool control={control} />
    </form>
  );
}
