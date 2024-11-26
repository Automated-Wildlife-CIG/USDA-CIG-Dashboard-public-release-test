import "./globals.css";
import { poppins, inter, montserrat, raleway } from "@/lib/fonts";
// import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeProvider";
import AuthProvider from "@/context/AuthProvider";
import DashboardContextProvider from "@/context/DashboardContext";
import Header from "@/components/Header";
import { ToolTipProvider } from "@/context/ToolTipProvider";
import { FaEnvelope } from "react-icons/fa";

export const metadata = {
  title: "Field-Data-Services",
  description:
    "Introducing a new way of collecting wildlife data for better research.",
  keywords:
    "FDT, FDS, Water, Images, Sensory Data, Data, Birds, Sound, Field Data Services, Field Data Tech",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${poppins.variable} ${raleway.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col justify-between">
        <AuthProvider>
          <DashboardContextProvider>
            <ThemeProvider
              attribute="class"
              disableTransitionOnChange
              defaultTheme="dark"
              enableSystem={false}
            >
              <ToolTipProvider>
                <Header />

                <main className="container">{children}</main>

                <div className="container">
                  <div className="flex justify-between p-2">
                    <p className="text-left">
                      ©2024 Field Data Technologies. All right reserved
                    </p>
                    <p className="flex items-center space-x-1 text-right">
                      <FaEnvelope color="white" className="mr-2" />
                      <span>pm@fielddata.tech</span>
                    </p>
                  </div>
                </div>
              </ToolTipProvider>
            </ThemeProvider>
          </DashboardContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
