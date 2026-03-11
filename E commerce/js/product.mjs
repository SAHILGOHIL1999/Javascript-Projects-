/**
 * Product Data and Management Module
 */

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Premium wireless headphones with noise cancellation",
    stock: 15,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Advanced smartwatch with fitness tracking",
    stock: 8,
  },
  {
    id: 3,
    name: "Leather Laptop Bag",
    category: "Accessories",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    description: "Professional leather bag for 15-inch laptops",
    stock: 20,
  },
  {
    id: 4,
    name: "Cotton T-Shirt (Pack of 3)",
    category: "Clothing",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    description: "Comfortable cotton t-shirts in assorted colors",
    stock: 50,
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Clothing",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    description: "Lightweight running shoes with cushioned sole",
    stock: 12,
  },
  {
    id: 6,
    name: "JavaScript Programming Book",
    category: "Books",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
    description: "Complete guide to modern JavaScript",
    stock: 30,
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    category: "Home",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    description: "Insulated water bottle keeps drinks cold for 24 hours",
    stock: 0,
  },
  {
    id: 8,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    description: "Ergonomic wireless mouse with precision tracking",
    stock: 25,
  },
  {
    id: 9,
    name: "Coffee Maker",
    category: "Home",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    description: "Programmable coffee maker with thermal carafe",
    stock: 10,
  },
  {
    id: 10,
    name: "Yoga Mat",
    category: "Sports",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    description: "Non-slip yoga mat with carrying strap",
    stock: 18,
  },
  {
    id: 11,
    name: "Desk Lamp LED",
    category: "Home",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    description: "Adjustable LED desk lamp with USB charging port",
    stock: 15,
  },
  {
    id: 12,
    name: "Backpack",
    category: "Accessories",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    description: "Water-resistant backpack with laptop compartment",
    stock: 22,
  },
];

/**
 * Initializes products in localStorage if they don't exist.
 */
const initializeProducts = () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }
};

/**
 * Returns all products from storage.
 */
export const getProducts = () => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : products;
};

/**
 * Finds a single product by ID.
 */
export const getProductById = (id) => {
  const allProducts = getProducts();
  return allProducts.find((p) => p.id === id);
};

/**
 * Utility to get unique categories for filter dropdowns.
 */
export const getCategories = () => {
  const allProducts = getProducts();
  return ["all", ...new Set(allProducts.map((p) => p.category))];
};

// Run initialization immediately on import
initializeProducts();