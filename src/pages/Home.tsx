import { useEffect } from "react";
import { Header } from "../components/Header";
import { Presentation } from "../components/Presentation";
import { SlideSection } from "../components/SlideSection";
import { useNavigate } from "react-router-dom";

export function Home() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      if (token) {
        navigate("/home");
      }
    };
    authenticate();
  }, [navigate, token]);

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
