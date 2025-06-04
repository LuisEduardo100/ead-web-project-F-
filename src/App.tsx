import { Route, Routes } from "react-router-dom";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import { Home } from "./pages/Home";
import { HomeAuth } from "./pages/HomeAuth";
import { Register } from "./pages/Register";

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
