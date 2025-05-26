import { useState } from "react";
import { api } from "../api/axios"; // Supondo que já tenha configurado

export function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Email ou senha inválidos");
    }
  }

  function handleRegisterRedirect() {
    window.location.href = "/register";
  }

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">EduTech</div>
      <div className="flex items-center gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border rounded px-2 py-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Entrar
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={handleRegisterRedirect}
        >
          Registrar
        </button>
      </div>
    </header>
  );
}
