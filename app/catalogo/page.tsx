'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { RegistrationModal } from '@/components/auth/registration-modal';
import { CatalogSection } from '@/components/catalogo/catalog-section';

export default function CatalogoPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Catálogo Fácil</span>
            </div>
            {userName && (
              <p className="text-muted-foreground">
                Bem-vindo, <span className="font-medium text-foreground">{userName}</span>
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CatalogSection />
      </main>

      {showRegistration && (
        <RegistrationModal
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
          onComplete={(name) => {
            setUserName(name);
            setShowRegistration(false);
          }}
        />
      )}
    </div>
  );
}