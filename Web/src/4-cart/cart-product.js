//ساخت navbar
import { navbar } from "../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

const removeModal = document.getElementById("removeModal");
const cancelRemoveBtn = document.getElementById("cancelRemoveBtn");
const confirmRemoveBtn = document.getElementById("confirmRemoveBtn");

const modalProductImage = document.getElementById("modalProductImage");
const modalProductName = document.getElementById("modalProductName");
const modalProductInfo = document.getElementById("modalProductInfo");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductQuantity = document.getElementById("modalProductQuantity");

// خالی بودن کارت
const totalPriceElement = document.getElementById("total-price");
const emptyCart = document.getElementById("empty-cart");
const checkoutBtn=document.getElementById("checkout-btn")

let selectedCartItem = null;

//ساختار محصولات
const cartList = document.getElementById("cart-list");

async function getCartItems() {
  const res = await fetch("http://localhost:3000/cart");
  const data = await res.json();

  if (data.length === 0) {
    cartList.classList.add("hidden");
    emptyCart.classList.remove("hidden");
    emptyCart.classList.add("flex");

    totalPriceElement.textContent = "$0.00";
    return;
  }

  cartList.classList.remove("hidden");
  emptyCart.classList.add("hidden");

  const total = data.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  totalPriceElement.textContent = `$${total.toFixed(2)}`;

  renderCart(data);
}

async function renderCart(items) {
  const productsRes = await fetch("http://localhost:3000/products");
  const products = await productsRes.json();

  cartList.innerHTML = "";

  items.forEach((item) => {
    //گرفتن موجودی از آرایه
    const product = products.find((p) => p.id === item.productId);
    const limit = Math.min(product.qty, 10);
    cartList.innerHTML += `
      <div
        class="cart-item flex items-center justify-between bg-[#F7F7F7] rounded-[20px] p-3 mx-4 mt-8 shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
      >

        <!-- Product Image -->
        <div
          class="flex items-center justify-center w-24 h-24 bg-[#EFEFEF] rounded-[16px] shrink-0 overflow-hidden"
        >
          <img
            src="${item.image}"
            alt="${item.name}"
            class="w-20 h-auto object-contain"
          />
        </div>

        <!-- Product Info -->
        <div class="flex flex-col flex-1 mx-3 min-w-0">

          <h2 class="text-base font-semibold text-gray-900 whitespace-nowrap">
            ${item.name}
          </h2>

          <div class="flex items-center gap-1.5 mt-2 whitespace-nowrap">
            <span class="text-xs text-gray-500">
              ${item.info}
            </span>
          </div>

          <div class="flex items-center justify-between mt-4">

            <span class="item-price text-xl font-semibold">
              $${(item.price * item.quantity).toFixed(2)}
            </span>

            <div
              class="flex items-center gap-3 bg-[#EFEFEF] px-3 py-2 rounded-full"
            >
              <button
                class="quantity-minus text-base leading-none"
                data-id="${item.id}"
                type="button"
              >
                −
              </button>

              <span class="quantity-value text-sm font-medium">
                ${item.quantity}
              </span>

              <button
                class="quantity-plus"
                data-id="${item.id}"
                data-max="${limit}"
                type="button"
              >
                +
              </button>
            </div>

            <button
              class="self-start mt-1 shrink-0"
              data-remove-btn
              data-id="${item.id}"
              data-name="${item.name}"
              data-info="${item.info}"
              data-price="$${item.price}"
              data-image="${item.image}"
              data-quantity="${item.quantity}"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              </svg>
            </button>

          </div>
        </div>

      </div>
    `;
  });

  attachEvents();
}

//حذف آیتم از api
async function deleteItem(id) {
  await fetch(`http://localhost:3000/cart/${id}`, {
    method: "DELETE",
  });

  getCartItems();
}

async function updateQuantity(id, newQty) {
  await fetch(`http://localhost:3000/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quantity: newQty,
    }),
  });

  getCartItems();
}

//وصل کردن ایونت ها
function attachEvents() {
document.querySelectorAll(".quantity-minus").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    const cartItem = btn.closest(".cart-item");

    const span = btn.nextElementSibling;
    let qty = Number(span.textContent);

    if (qty === 1) {
      openRemoveModal(cartItem);
      return;
    }

    await updateQuantity(id, qty - 1);
  });
});

  document.querySelectorAll(".quantity-plus").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      const cartItem = btn.closest(".cart-item");
      const span = cartItem.querySelector(".quantity-value");

      let qty = Number(span.textContent);

      // گرفتن موجودی از data-attribute
      const maxQty = Number(btn.dataset.max);

      const limit = maxQty > 10 ? 10 : maxQty;

      if (qty >= limit) {
        alert("You can't choose more!");
        return;
      }

      await updateQuantity(id, qty + 1);
    });
  });

  document.querySelectorAll("[data-remove-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openRemoveModal(btn.closest(".cart-item"));
    });
  });
}

//مدال حذف
function openRemoveModal(cartItem) {
  const removeButton = cartItem.querySelector("[data-remove-btn]");
  const quantityElement = cartItem.querySelector(".quantity-value");

  const price = Number(removeButton.dataset.price.replace("$", ""));
  const quantity = Number(quantityElement.textContent);

  selectedCartItem = cartItem;

  modalProductImage.src = removeButton.dataset.image;
  modalProductName.textContent = removeButton.dataset.name;
  modalProductInfo.textContent = removeButton.dataset.info;

  modalProductPrice.textContent = `$${(price * quantity).toFixed(2)}`;
  modalProductQuantity.textContent = `- ${quantity} +`;

  removeModal.classList.remove("hidden");
  removeModal.classList.add("flex");
}

function closeRemoveModal() {
  removeModal.classList.add("hidden");
  removeModal.classList.remove("flex");
  selectedCartItem = null;
}

/* دکمه‌های مدال */
cancelRemoveBtn.addEventListener("click", closeRemoveModal);

//تایید حذف مدال
confirmRemoveBtn.addEventListener("click", async () => {
  if (!selectedCartItem) return;

  const removeButton = selectedCartItem.querySelector("[data-remove-btn]");

  await deleteItem(removeButton.dataset.id);

  closeRemoveModal();
});

/* بستن مدال با کلیک بیرون آن */
removeModal.addEventListener("click", (event) => {
  if (event.target === removeModal) {
    closeRemoveModal();
  }
});

//دکمه checkout
checkoutBtn.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/cart");
  const cartItems = await response.json();

  if (cartItems.length === 0) {
    alert("Your cart is empty");
    return;
  }

  window.location.href = "/Web/src/5-checkout/checkout/checkout.html";
});

getCartItems();
