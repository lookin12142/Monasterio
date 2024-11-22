'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  image: string // La imagen será una cadena en base64
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Galletas con Chispas',
      price: 4.6,
      stock: 40,
      image: '/galleta.png',
    },
    {
      id: 2,
      name: 'Galletas de Avena',
      price: 4.6,
      stock: 40,
      image: '/chispas.jpg',
    },
    {
      id: 3,
      name: 'Galletas de Chocolate',
      price: 4.6,
      stock: 40,
      image: '/fondo-login.png',
    },
  ])

  const [stock, setStock] = useState<number | null>(null)
  const [productName, setProductName] = useState<string | null>(null)
  const [productPrice, setProductPrice] = useState<number | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setImageFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file) // Convertir imagen a base64
    }
  }

  const handleAddOrUpdateProduct = () => {
    if (editingProductId !== null) {
      // Actualizar producto existente
      setProducts(products.map(product =>
        product.id === editingProductId
          ? {
              ...product,
              name: productName || product.name, // Mantener valores existentes si no se cambian
              price: productPrice !== null ? productPrice : product.price,
              stock: stock !== null ? stock : product.stock,
              image: previewImage || product.image,
            }
          : product
      ))
      setEditingProductId(null)
    } else {
      // Validar campos necesarios para un nuevo producto
      if (!productName || productPrice === null || stock === null || !imageFile) return

      // Agregar nuevo producto
      const newProduct: Product = {
        id: products.length + 1,
        name: productName,
        price: productPrice,
        stock: stock,
        image: previewImage || '/placeholder.svg',
      }
      setProducts([...products, newProduct])
    }

    resetForm()
    setIsModalOpen(false)
  }

  const handleEditProduct = (id: number) => {
    const product = products.find((product) => product.id === id)
    if (product) {
      setProductName(product.name)
      setProductPrice(product.price)
      setStock(product.stock)
      setPreviewImage(product.image)
      setEditingProductId(product.id)
      setIsModalOpen(true)
    }
  }

  const resetForm = () => {
    setProductName(null)
    setProductPrice(null)
    setStock(null)
    setImageFile(null)
    setPreviewImage(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full">
      <main className="flex-grow w-full p-4">
        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" />
            AGREGAR PRODUCTO
          </button>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm w-full">
          <h2 className="mb-4 text-lg font-medium">Lista de Productos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden bg-white shadow-md rounded-md w-[350px] h-[450px]"
              >
                <div className="p-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{product.name}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Precio: S/. {product.price.toFixed(2)}</p>
                    <p>Stock: {product.stock} unidades</p>
                  </div>
                </div>
                <div className="flex gap-2 p-4 pt-0">
                  <button
                    className="flex-1 bg-red-500 text-white p-2 rounded-md"
                    onClick={() => setProducts(products.filter((p) => p.id !== product.id))}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingProductId ? 'Editar Producto' : 'Agregar Producto'}</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              placeholder="Nombre del producto"
              value={productName || ''}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="number"
              placeholder="Precio del producto"
              value={productPrice !== null ? productPrice : ''}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock !== null ? stock : ''}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {previewImage && (
              <div className="mb-4">
                <Image
                  src={previewImage}
                  alt="Vista previa"
                  width={200}
                  height={200}
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <button
              onClick={handleAddOrUpdateProduct}
              className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
            >
              {editingProductId ? 'ACTUALIZAR' : 'AGREGAR'}
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-200 p-4 text-center w-full">
        <p>&copy; 2024 Repostería | Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
