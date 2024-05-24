import { EditProfile } from "@/components/editProfile";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <EditProfile />
      <Footer />
    </div>
  );
}
