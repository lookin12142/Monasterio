"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/imagenes/monasterio.jpg')" }}
    >
      {/* Capa de transparencia */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Contenido principal */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        {/* Sección de formulario */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            {/* Icono del monasterio */}
            <Image
              src="/imagenes/logomonasterio.png"
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
            INICIAR SESIÓN
          </h2>

          <form onSubmit={onSubmit}>
            {error && (
              <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
                {error}
              </p>
            )}

            <label
              htmlFor="email"
              className="text-gray-700 mb-2 block text-sm font-semibold"
            >
              Usuario:
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Correo es requerido",
              })}
              className="p-3 rounded border border-gray-300 block mb-2 w-full"
              placeholder="usuario@ejemplo.com"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}

            <label
              htmlFor="password"
              className="text-gray-700 mb-2 block text-sm font-semibold"
            >
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Contraseña es requerida",
              })}
              className="p-3 rounded border border-gray-300 block mb-2 w-full"
              placeholder="******"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}

            <button className="w-full bg-red-600 text-white p-3 rounded-lg mt-4 font-bold">
              Iniciar Sesión
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500">
            ¿Olvidaste tu contraseña?
          </p>
        </div>

        {/* Sección de contacto */}
        <div className="hidden md:block absolute right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-lg p-6 w-64 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            Contactar al Administrador
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              <span className="font-bold">Teléfono:</span> **********
            </li>
            <li>
              <span className="font-bold">Email:</span> **********
            </li>
            <li>
              <span className="font-bold">Dirección:</span> **********
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
