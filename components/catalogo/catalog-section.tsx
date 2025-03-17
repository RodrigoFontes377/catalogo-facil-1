"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, ImagePlus, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface Catalog {
  id: string;
  name: string;
  imageUrl: string;
}

export function CatalogSection() {
  const router = useRouter();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCatalogId, setEditingCatalogId] = useState<string | null>(null);
  const [catalogName, setCatalogName] = useState("");
  const [catalogImage, setCatalogImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCatalogImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCreateCatalog = () => {
    if (!catalogName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome para o catálogo.",
        variant: "destructive",
      });
      return;
    }

    const newCatalog: Catalog = {
      id: Date.now().toString(),
      name: catalogName,
      imageUrl: previewUrl,
    };

    setCatalogs([...catalogs, newCatalog]);
    setShowCreateDialog(false);
    setCatalogName("");
    setCatalogImage(null);
    setPreviewUrl("");

    toast({
      title: "Catálogo criado",
      description: "Seu catálogo foi criado com sucesso!",
    });
  };

  const handleEditCatalog = () => {
    if (!editingCatalogId) return;

    const updatedCatalogs = catalogs.map((catalog) => {
      if (catalog.id === editingCatalogId) {
        return {
          ...catalog,
          name: catalogName || catalog.name,
          imageUrl: previewUrl || catalog.imageUrl,
        };
      }
      return catalog;
    });

    setCatalogs(updatedCatalogs);
    setShowEditDialog(false);
    setEditingCatalogId(null);
    setCatalogName("");
    setCatalogImage(null);
    setPreviewUrl("");

    toast({
      title: "Catálogo atualizado",
      description: "Seu catálogo foi atualizado com sucesso!",
    });
  };

  const handleDelete = (catalogId: string) => {
    try {
      setCatalogs(catalogs.filter((catalog) => catalog.id !== catalogId));

      toast({
        title: "Catálogo excluído",
        description: "Seu catálogo foi excluído com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o catálogo.",
        variant: "destructive",
      });
    }
  };

  const handleOpenEdit = (catalog: Catalog) => {
    setCatalogName(catalog.name);
    setPreviewUrl(catalog.imageUrl);
    setEditingCatalogId(catalog.id);
    setShowEditDialog(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Seus Catálogos</h2>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
          <Plus className="h-5 w-5" />
          Novo Catálogo
        </Button>
      </div>

      {catalogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            Você ainda não tem nenhum catálogo. Crie seu primeiro catálogo para
            começar.
          </p>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-5 w-5" />
            Criar Catálogo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {catalogs.map((catalog) => (
            <Card key={catalog.id} className="w-full">
              <CardContent className="p-2">
                <div className="flex items-start gap-2">
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {catalog.imageUrl ? (
                      <Image
                        src={catalog.imageUrl}
                        alt={catalog.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <ImagePlus className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold">{catalog.name}</h3>
                    <div className="flex gap-2 mt-6">
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleOpenEdit(catalog)}
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        className="gap-2"
                        onClick={() => handleDelete(catalog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>
                      <Button
                        className="gap-2"
                        onClick={() => router.push(`/catalogo/${catalog.id}`)}
                      >
                        Entrar no Catálogo
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar novo catálogo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do catálogo</Label>
              <Input
                id="name"
                value={catalogName}
                onChange={(e) => setCatalogName(e.target.value)}
                placeholder="Ex: Minha Loja"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Imagem do catálogo</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="max-w-[200px]"
                />
              </div>
            </div>
            <Button onClick={handleCreateCatalog} className="w-full">
              Criar Catálogo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar catálogo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome do catálogo</Label>
              <Input
                id="edit-name"
                value={catalogName}
                onChange={(e) => setCatalogName(e.target.value)}
                placeholder="Ex: Minha Loja"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Imagem do catálogo</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="max-w-[200px]"
                />
              </div>
            </div>
            <Button onClick={handleEditCatalog} className="w-full">
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
