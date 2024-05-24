import { AboutUs } from "@/components/aboutUs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="content-center mx-auto w-full">
      <Header />
      <AboutUs />
      <Footer />
    </div>
  );
}
