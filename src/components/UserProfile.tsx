import { useEffect, useState } from "react";
import type { UpdateUser, UpdateUserPassword, User } from "../types/User";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  getCurrentUser,
  updatePassword,
  updateUser,
} from "../services/userService";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    reset: resetUserForm,
  } = useForm<UpdateUser>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
  } = useForm<UpdateUserPassword>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        resetUserForm({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          email: userData.email,
          birth: new Date(userData.birth).toISOString().split("T")[0],
        });
      } catch {
        setErrorMessage("Não foi possível carregar os dados do perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [resetUserForm]);

  const onUserUpdate: SubmitHandler<UpdateUser> = async (data) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");
      await updateUser(data);
      setSuccessMessage("Dados atualizados com sucesso!");
    } catch {
      setErrorMessage("Erro ao atualizar os dados. Tente novamente.");
    }
  };

  const onPasswordUpdate: SubmitHandler<UpdateUserPassword> = async (data) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");
      await updatePassword(data);
      setSuccessMessage("Senha alterada com sucesso!");
      resetPasswordForm();
    } catch {
      setErrorMessage("Erro ao alterar a senha. Verifique sua senha atual.");
    }
  };

  if (isLoading) {
    return <p className="text-center text-white mt-8">Carregando perfil...</p>;
  }

  if (errorMessage && !user) {
    return <p className="text-center text-red-500 mt-8">{errorMessage}</p>;
  }

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-8 max-w-4xl bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-main-red text-3xl font-bold">Meu Perfil</h1>
        <Link
          to="/home"
          className="bg-main-red 0 hover:bg-main-red-hover text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Voltar
        </Link>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmitUser(onUserUpdate)}
        className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-5">
          Dados Pessoais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Nome</label>
            <input
              {...registerUser("firstName")}
              className="w-full bg-white text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-red focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Sobrenome
            </label>
            <input
              {...registerUser("lastName")}
              className="w-full bg-white text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-red focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              E-mail
            </label>
            <input
              type="email"
              {...registerUser("email")}
              className="w-full bg-white text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-red focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Telefone
            </label>
            <input
              {...registerUser("phone")}
              className="w-full bg-white text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-red focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Data de Nascimento
            </label>
            <input
              type="date"
              {...registerUser("birth")}
              className="w-full bg-white text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-red focus:border-transparent"
            />
          </div>
        </div>
        <button
          type="submit"
          className="cursor-pointer mt-6 w-full md:w-auto bg-main-red hover:bg-main-red-hover text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Salvar Alterações
        </button>
      </form>
      <form
        onSubmit={handleSubmitPassword(onPasswordUpdate)}
        className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-5">
          Alterar Senha
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Senha Atual
            </label>
            <input
              type="password"
              {...registerPassword("currentPassword")}
              className="w-full bg-white text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-red focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Nova Senha
            </label>
            <input
              type="password"
              {...registerPassword("newPassword")}
              className="w-full bg-white text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-red focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          type="submit"
          className="cursor-pointer mt-6 w-full md:w-auto bg-main-red hover:bg-main-red-hover text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Alterar Senha
        </button>
      </form>
    </div>
  );
}
