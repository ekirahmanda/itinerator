import Header from "@/components/header";
import LandingPage from "@/components/landingPage";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className=" content-center mx-auto w-full">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
