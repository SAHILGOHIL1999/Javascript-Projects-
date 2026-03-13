import { getProducts, getProductById } from "./products.mjs";

// Display Products
const displayProducts = (productToDisplay) => {
    const container = document.getElementById("products_container");
    if (!container) return;

    if (productToDisplay.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3>No Products Found.</h3>
                <p>Try adjusting your search or filter</p>
            </div>`;
        return;
    }

    container.innerHTML = productToDisplay.map(p => `
        <div class="col py-4">
            <div class="card p-2" style="width: 18rem;">
                <img src="${p.image}" class="card-img-top" alt="product image">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${p.name}</h5>
                    <p class="card-text text-truncate">${p.description}</p>
                    <p class="card-text fw-bold">$${p.price.toFixed(2)}</p>
                </div>
                <div class="p-2">
                    <span class="stock-badge ${getStockClass(p.stock)}">${getStockText(p.stock)}</span>
                    <button class="btn-add-to-cart btn btn-primary w-100 mt-2" data-id="${p.id}" ${p.stock === 0 ? "disabled" : ""}>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    `).join("");
};

// Stock
const getStockText = (stock) => {
    if (stock === 0) return "Out Of Stock";
    if (stock < 10) return `Only ${stock} left`;
    return "In - Stock";
};

const getStockClass = (stock) => {
    if (stock === 0) return "out-of-stock text-danger";
    if (stock < 10) return "low-stock text-warning";
    return "in-stock text-success";
};

// Cart Management
export const getCart = () => JSON.parse(sessionStorage.getItem("cart")) || [];
export const saveCart = (cart) => sessionStorage.setItem("cart", JSON.stringify(cart));

const addToCart = (productId) => {
    const product = getProductById(productId);
    if (!product) return showToast("Error", "Product not found", "danger");
    if (product.stock === 0) return showToast("Out of Stock", "Item unavailable", "warning");

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            showToast("Success", "Quantity updated", "success");
        } else {
            showToast("Limit", "Max stock reached", "danger");
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
        showToast("Added", `${product.name} added to cart`, "success");
    }
    saveCart(cart);
};

// Filtering
const filterProducts = () => {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const category = document.getElementById("category-filter").value;
    const sortby = document.getElementById("sort-filter").value;

    let products = getProducts();

    if (searchTerm) products = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    if (category !== "all") products = products.filter(p => p.category === category);

    if (sortby === "price-low") products.sort((a, b) => a.price - b.price);
    else if (sortby === "price-high") products.sort((a, b) => b.price - a.price);
    else if (sortby === "name") products.sort((a, b) => a.name.localeCompare(b.name));

    displayProducts(products);
};

// Toast Notification
export const showToast = (title, message, type = "info") => {
    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast-notification toast-${type} p-3 border rounded shadow-sm bg-white position-fixed bottom-0 end-0 m-3`;
    toast.style.zIndex = "1050";
    toast.innerHTML = `<strong>${title}</strong>: ${message}`;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(getProducts());
    
    document.getElementById("search-input")?.addEventListener("input", filterProducts);
    document.getElementById("category-filter")?.addEventListener("change", filterProducts);
    document.getElementById("sort-filter")?.addEventListener("change", filterProducts);

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-add-to-cart")) {
            addToCart(Number(e.target.dataset.id));
        }
    });
});