import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { HomeAuth } from "./pages/HomeAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<HomeAuth />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
