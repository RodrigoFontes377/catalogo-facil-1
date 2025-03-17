"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Share2, Sliders } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  catalog?: { name: string; description: string } | null;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        localStorage.removeItem("user");
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Catálogo Fácil</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Início
              </Link>
              <Link
                href="#contato"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-grow bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {user ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Bem-vindo, {user.name}!
              </h1>
              <p className="mt-2 text-xl text-muted-foreground">
                Seu email: {user.email}
              </p>

              {user.catalog ? (
                <div className="mt-12">
                  <h3 className="text-xl font-semibold">Seu catálogo:</h3>
                  <div className="mt-4 border p-4 rounded-lg shadow">
                    <p className="text-lg font-medium">{user.catalog.name}</p>
                    <p className="text-muted-foreground">
                      {user.catalog.description}
                    </p>
                    <div className="flex mt-4 space-x-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Editar
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  Criar Catálogo
                </button>
              )}
            </>
          ) : null}
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="ml-2 text-sm font-semibold">Catálogo Fácil</span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Twitter
              </Link>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © 2024 Catálogo Fácil. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
