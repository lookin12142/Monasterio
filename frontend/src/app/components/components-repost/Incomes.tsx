"use client";

import { useState } from "react";
import { ChevronLeft, Home, Plus, Trash } from "lucide-react";
import Link from "next/link";

interface Entry {
  id: number;
  product: string;
  quantity: number;
  date: string;
  total: number;
}

export default function Incomes() {
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, product: "Producto 1", quantity: 5, date: "2024-11-14", total: 100 },
    { id: 2, product: "Producto 2", quantity: 3, date: "2024-11-14", total: 60 },
    { id: 3, product: "Producto 3", quantity: 2, date: "2024-11-14", total: 40 },
  ]);

  const [newEntry, setNewEntry] = useState<Entry>({
    id: entries.length + 1,
    product: "",
    quantity: 0,
    date: new Date().toISOString().split("T")[0],
    total: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleAddEntry = () => {
    if (!newEntry.product || newEntry.quantity <= 0) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }
    setEntries([...entries, { ...newEntry, total: newEntry.quantity * 20 }]);
    setNewEntry({
      id: entries.length + 2,
      product: "",
      quantity: 0,
      date: newEntry.date,
      total: 0,
    });
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full flex items-center gap-4 bg-red-500 p-4 text-white">
        <button
          onClick={() => window.history.back()}
          className="text-white hover:text-white/90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-medium">
          Repostería - Ingresos
        </h1>
        <Link href="/dashboard" className="text-white hover:text-white/90">
          <Home className="h-5 w-5" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col p-4 bg-gray-50">
        {/* Form Section */}
        <div className="mb-8 bg-white rounded-lg shadow p-6 w-full">
          <h2 className="mb-4 text-lg font-bold text-red-500">Registrar un Ingreso</h2>
          <div className="flex flex-wrap gap-4">
            <select
              name="product"
              value={newEntry.product}
              onChange={handleInputChange}
              className="flex-1 min-w-[200px] border border-gray-300 rounded p-2"
            >
              <option value="">Seleccionar producto</option>
              <option value="Producto 1">Producto 1</option>
              <option value="Producto 2">Producto 2</option>
              <option value="Producto 3">Producto 3</option>
            </select>

            <input
              type="number"
              name="quantity"
              value={newEntry.quantity}
              onChange={handleInputChange}
              placeholder="Cantidad"
              className="w-24 border border-gray-300 rounded p-2"
            />

            <button
              onClick={handleAddEntry}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              AGREGAR
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <h2 className="mb-4 text-lg font-bold text-red-500">Lista de Ingresos</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border bg-red-500 text-white p-2">Producto</th>
                <th className="border bg-red-500 text-white p-2">Cantidad</th>
                <th className="border bg-red-500 text-white p-2">Fecha</th>
                <th className="border bg-red-500 text-white p-2">Precio Total</th>
                <th className="border bg-red-500 text-white p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="border p-2">{entry.product}</td>
                  <td className="border p-2">{entry.quantity}</td>
                  <td className="border p-2">{entry.date}</td>
                  <td className="border p-2">{entry.total}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-200 text-center p-4">
        <p>&copy; 2024 Repostería | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
