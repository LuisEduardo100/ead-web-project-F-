import { Header } from "../components/Header";
import { Presentation } from "../components/Presentation";
import { SlideSection } from "../components/SlideSection";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gray-50 flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <Presentation />
          <SlideSection />
        </div>
      </section>
    </div>
  );
}
