import { nunito_sans, poppins } from "@/utils/fonts";

import "@/styles/globals.css";

export const metadata = {
  title: "Itinerator.ai",
  description: "Generate your personalized travel itineraries using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito_sans} ${poppins}`}>{children}</body>
    </html>
  );
}
