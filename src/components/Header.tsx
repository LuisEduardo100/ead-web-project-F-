import { useState } from "react";
import { login } from "../services/authService";

export function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = {email, password}

  async function handleLogin() {
    try {
      const { status } = await login(params);

      if (status === 200) {
        window.location.href = "/login";
      }
      
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
    <header className="bg-white shadow-md py-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-2xl font-bold text-blue-600 text-center sm:text-left">EduTech</div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <input
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
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleRegisterRedirect}
          >
            Registrar
          </button>
        </div>
      </div>
    </header>
  );
}
