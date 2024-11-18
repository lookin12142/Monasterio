"use client";

import { useState } from "react";
import { BanknoteIcon, Coins, ShoppingBag, ChevronLeft, Home } from "lucide-react"; 
import Link from "next/link";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import ProductList from "./ProductList";

export default function OpcionesReposteria() {
  const [activeSection, setActiveSection] = useState<'incomes' | 'expenses' | 'products' | null>(null);

  // Define el título dinámico del encabezado
  const getHeaderTitle = () => {
    switch (activeSection) {
      case "incomes":
        return "Repostería - Ingresos";
      case "expenses":
        return "Repostería - Egresos";
      case "products":
        return "Repostería - Productos";
      default:
        return "Ventas - Repostería";
    }
  };

  // Handlers para cambiar de sección
  const handleIngresosClick = () => setActiveSection("incomes");
  const handleEgresosClick = () => setActiveSection("expenses");
  const handleProductosClick = () => setActiveSection("products");

  // Handler para regresar al menú principal
  const handleBackToMenu = () => setActiveSection(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dinámico */}
      <header className="flex items-center gap-2 bg-red-500 p-4 text-white">
        {/* Botón de retroceso */}
        {activeSection ? (
          <button onClick={handleBackToMenu} className="text-white hover:text-white/90">
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link href="#" className="text-white hover:text-white/90">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
        <h1 className="flex-1 text-center text-lg font-medium">{getHeaderTitle()}</h1>
        <Link href="/dashboard" className="text-white hover:text-white/90">
          <Home className="h-5 w-5" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl p-4">
        <h2 className="mb-8 text-center text-2xl font-bold">Opciones</h2>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {!activeSection && (
            <>
              <div onClick={handleIngresosClick} className="block">
                <div className="transition-transform hover:scale-105 bg-white p-8 rounded-lg shadow-lg text-center h-64 flex flex-col justify-center">
                  <div className="mb-4 rounded-full bg-red-500/10 p-4">
                    <BanknoteIcon className="h-12 w-12 text-red-500" />
                  </div>
                  <span className="text-xl font-medium text-red-500">Ingresos</span>
                </div>
              </div>

              <div onClick={handleEgresosClick} className="block">
                <div className="transition-transform hover:scale-105 bg-white p-8 rounded-lg shadow-lg text-center h-64 flex flex-col justify-center">
                  <div className="mb-4 rounded-full bg-red-500/10 p-4">
                    <Coins className="h-12 w-12 text-red-500" />
                  </div>
                  <span className="text-xl font-medium text-red-500">Egresos</span>
                </div>
              </div>

              <div onClick={handleProductosClick} className="block">
                <div className="transition-transform hover:scale-105 bg-white p-8 rounded-lg shadow-lg text-center h-64 flex flex-col justify-center">
                  <div className="mb-4 rounded-full bg-red-500/10 p-4">
                    <ShoppingBag className="h-12 w-12 text-red-500" />
                  </div>
                  <span className="text-xl font-medium text-red-500">Productos</span>
                </div>
              </div>
            </>
          )}

          {activeSection === "incomes" && (
            <div className="w-full">
              <Incomes />
            </div>
          )}
          {activeSection === "expenses" && (
            <div className="w-full">
              <Expenses />
            </div>
          )}
          {activeSection === "products" && (
            <div className="w-full">
              <ProductList />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
