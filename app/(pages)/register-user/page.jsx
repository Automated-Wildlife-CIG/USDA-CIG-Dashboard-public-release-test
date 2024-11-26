import dynamic from "next/dynamic";

//used dynamic here to handle hydration error I think caused by react-hook form
const RegisterFormDynamic = dynamic(
  () => import("@/app/(pages)/register-user/RegisterForm"),
  { ssr: false },
);

export const metadata = {
  title: "FDS Register",
};

const RegisterUserPage = () => {
  return (
    <>
      <RegisterFormDynamic />
    </>
  );
};

export default RegisterUserPage;
