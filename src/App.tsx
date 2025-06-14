import { Route, Routes } from "react-router-dom";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import { Home } from "./pages/Home";
import { HomeAuth } from "./pages/HomeAuth";
import { Register } from "./pages/Register";
import Profile from "./pages/Profile";
import EpisodePage from "./pages/Episode";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<HomeAuth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/episodes/:id" element={<EpisodePage />} />
    </Routes>
  );
}

export default App;
