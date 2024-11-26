import { pool } from "../../../../models/dbConfig.js";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server.js";
import validator from "email-validator";

export async function POST(request) {
  const { firstName, lastName, email, password, password2 } =
    await request.json();

  let serverValidationErrors = {};
  // VALIDATION CHECKS - This is always done server side but can be done client side, too

  if (!email || !firstName || !lastName || !password || !password2) {
    //TODO: make this a root level error, not mapped to a field
    serverValidationErrors.global = {
      type: 400,
      field: "none",
      message: "All fields are required",
    };
  }

  if (!validator.validate(email)) {
    serverValidationErrors.email = {
      type: "server",
      field: "email",
      message: "Email provided is not valid",
    };
  }

  if (firstName.length < 2) {
    serverValidationErrors.firstName = {
      type: "minLength",
      field: "server",
      message: "First name must be at least 2 letters",
    };
  }

  if (lastName.length < 2) {
    serverValidationErrors.lastName = {
      type: "minLength",
      field: "lastName",
      message: "Last name must be at least 2 letters",
    };
  }

  if (password.length < 8) {
    serverValidationErrors.password = {
      type: "minLength",
      field: "password",
      message: "Password length must be 8 or more characters",
    };
  }

  if (password !== password2) {
    serverValidationErrors.password = {
      type: "match",
      field: "password",
      message: "Passwords do not match",
    };
  }

  // Check if user email already exists

  const existingUser = await pool.query(
    "SELECT * FROM user_profile WHERE user_name_email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    serverValidationErrors.email = {
      type: "exists",
      field: "email",
      message: "Email already exists",
    };
  }

  if (Object.keys(serverValidationErrors).length > 0) {
    const formValidationErrors = JSON.stringify(serverValidationErrors);
    return new NextResponse(formValidationErrors, { status: 403 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const registerNewUser = {
    text: `INSERT INTO user_profile (first_name, last_name, user_name_email, pass)
           VALUES ($1, $2, $3, $4);`,
    values: [firstName, lastName, email, hashedPassword],
  };

  try {
    await pool.query(registerNewUser);

    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.log(`Error when posting to the new database`, err.message);

    return new NextResponse(JSON.stringify({ error: `${err.message}` }), {
      status: 500,
    });
  }
}
