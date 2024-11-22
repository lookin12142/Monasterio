'use client';

<<<<<<< HEAD
import { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
=======
import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  image: string // La imagen será una cadena en base64
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Galletas con Chispas',
      price: 4.6,
      stock: 40,
<<<<<<< HEAD
      image: '/collar.png',
=======
      image: '/galleta.png',
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
    },
    {
      id: 2,
      name: 'Galletas de Avena',
      price: 4.6,
      stock: 40,
<<<<<<< HEAD
      image: '/cuadro.png',
=======
      image: '/chispas.jpg',
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
    },
    {
      id: 3,
      name: 'Galletas de Chocolate',
      price: 4.6,
      stock: 40,
      image: '/fondo-login.png',
    },
<<<<<<< HEAD
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductStock, setNewProductStock] = useState(0);
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda

  const handleAddNewProduct = () => {
    if (!newProductName || newProductPrice <= 0) return;

    const newProduct: Product = {
      id: products.length + 1,
      name: newProductName,
      price: newProductPrice,
      stock: newProductStock,
      image: newProductImage || '/placeholder.svg',
    };

    setProducts([...products, newProduct]);
    setModalOpen(false);
    resetFormFields();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
    setNewProductStock(product.stock);
    setNewProductImage(product.image);
    setEditModalOpen(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: newProductName,
            price: newProductPrice,
            stock: newProductStock,
            image: newProductImage || product.image,
          }
        : product
    );

    setProducts(updatedProducts);
    setEditModalOpen(false);
    resetFormFields();
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProductImage(reader.result as string);
      };

      reader.readAsDataURL(file);
=======
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
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
    }
  };

  const resetFormFields = () => {
    setNewProductName('');
    setNewProductPrice(0);
    setNewProductStock(0);
    setNewProductImage(null);
  };

  // Filtrar productos por el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
<<<<<<< HEAD
        <div className="mb-8 rounded-lg bg-white p-4 shadow-sm w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Lista de Productos</h2>
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md flex items-center"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="mr-1 h-4 w-4" />
              Agregar Producto
            </button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
=======
        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" />
            AGREGAR PRODUCTO
          </button>
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm w-full">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
<<<<<<< HEAD
            {filteredProducts.map((product) => (
=======
            {products.map((product) => (
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
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
<<<<<<< HEAD
                    onClick={() => handleEditProduct(product)}
=======
                    onClick={() => setProducts(products.filter((p) => p.id !== product.id))}
                  >
                    Eliminar
                  </button>
                  <button
                    className="flex-1 border border-gray-300 p-2 rounded-md"
                    onClick={() => handleEditProduct(product.id)}
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
                  >
                    Editar
                  </button>
                  <button
                    className="flex-1 bg-gray-500 text-white p-2 rounded-md"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="inline-block h-4 w-4 mr-1" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

<<<<<<< HEAD
      {modalOpen && (
        <Modal
          title="Agregar Producto"
          onClose={() => setModalOpen(false)}
          onSave={handleAddNewProduct}
        >
          <FormFields
            productName={newProductName}
            productPrice={newProductPrice}
            productStock={newProductStock}
            productImage={newProductImage}
            setProductName={setNewProductName}
            setProductPrice={setNewProductPrice}
            setProductStock={setNewProductStock}
            onImageUpload={handleImageUpload}
          />
        </Modal>
      )}

      {editModalOpen && (
        <Modal
          title="Editar Producto"
          onClose={() => setEditModalOpen(false)}
          onSave={handleUpdateProduct}
        >
          <FormFields
            productName={newProductName}
            productPrice={newProductPrice}
            productStock={newProductStock}
            productImage={newProductImage}
            setProductName={setNewProductName}
            setProductPrice={setNewProductPrice}
            setProductStock={setNewProductStock}
            onImageUpload={handleImageUpload}
          />
        </Modal>
=======
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
>>>>>>> 2d3dbb8bc810c23443a257b38d70d3c32503b917
      )}

      <footer className="bg-gray-200 p-4 text-center w-full">
        <p>&copy; 2024 Repostería | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
  onSave,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-medium mb-4">{title}</h2>
        {children}
        <button
          className="bg-red-500 hover:bg-red-600 text-white w-full p-2 rounded-md mt-4"
          onClick={onSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

function FormFields({
  productName,
  productPrice,
  productStock,
  productImage,
  setProductName,
  setProductPrice,
  setProductStock,
  onImageUpload,
}: {
  productName: string;
  productPrice: number;
  productStock: number;
  productImage: string | null;
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  setProductPrice: React.Dispatch<React.SetStateAction<number>>;
  setProductStock: React.Dispatch<React.SetStateAction<number>>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Nombre del Producto</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Precio</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Stock</label>
        <input
          type="number"
          value={productStock}
          onChange={(e) => setProductStock(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Imagen</label>
        <input
          type="file"
          onChange={onImageUpload}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
        {productImage && (
          <img
            src={productImage}
            alt="Vista previa"
            className="mt-2 max-w-full h-40 object-cover"
          />
        )}
      </div>
    </div>
  );
}
