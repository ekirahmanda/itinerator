import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function Layout({ children }) {
  const cookieStore = cookies();

  // Check if there is token in cookies
  const token = cookieStore.get("token");
  if (!token?.value) {
    redirect("/login"); // Login page
  }
  // Check if token is valid
  try {
    await jwt.verify(token.value, process.env.JWT_SECRET);
    return <>{children}</>;
  } catch (error) {
    redirect("/login"); // Login Page
  }

  return <>{children}</>;
}
