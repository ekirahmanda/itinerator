import { InputUser } from "@/components/inputUser";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <InputUser />
      </main>
      <Footer />
    </div>
  );
}
