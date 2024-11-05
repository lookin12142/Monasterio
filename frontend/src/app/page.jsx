// pages/index.js

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      {/* Sección con imagen de fondo */}
      <section
        className="flex-1 flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/imagenes/monasterio.jpg')" }}
      >
        <div className="text-white text-center">
          <h2 className="text-5xl font-bold">Bienvenido al Monasterio</h2>
          <p className="mt-4 text-lg">Explora .</p>
        </div>
      </section>
    </div>
  );
}
