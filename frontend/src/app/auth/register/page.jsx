"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const result = await res.json();
      setError(result.error || "Error en el registro");
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
      <div className="relative z-10 h-full flex justify-center items-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
            Registrar
          </h2>

          {error && (
            <p className="bg-red-500 text-white text-center p-3 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={onSubmit}>
            <label
              htmlFor="username"
              className="text-gray-700 mb-2 block text-sm font-semibold"
            >
              Nombre:
            </label>
            <input
              type="text"
              {...register("username", {
                required: {
                  value: true,
                  message: "Nombre de usuario es requerido",
                },
              })}
              className="p-3 rounded border border-gray-300 block mb-2 w-full"
              placeholder="yourUser123"
            />
            {errors.username && (
              <span className="text-red-500 text-xs">
                {errors.username.message}
              </span>
            )}

            <label
              htmlFor="email"
              className="text-gray-700 mb-2 block text-sm font-semibold"
            >
              Correo:
            </label>
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Correo es requerido",
                },
              })}
              className="p-3 rounded border border-gray-300 block mb-2 w-full"
              placeholder="user@email.com"
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
                required: {
                  value: true,
                  message: "Contraseña es requerida",
                },
              })}
              className="p-3 rounded border border-gray-300 block mb-2 w-full"
              placeholder="********"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}

            <label
              htmlFor="confirmPassword"
              className="text-gray-700 mb-2 block text-sm font-semibold"
            >
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirmación de contraseña es requerida",
                },
              })}
              className="p-3 rounded border border-gray-300 block mb-2 w-full"
              placeholder="********"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}

            <button className="w-full bg-red-600 text-white p-3 rounded-lg mt-4 font-bold">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
