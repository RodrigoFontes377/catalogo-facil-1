"use client";

import { useState, useEffect } from "react";
import { BookOpen, Edit, Trash, PlusCircle } from "lucide-react";

interface User {
  name: string;
  phone: string;
  email: string;
  catalog?: Catalog | null;
}

interface Catalog {
  name: string;
  description: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [catalog, setCatalog] = useState<Catalog | null>(null);

  useEffect(() => {
    // Simulação de recuperação do usuário autenticado (substituir por API real)
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setCatalog(parsedUser.catalog || null);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleRegister = () => {
    if (!name || !phone) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const newUser: User = {
      name,
      phone,
      email: "email@exemplo.com",
      catalog: null,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Catálogo Fácil</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-grow bg-muted flex justify-center items-center">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
          {user ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold">Bem-vindo, {user.name}!</h2>
              <p className="mt-2 text-muted-foreground">{user.email}</p>

              {catalog ? (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold">Seu catálogo:</h3>
                  <div className="mt-4 border p-4 rounded-lg shadow">
                    <p className="text-lg font-medium">{catalog.name}</p>
                    <p className="text-muted-foreground">
                      {catalog.description}
                    </p>
                    <div className="flex mt-4 space-x-4">
                      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        <Edit className="w-5 h-5 mr-2" /> Editar
                      </button>
                      <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        <Trash className="w-5 h-5 mr-2" /> Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    <PlusCircle className="w-6 h-6 mr-2" /> Criar Catálogo
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </main>

      {/* Modal de Registro */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-center">
              Termine seu Registro
            </h2>
            <div className="mt-4">
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded bg-gray-100"
                value="email@exemplo.com"
                disabled
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Telefone</label>
              <input
                type="tel"
                className="w-full mt-1 p-2 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button
              onClick={handleRegister}
              className="mt-6 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
