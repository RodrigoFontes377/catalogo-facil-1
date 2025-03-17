'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Plus, ImagePlus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function CatalogProductsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Form states
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
    setPreviewUrl('');
    setEditingProductId(null);
  };

  const handleAddProduct = () => {
    if (!productName.trim() || !productDescription.trim() || !productPrice.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      imageUrl: previewUrl,
    };

    setProducts([...products, newProduct]);
    setShowAddDialog(false);
    resetForm();

    toast({
      title: 'Produto adicionado',
      description: 'O produto foi adicionado com sucesso!',
    });
  };

  const handleEditProduct = () => {
    if (!editingProductId) return;

    const updatedProducts = products.map(product => {
      if (product.id === editingProductId) {
        return {
          ...product,
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          imageUrl: previewUrl || product.imageUrl,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setShowEditDialog(false);
    resetForm();

    toast({
      title: 'Produto atualizado',
      description: 'O produto foi atualizado com sucesso!',
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: 'Produto excluído',
      description: 'O produto foi excluído com sucesso.',
    });
  };

  const handleOpenEdit = (product: Product) => {
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price.toString());
    setPreviewUrl(product.imageUrl);
    setEditingProductId(product.id);
    setShowEditDialog(true);
  };

  const ProductForm = ({ onSubmit, submitText }: { onSubmit: () => void, submitText: string }) => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="product-name">Nome do produto</Label>
        <Input
          id="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Ex: Camiseta Básica"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="product-description">Descrição</Label>
        <Textarea
          id="product-description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Descreva seu produto..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="product-price">Preço</Label>
        <Input
          id="product-price"
          type="number"
          step="0.01"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="product-image">Imagem do produto</Label>
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
            id="product-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="max-w-[200px]"
          />
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full">
        {submitText}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Catálogo Fácil</span>
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Produto
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Você ainda não tem nenhum produto cadastrado. Adicione seu primeiro produto para começar.
            </p>
            <Button size="lg" className="gap-2" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-5 w-5" />
              Adicionar Produto
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="relative w-full h-48 bg-muted">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  <p className="text-lg font-semibold mt-2">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.price)}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleOpenEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo produto</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} submitText="Adicionar Produto" />
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar produto</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={handleEditProduct} submitText="Salvar Alterações" />
        </DialogContent>
      </Dialog>
    </div>
  );
}