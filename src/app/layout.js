import { Nunito } from "next/font/google";
import "@/styles/globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata = {
  title: "Itinerator.ai",
  description: "Generate your personalized travel itineraries using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
