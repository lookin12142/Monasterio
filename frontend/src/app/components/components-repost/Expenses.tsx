'use client'

import { useState } from 'react'
import { ChevronLeft, Home, Pencil, Plus, Search, Trash } from 'lucide-react'
import Link from 'next/link'

interface Expense {
  id: number
  product: string
  quantity: number
  provider: string
  date: string
  total: number
}

export default function Egresses() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, product: 'Harina', quantity: 50, provider: 'Proveedor A', date: '2024-11-14', total: 250 },
    { id: 2, product: 'Azúcar', quantity: 25, provider: 'Proveedor B', date: '2024-11-14', total: 125 },
    { id: 3, product: 'Huevos', quantity: 100, provider: 'Proveedor C', date: '2024-11-14', total: 200 },
    { id: 4, product: 'Leche', quantity: 30, provider: 'Proveedor A', date: '2024-11-14', total: 150 },
    { id: 5, product: 'Mantequilla', quantity: 20, provider: 'Proveedor B', date: '2024-11-14', total: 180 },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center gap-2 bg-red-500 p-4 text-white">
        <button className="text-white hover:text-white/90">
          <Link href="#">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </button>
        <h1 className="flex-1 text-center text-lg font-medium">Repostería - Egresos</h1>
        <button className="text-white hover:text-white/90">
          <Link href="#">
            <Home className="h-5 w-5" />
          </Link>
        </button>
      </header>

      <main className="w-full p-4">
        <div className="mx-auto max-w-screen-xl p-4 mb-8 rounded-lg bg-white shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Registrar y gestionar egresos</h2>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              <h3 className="mb-2 text-sm font-medium">Buscar Egresos</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[300px] p-2 border border-gray-300 rounded"
                />
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  <Search className="h-4 w-4" />
                  BUSCAR
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <h3 className="mb-2 text-sm font-medium">Gestionar Egresos</h3>
              <div className="flex gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  <Plus className="mr-1 h-4 w-4" />
                  AGREGAR
                </button>
                <button className="border border-red-500 text-red-500 px-4 py-2 rounded">
                  <Pencil className="mr-1 h-4 w-4" />
                  EDITAR
                </button>
                <button className="border border-red-500 text-red-500 px-4 py-2 rounded">
                  <Trash className="mr-1 h-4 w-4" />
                  ELIMINAR
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Lista de Egresos</h2>
          
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="bg-red-500 text-white p-2">Producto</th>
                <th className="bg-red-500 text-white p-2">Cantidad</th>
                <th className="bg-red-500 text-white p-2">Proveedor</th>
                <th className="bg-red-500 text-white p-2">Fecha</th>
                <th className="bg-red-500 text-white p-2">Total de Compra</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="p-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-2">{expense.product}</td>
                  <td className="p-2">{expense.quantity}</td>
                  <td className="p-2">{expense.provider}</td>
                  <td className="p-2">{expense.date}</td>
                  <td className="p-2">${expense.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
