import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Presentation } from "../components/Presentation";
import { SlideSection } from "../components/SlideSection";
import { useEffect } from "react";

export function Home() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const authenticate = async () => {
      if (token) {
        navigate("/");
      }
    };
    authenticate();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gray-50 flex-grow py-6">
        <div className="max-w-6xl mx-auto px-3">
          <Presentation />
          <SlideSection />
        </div>
      </section>
    </div>
  );
}
