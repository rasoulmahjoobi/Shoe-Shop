//ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

const params = new URLSearchParams(window.location.search);

// گرفتن id محصول از URL
const productId = params.get("id");

// گرفتن المنت های صفحه
const productTitle = document.getElementById("product-title");
const productImage = document.getElementById("product-image");
const productDescription = document.getElementById("product-description");

const totalPrice = document.getElementById("total-price");
const soldCount = document.getElementById("sold-count");
const rating = document.getElementById("product-rate");

const sizesContainer = document.getElementById("sizes-container");
const colorsContainer = document.getElementById("colors-container");

// اگر محصول ناموجود باشد
const productDetails1 = document.getElementById("product-details-1");
const productDetails2 = document.getElementById("product-details-2");
const outOfStock = document.getElementById("out-of-stock");

// دکمه های تعداد
const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const quantityValue = document.getElementById("quantity-value");

// دکمه های اصلی
const addToCartBtn = document.getElementById("add-to-cart-btn");
const favoriteBtn = document.getElementById("favorite-btn");

// گالری عکس
const imageContainer = document.getElementById("image-buttons");
let currentImageIndex = 0;

// state ها (وضعیت های اصلی صفحه)
let currentProduct = null;
let selectedSize = null;
let selectedColor = null;
let quantity = 0;

quantityValue.textContent = quantity;

// دکمه برگشت به صفحه قبل
document.getElementById("back-btn").addEventListener("click", () => {
  window.history.back();
});

// گرفتن محصول از API
async function getProduct() {
  const res = await fetch(`http://localhost:3000/products/${productId}`);
  const product = await res.json();

  currentProduct = product;
  renderProduct(product);
}

getProduct();

// رندر کردن اطلاعات محصول روی صفحه
function renderProduct(product) {
  productTitle.textContent = product.title;
  productDescription.textContent = product.description;

  soldCount.textContent = `${product.sold} sold`;
  rating.textContent = `${product.rating} (${product.reviews} reviews)`;

  totalPrice.textContent = "$0.00";

  // ====== گالری تصاویر ======
  const images = [product.image, ...(product.images || [])];

  imageContainer.innerHTML = "";
  productImage.src = images[0];
  currentImageIndex = 0;

  images.forEach((img, index) => {
    const dot = document.createElement("button");

    dot.className =
      "w-2 h-2 rounded-full transition-all " +
      (index === 0 ? "bg-black" : "bg-gray-300");

    dot.addEventListener("click", () => {
      currentImageIndex = index;

      productImage.style.opacity = "0.4";

      setTimeout(() => {
        productImage.src = img;
        productImage.style.opacity = "1";
      }, 120);

      updateDots();
    });

    imageContainer.appendChild(dot);
  });

  // ====== اگر محصول ناموجود باشد ======
  if (product.qty === 0) {
    outOfStock.classList.remove("hidden");
    productDetails1.classList.add("hidden");
    productDetails2.classList.add("hidden");
    return;
  }

  // ====== ساخت سایزها ======
  sizesContainer.innerHTML = "";

  product.sizes.forEach((size) => {
    const btn = document.createElement("button");

    btn.textContent = size;
    btn.className = "w-7 h-7 rounded-full border-2 border-gray-600 text-xs";

    btn.addEventListener("click", () => {
      selectedSize = size;

      sizesContainer.querySelectorAll("button").forEach((b) => {
        b.classList.remove("bg-black", "text-white");
      });

      btn.classList.add("bg-black", "text-white");
    });

    sizesContainer.appendChild(btn);
  });

  // ====== ساخت رنگ ها ======
  colorsContainer.innerHTML = "";

  product.colors.forEach((color) => {
    const btn = document.createElement("button");

    btn.className = "w-7 h-7 rounded-full border-2";
    btn.style.backgroundColor = color.toLowerCase();

    btn.addEventListener("click", () => {
      selectedColor = color;

      colorsContainer.querySelectorAll("button").forEach((b) => {
        b.classList.remove("border-black", "border-4");
      });

      btn.classList.add("border-black", "border-4");
    });

    colorsContainer.appendChild(btn);
  });

  // ====== تنظیم وضعیت اولیه قلب ======
  if (isInWishlist(product.id)) {
    updateHeartUI(true);
  } else {
    updateHeartUI(false);
  }
}

// آپدیت کردن نقطه های گالری
function updateDots() {
  const dots = document.querySelectorAll("#image-buttons button");

  dots.forEach((dot, index) => {
    dot.className =
      "w-2 h-2 rounded-full transition-all " +
      (index === currentImageIndex ? "bg-black" : "bg-gray-300");
  });
}

// افزایش تعداد
plusBtn.addEventListener("click", () => {
  const max = currentProduct.qty > 10 ? 10 : currentProduct.qty;

  if (quantity >= max) {
    alert("You can't choose more!");
    return;
  }

  quantity++;
  quantityValue.textContent = quantity;

  totalPrice.textContent = `$${(currentProduct.price * quantity).toFixed(2)}`;
});

// کاهش تعداد
minusBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityValue.textContent = quantity;

    totalPrice.textContent = `$${(currentProduct.price * quantity).toFixed(2)}`;
  }
});

// ====== مدیریت Wishlist ======
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// بررسی اینکه محصول داخل wishlist هست یا نه
function isInWishlist(id) {
  return wishlist.some((item) => item.id === id);
}

// تغییر ظاهر قلب (پر یا خالی)
function updateHeartUI(active) {
  const svg = favoriteBtn.querySelector("svg");

  svg.setAttribute("fill", active ? "red" : "white");
  svg.setAttribute("stroke", active ? "red" : "black");
}

// کلیک روی قلب (افزودن یا حذف از wishlist)
favoriteBtn.addEventListener("click", () => {
  const exists = wishlist.some((item) => item.id === currentProduct.id);

  if (exists) {
    wishlist = wishlist.filter((item) => item.id !== currentProduct.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateHeartUI(false);
    alert("Removed from Wishlist 💔");
  } else {
    wishlist.push(currentProduct);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateHeartUI(true);
    alert("Added to Wishlist ❤️");
  }
});
