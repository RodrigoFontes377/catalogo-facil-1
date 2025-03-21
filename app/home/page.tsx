'use client'

import Image from 'next/image';
import { CatalogSection } from '@/components/catalogo/catalog-section'
import { useAuth } from '@/context/auth-context'
import logoCatalogo from '@/assets/img/logoCatalogo.png'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
            <Image
                src={logoCatalogo}
                alt="Descrição da imagem"
                width={50} 
                height={50} 
                objectFit="contain"
              />
              <span className="ml-2 text-xl font-semibold">Catálogo Fácil</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mensagem de boas-vindas */}
      {user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Bem-vindo, {user.name}!</h2>
          <p className="text-muted-foreground">Gerencie seus catálogos de forma fácil e eficiente.</p>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CatalogSection />
      </main>
    </div>
  )
}
