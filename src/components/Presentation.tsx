import heroImage from "../assets/hero_presentation.jpg";

export function Presentation() {
  return (
    <div
      className="relative h-[400px] mb-10 bg-cover bg-center bg-no-repeat rounded-2xl fade-in-slide"
      style={{
        backgroundImage: `url(${heroImage})`,
        animationDelay: `300ms`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      <div className="max-w-[700px] relative z-10 flex flex-col justify-center h-full text-left pl-4 sm:pl-8 lg:pl-16 pr-4">
        <h1 className="text-main-red text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
          Aprenda direto da sua casa
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-200">
          Estude no seu ritmo com aulas de qualidade, acessíveis de qualquer
          lugar. Comece hoje mesmo sua jornada rumo ao conhecimento.
        </p>
      </div>
    </div>
  );
}
