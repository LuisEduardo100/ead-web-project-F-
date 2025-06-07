import { Header } from "../components/Header";
import { useState } from "react";
import { login, register, type RegisterParams } from "../services/authService";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [formData, setFormData] = useState<RegisterParams>({
    firstName: "",
    lastName: "",
    phone: "",
    birth: "",
    email: "",
    password: "",
  });

  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.birth ||
      !formData.email ||
      !formData.password
    ) {
      showToast({
        message: "Por favor, preencha todos os campos.",
        type: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast({
        message: "Por favor, insira um e-mail válido.",
        type: "error",
      });
      return;
    }

    try {
      const registerResponse = await register(formData);

      if (registerResponse.status === 201) {
        showToast({
          message: "Cadastro realizado com sucesso!",
          type: "success",
        });

        try {
          const loginResponse = await login({
            email: formData.email,
            password: formData.password,
          });

          if (loginResponse.status === 200) {
            showToast({
              message: "Login bem-sucedido!",
              type: "success",
            });
            navigate("/home");
          }
        } catch {
          showToast({
            message: `Cadastro realizado, mas erro ao realizar login automático. Por favor, faça login manualmente.`,
            type: "error",
          });
          navigate("/");
        }
      }
    } catch {
      showToast({ message: "Erro ao realizar cadastro.", type: "error" });
    }
  }

  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      <section className="bg-gray-50 flex-grow py-6 flex items-center justify-center">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
              Criar sua conta
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-red focus:ring-main-red p-2" // Cores do foco e padding
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-red focus:ring-main-red p-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-red focus:ring-main-red p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="birth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data de Nascimento
                </label>
                <div className="relative mt-1">
                  <input
                    type="date"
                    id="birth"
                    name="birth"
                    value={formData.birth}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-red focus:ring-main-red p-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-red focus:ring-main-red p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-red focus:ring-main-red p-2"
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-6">
                <button
                  type="submit"
                  className="cursor-pointer bg-main-red text-white px-6 py-3 rounded-md hover:bg-main-red-hover focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2 w-full text-lg font-semibold transition-colors duration-200" // Cores, padding, fonte e transição
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
