'use client'

import { ArrowRight, BookOpen, Share2, Sliders } from "lucide-react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { useAuth } from '@/context/auth-context'

export default function Home() {
  const router = useRouter()
  const { toast } = useToast()
  const { setUser, setAccessToken } = useAuth()

  const handleLogin = () => {
    // @ts-ignore
    window.google.accounts.oauth2.initCodeClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: 'openid profile email',
      ux_mode: 'popup',
      callback: async (response: { code: string }) => {
        try {
          const res = await fetch('http://localhost:8080/oauth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: response.code }),
          })

          const data = await res.json()

          if (res.ok) {
            // Verifique e extraia os dados de resposta do backend (nome, email, accessToken)
            setUser({
              name: data.name, // Nome do usuário
              email: data.email, // Email do usuário
            })
            setAccessToken(data.accessToken) // Salva o token de acesso
            router.push('/home') // Redireciona para a página principal após o login
          } else {
            throw new Error(data.error || 'Erro ao autenticar')
          }
        } catch (error) {
          toast({
            title: 'Erro',
            description: 'Ocorreu um erro ao tentar fazer login com o Google.',
            variant: 'destructive',
          })
        }
      },
    }).requestCode()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Catálogo Fácil</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#beneficios"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Benefícios
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

      <section className="flex-grow bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Seu Catálogo Online em Minutos
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              A maneira mais fácil de criar e gerenciar seu catálogo online.
              Compartilhe seus produtos com clientes de forma profissional e
              eficiente.
            </p>
            <div className="mt-10">
              <Button size="lg" className="gap-2" onClick={handleLogin}>
                Acessar com Google
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Por que escolher o Catálogo Fácil?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Criação rápida de catálogos",
                description:
                  "Monte seu catálogo em poucos minutos com nossa interface intuitiva e fácil de usar.",
              },
              {
                icon: Sliders,
                title: "Gerenciamento simples",
                description:
                  "Atualize produtos, preços e informações com facilidade através do nosso painel administrativo.",
              },
              {
                icon: Share2,
                title: "Compartilhamento facilitado",
                description:
                  "Compartilhe seu catálogo através de um link ou QR Code com seus clientes.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-lg"
              >
                <benefit.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
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
  )
}
