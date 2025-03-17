'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Catalog {
  id: string;
  name: string;
  description: string | null;
}

export function CatalogSection() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!catalog) return;

    try {
      // Implement your delete logic here
      setCatalog(null);
      
      toast({
        title: 'Catálogo excluído',
        description: 'Seu catálogo foi excluído com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao excluir o catálogo.',
        variant: 'destructive',
      });
    }
  };

  if (!catalog) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Crie seu primeiro catálogo</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Comece a mostrar seus produtos de forma profissional com um catálogo personalizado.
        </p>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Criar Catálogo
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu catálogo</CardTitle>
        <CardDescription>Gerencie seu catálogo de produtos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{catalog.name}</h3>
            <p className="text-sm text-muted-foreground">{catalog.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}