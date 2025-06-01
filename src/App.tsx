import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { HomeAuth } from "./pages/HomeAuth";
import CourseDetailsPage from "./pages/CourseDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<HomeAuth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
    </Routes>
  );
}

export default App;
