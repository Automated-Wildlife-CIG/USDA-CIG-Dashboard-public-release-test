import { NextResponse } from "next/server";

//this will catch the POST request from the client
export async function POST(request) {
  const { recaptchaToken } = request.body;
  //console.log("recaptchaToken server route", recaptchaToken);
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

  const recaptcha_url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}&remoteip=${
    request.headers.get("x-forwarded-for") || request.socket.remoteAddress
  }`;

  try {
    const response = await fetch(recaptcha_url, { method: "POST" });
    const body = await response.json();

    if (body.success !== undefined && !body.success) {
      return NextResponse.json({ message: "Captcha validation failed" });
    }

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  }
}
