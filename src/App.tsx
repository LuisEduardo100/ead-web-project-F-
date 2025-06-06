import { Route, Routes } from "react-router-dom";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import { Home } from "./pages/Home";
import { HomeAuth } from "./pages/HomeAuth";
import { Register } from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<HomeAuth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
