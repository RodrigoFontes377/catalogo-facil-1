'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
function decodeJWT(token: string): { sub: string } {
  const payload = token.split('.')[1]
  const decoded = atob(payload)
  return JSON.parse(decoded)
}

type Catalog = {
  id: string
  name?: string
  imageUrl?: string
}

export function CatalogSection() {
  const { accessToken } = useAuth()
  const [catalogs, setCatalogs] = useState<Catalog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCatalogs = async () => {
      if (!accessToken) return

      const { sub: userId } = decodeJWT(accessToken)

      try {
        const res = await fetch(`http://localhost:8080/catalogs/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (res.ok) {
          const data = await res.json()
          setCatalogs(data)
        } else {
          console.error('Erro ao buscar catálogos')
        }
      } catch (error) {
        console.error('Erro de rede:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCatalogs()
  }, [accessToken])

  if (loading) return <p className="text-center mt-8">Carregando catálogo...</p>

  return (
    <section className="mt-12">
      {catalogs.length === 0 ? (
        <div className="text-center">
          <Link
            href="/catalog/create"
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
          >
            Criar Catálogo
          </Link>
        </div>
      ) : (
        <div className="flex justify-center">
          {catalogs.map((catalog) => (
            <Link
              key={catalog.id}
              href={`/catalog/${catalog.id}`}
              className="block p-4 max-w-sm w-full rounded-xl border shadow hover:shadow-md transition"
            >
              {catalog.imageUrl ? (
                <img
                  src={catalog.imageUrl}
                  alt={catalog.name || 'Imagem do catálogo'}
                  className="rounded mb-4 w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
                  Sem imagem
                </div>
              )}
              <h3 className="text-xl font-semibold text-center">
                {catalog.name || 'Catálogo'}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}