import { getProducts } from "./products.mjs";
import { getProductById } from "./products.mjs";

const displayProducts = (productToDisplay) => {

  const container = document.getElementById("products_container");

  if (!container) return;

  if (productToDisplay.length === 0) {
    container.innerHTML = `
     <div class="col-12">
        <div class="empty-state">
          <span><i class="bi bi-search"></i></span>
          <h3>No Products Found.</h3>
          <p>Try adjusting your search or filter</p>
        </div>
     </div>
    `;
    return;
  }

  container.innerHTML = productToDisplay
    .map(
      (p) =>
        `
    <div class="col py-4">
      <div class="card p-2" style="width: 18rem;">
        <img src=${p.image} class="card-img-top" alt="product image">
        <div class="card-body">
          <h5 class="card-title text-truncate">${p.name}</h5>
          <p class="card-text text-truncate">${p.description}</p>
          <p class="card-text">$${p.price.toFixed(2)}</p>
        </div>
        <div class="">
        <span class="stock-badge ${getStockClass(p.stock)}">${getStockText(p.stock)}</span>
        <div>
          <button class="btn-add-to-cart rounded p-2 w-100 mt-2" data-id=${p.id} ${p.stock === 0 ? "disabled" : ""}>Add To Cart</button>
        </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
};

// stock function

const getStockText = (stock) => {
  if (stock === 0) return "Out Of Stock";
  if (stock < 10) return `Only ${stock}`;
  return "In - Stock";
};

// stock class function

const getStockClass = (stock) => {
  if (stock === 0) return "out-of-stock";
  if (stock < 10) return "low-stock";
  return "in-stock";
};

// get cart in session storage

export const getCart = () => {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// save cart in session storage

export const saveCart = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

// addToCart Function

const addToCart = (productId) => {
  const product = getProductById(productId);

  console.log("Cartproduct", product);

  if (!product) {
    showToast("Error", "Product not found", "danger");
    return;
  }

  if (product.stock === 0) {
    showToast(
      "OutOfStock",
      "This is product is currently out of stock",
      "warning",
    );
  }

  const cart = getCart();

  const existingItem = cart.find((item) => item.id === productId);

  console.log("existingItem");

  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity++;
      showToast("Success", "Product quantity updated in cart", "success");
    } else {
      showToast("Error", "Maximum quantity reached for this product", "danger");
      return;
    }
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      maxStock: product.stock,
    });
    showToast("Added to Cart", `${product.name} added to cart`, "success");
  }

  saveCart(cart);
};

// filter

const filterProducts = () => {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  const category = document.getElementById("category-filter").value;

  const sortby = document.getElementById("sort-filter").value;

  let products = getProducts();

  // search

  if (searchTerm) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm),
    );
  }

  // category

  if (category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  // sort

  switch (sortby) {
    case "price-low":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      products.sort((a, b) => b.price - a.price);
      break;
    case "name":
      products.sort((a, b) => a.name.localeCompare(b.name));
  }

  displayProducts(products);
};

// show toast

export const showToast = (title, message, type = "info") => {
  // remove toast

  const existingToast = document.querySelector(".toast-notification");

  if (existingToast) {
    existingToast.remove();
  }

  const icon = {
    success: '<i class="fa-regular fa-thumbs-up"></i>',
    danger: '<i class="fa-solid fa-skull-crossbones"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation"></i>',
    info: '<i class="fa-solid fa-circle-info"></i>',
  };

  const toast = document.createElement("div");

  toast.className = "toast-notification";
  toast.innerHTML = `
  <div class="d-flex align-items-center">
  <span>${icon[type]}</span>
      <div>
      <strong>${title}</strong>
      <div>${message}</div>
      </div>
      </div>
      `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.4s ease";

    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

document.addEventListener("DOMContentLoaded", function () {
  displayProducts(getProducts());

  document
    .getElementById("search-input")
    ?.addEventListener("input", filterProducts);
  document
    .getElementById("category-filter")
    ?.addEventListener("change", filterProducts);
  document
    .getElementById("sort-filter")
    ?.addEventListener("change", filterProducts);

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-add-to-cart")) {
      const id = Number(e.target.getAttribute("data-id"));
      addToCart(id);
    }
  });
});
