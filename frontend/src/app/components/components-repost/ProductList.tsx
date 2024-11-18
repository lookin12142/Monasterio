'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronDown, ChevronUp, Home, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  image: string
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Galletas con Chispas',
      price: 4.60,
      stock: 40,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Galletas de Avena',
      price: 4.60,
      stock: 40,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Galletas de Chocolate',
      price: 4.60,
      stock: 40,
      image: '/placeholder.svg'
    }
  ])

  const [stock, setStock] = useState(0)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)

  const handleAddProduct = () => {
    if (!productName || productPrice <= 0) return

    const newProduct: Product = {
      id: products.length + 1,
      name: productName,
      price: productPrice,
      stock: stock,
      image: '/placeholder.svg' // Puedes agregar lógica para cargar imágenes
    }
    setProducts([...products, newProduct])
    setProductName('')
    setProductPrice(0)
    setStock(0)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleEditProduct = (id: number) => {
    const product = products.find(product => product.id === id)
    if (product) {
      setProductName(product.name)
      setProductPrice(product.price)
      setStock(product.stock)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full">
      <header className="flex items-center gap-2 bg-red-500 p-4 text-white w-full">
        <Link href="#" className="text-white hover:text-white/90">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-medium">Repostería - Productos</h1>
        <Link href="#" className="text-white hover:text-white/90">
          <Home className="h-5 w-5" />
        </Link>
      </header>

      <main className="flex-grow w-full p-4">
        <div className="mb-8 rounded-lg bg-white p-4 shadow-sm w-full">
          <h2 className="mb-4 text-lg font-medium">Agregar un producto</h2>
          <div className="flex flex-wrap gap-4">
            <input
              placeholder="Nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Stock:</span>
              <div className="relative">
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-24 pr-8 p-2 border border-gray-300 rounded-md"
                />
                <div className="absolute right-1 top-1 flex flex-col">
                  <button
                    className="h-4 w-4 hover:bg-transparent"
                    onClick={() => setStock(s => s + 1)}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    className="h-4 w-4 hover:bg-transparent"
                    onClick={() => setStock(s => Math.max(0, s - 1))}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
            <input
              placeholder="Precio del producto"
              type="number"
              value={productPrice}
              step="0.10"
              onChange={(e) => setProductPrice(Number(e.target.value))}
              className="w-[150px] p-2 border border-gray-300 rounded-md"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md" onClick={handleAddProduct}>
              <Plus className="mr-1 h-4 w-4" />
              AGREGAR
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm w-full">
          <h2 className="mb-4 text-lg font-medium">Lista de Productos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="overflow-hidden bg-white shadow-md rounded-md">
                <div className="p-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Precio: S/. {product.price.toFixed(2)}</p>
                    <p>Stock: {product.stock} unidades</p>
                  </div>
                </div>
                <div className="flex gap-2 p-4 pt-0">
                  <button
                    className="flex-1 bg-red-500 text-white p-2 rounded-md"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="flex-1 border border-gray-300 p-2 rounded-md"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 p-4 text-center w-full">
        <p>&copy; 2024 Repostería | Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
