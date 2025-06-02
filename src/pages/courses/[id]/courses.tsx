import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeAuth } from '../../HomeAuth';


function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6">
      <h1 className="text-xl font-bold">Plataforma de Cursos</h1>
    </header>
  );
}

function MatematicaBasica() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Matemática Básica</h1>
        <img src="https://via.placeholder.com/600x300?text=Matemática+Básica" alt="Matemática Básica" className="mb-4" />
        <p>Curso introdutório com os conceitos básicos de matemática. Ideal para quem está começando.</p>
      </main>
    </>
  );
}

function GeometriaAnalitica() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Geometria Analítica</h1>
        <img src="https://via.placeholder.com/600x300?text=Geometria+Analítica" alt="Geometria Analítica" className="mb-4" />
        <p>Entenda os fundamentos da geometria analítica com foco em vetores, retas e planos.</p>
      </main>
    </>
  );
}

function QuimicaOrganica() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Química Orgânica</h1>
        <img src="https://via.placeholder.com/600x300?text=Química+Orgânica" alt="Química Orgânica" className="mb-4" />
        <p>Explore as reações orgânicas, estruturas moleculares e aplicações práticas da química.</p>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeAuth />} />
        <Route path="/courses/1" element={<MatematicaBasica />} />
        <Route path="/courses/2" element={<GeometriaAnalitica />} />
        <Route path="/courses/4" element={<QuimicaOrganica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
