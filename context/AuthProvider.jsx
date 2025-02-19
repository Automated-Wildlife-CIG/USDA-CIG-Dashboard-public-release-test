"use client";

/* Create AuthProvider and import and use within layout.jsx. This allows for
light/dark mode client side session to be used client side. layout.js should always
be server side code. More details:
https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
*/

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
