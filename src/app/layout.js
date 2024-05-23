import { nunito_sans, poppins } from "@/utils/fonts";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

export const metadata = {
  title: "Itinerator.ai",
  description: "Generate your personalized travel itineraries using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${nunito_sans} ${poppins}`}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: { background: "rgb: 51 65 85", color: "#000" },
          }}
        />
        {children}
      </body>
    </html>
  );
}
