import { Header } from "../../../components/Header";

export function QuimicaOrganica() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Química Orgânica</h1>
        <p className="mb-6">
          Entenda os compostos orgânicos, cadeias carbônicas e as principais reações da química orgânica.
        </p>
        <h2 className="text-xl font-semibold mb-2">Conteúdo do curso:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Cadeias carbônicas</li>
          <li>Funções orgânicas</li>
          <li>Reações químicas</li>
          <li>Isomeria</li>
        </ul>
      </main>
    </>
  );
}
