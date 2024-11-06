"use client";

import Header from "../components/ui/Header";
import DepartmentSection from "../components/ui/DepartmentSection";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="p-8 bg-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-center">¡BIENVENIDO RICARDO!</h2>

        <DepartmentSection title="Departamento Administrativo" items={[
          { name: "Usuarios", icon: "usuarioicon1.png" }
        ]} />

        <DepartmentSection title="Departamento de Ventas" items={[
          { name: "Repostería", icon: "pasteleria.png" },
          { name: "Manualidades", icon: "manualidades.png" },
          { name: "Misa", icon: "misa.png" },
        ]} />

        <DepartmentSection title="Departamento de Alquileres" items={[
          { name: "Santa Catalina", icon: "misa.png" },
          { name: "Goyeneche", icon: "misa.png" },
          { name: "Santa Marta", icon: "misa.png" },
        ]} />
      </main>
    </div>
  );
}