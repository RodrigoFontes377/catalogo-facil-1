'use client';

import { useState } from 'react';
import { RegistrationModal } from '@/components/auth/registration-modal';
import { CatalogSection } from '@/components/dashboard/catalog-section';

export default function DashboardPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
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