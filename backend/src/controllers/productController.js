import Product from '../models/productmodel.js';

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const { type } = req.params;
  const { name, stock, unit_price } = req.body;

  try {
    const newProduct = await Product.create({ name, stock, unit_price, type });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los productos de un tipo específico
export const getProducts = async (req, res) => {
  const { type } = req.params;

  try {
    const products = await Product.findAll({ where: { type } });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto específico
export const deleteProduct = async (req, res) => {
  const { type, id } = req.params;

  try {
    const product = await Product.findOne({ where: { id, type } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un producto específico
export const updateProduct = async (req, res) => {
  const { type, id } = req.params;
  const { name, stock, unit_price } = req.body;

  try {
    const product = await Product.findOne({ where: { id, type } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name || product.name;
    product.stock = stock || product.stock;
    product.unit_price = unit_price || product.unit_price;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
