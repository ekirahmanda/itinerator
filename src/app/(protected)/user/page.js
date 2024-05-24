import { UserProfile } from "@/components/userProfile";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <UserProfile />
      <Footer />
    </div>
  );
}
