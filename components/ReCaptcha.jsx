import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import { useTheme } from "next-themes";


const ReCaptcha = ({ setHumanVerified }) => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  //set recaptcha token to send to backend
  function onChange(value) {
    //console.log("Captcha value:", value);
    setRecaptchaToken(value);
  }

  const { systemTheme } = useTheme();

  useEffect(() => {
    if (recaptchaToken) {
      getRecaptchaResponse();
    } else {
      // console.log("recaptcha token is null");
    }
  }, [recaptchaToken]);

  const getRecaptchaResponse = async () => {
    try {
      //send token to backend
      const response = await fetch("/api/verify-human", {
        method: "POST",
        body: JSON.stringify({
          recaptchaToken: recaptchaToken,
        }),
      });

      // const reCaptchaStatus = response.status;
      //console.log("recaptcha response", response);

      if (response.status === 200) {
        setHumanVerified(true);
      }
      // console.log("recaptcha status", reCaptchaStatus);
      // if (reCaptchaStatus === 400) {
      //   setHumanVerified(true);
      // }
      // return reCaptchaStatus;
    } catch (error) {
      console.log("recaptcha error", error);
    }
  };

  return (

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onChange}
        theme={systemTheme === "dark" ? "dark" : "light"}
      />
   
  );
};

export default ReCaptcha;
