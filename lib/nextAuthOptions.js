import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "@/models/dbConfig.js";
import validator from "email-validator";

export const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        let serverValidationErrors = {};

        //validation checks
        if (!email || !password) {
          serverValidationErrors.global = {
            type: 400,
            field: "none",
            message: "All fields are required",
          };

          let serverValidationErrorsStringified = JSON.stringify(
            serverValidationErrors,
          );

          //if all fields empty, return error, this exits the function
          return { error: serverValidationErrorsStringified };
        }

        if (!validator.validate(email)) {
          serverValidationErrors.email = {
            type: 400,
            field: "email",
            message: "Email provided is not valid",
          };
        }

        //check if user exists in db, if yes validate password

        try {
          const queryUser = {
            text: `SELECT * FROM user_profile
                     WHERE user_name_email = $1`,
            values: [email],
          };
          // query db checking for user email and password 'pass'
          const res = await pool.query(queryUser);

          //if no user found
          if (res?.rows?.length === 0) {
            serverValidationErrors.email = {
              type: "server",
              field: "email",
              message: "User not found.",
            };

            // return new NextResponse(serverValidationErrors, { status: 403 });
          } else {
            //user found, check password
            const userEmail = res?.rows[0]?.user_name_email;

            const userHashedPass = res?.rows[0]?.pass;

            const user = {
              id: res?.rows[0].id,
              firstName: res?.rows[0].first_name,
              lastName: res?.rows[0].last_name,
              email: res?.rows[0].user_name_email,
              admin: res?.rows[0].admin,
            };

            if (userEmail) {
              const isPasswordCorrect = await bcrypt.compare(
                password,
                userHashedPass,
              );

              if (isPasswordCorrect) {
                return user;
              } else {
                serverValidationErrors.password = {
                  type: "server",
                  field: "password",
                  message: "Password provided is incorrect.",
                };
              }
            }
          }
        } catch (error) {
          console.log("error in queryUser", error);
        }

        if (Object.keys(serverValidationErrors).length > 0) {
          let serverValidationErrorsStringified = JSON.stringify(
            serverValidationErrors,
          );
          return { error: serverValidationErrorsStringified };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // Two hours in seconds
  },

  jwt: {
    signingKey: process.env.JWT_SECRET,
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.error) {
        throw new Error(user.error);
      } else {
        return true;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, isNewUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
