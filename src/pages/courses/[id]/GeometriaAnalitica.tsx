import { Header } from "../../../components/Header";

export function GeometriaAnalitica() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Geometria Analítica</h1>
        <p className="mb-6">
          Estude retas, planos, distâncias, vetores e tudo que envolve o plano cartesiano com este curso completo.
        </p>
        <h2 className="text-xl font-semibold mb-2">Tópicos abordados:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Plano cartesiano</li>
          <li>Equação da reta</li>
          <li>Distância entre pontos</li>
          <li>Vetores e ângulos</li>
        </ul>
      </main>
    </>
  );
}
