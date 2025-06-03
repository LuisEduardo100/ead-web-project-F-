import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Button from "./common/Button";

export function Header() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = { email, password };
  const currentPath = window.location.pathname;

  async function handleLogin() {
    try {
      const { status } = await login(params);

      if (status === 200) {
        if (currentPath === "/") {
          navigate("/home");
        } else {
          navigate(window.location.pathname);
        }
      }

      alert("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Email ou senha inválidos");
    }
  }

  function handleRegisterRedirect() {
    navigate("/register");
  }

  return (
    <header className="max-w-6xl py-3 px-3 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mx-auto gap-3">
      <div className="text-2xl font-bold text-main-red text-center sm:text-left">
        <Link to="/home">Reforço Nota Dez</Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded px-2 py-1 w-full sm:w-auto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded px-2 py-1 w-full sm:w-auto"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleLogin}>Entrar</Button>
          <Button onClick={handleRegisterRedirect}>Registrar</Button>
        </div>
      </div>
    </header>
  );
}
