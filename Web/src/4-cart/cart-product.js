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

let selectedCartItem = null;

//ساختار محصولات
const cartList = document.getElementById("cart-list");

async function getCartItems() {
  const res = await fetch("http://localhost:3000/cart");
  const data = await res.json();

  renderCart(data);
}

function renderCart(items) {
  cartList.innerHTML = "";

  items.forEach((item) => {
    cartList.innerHTML += `
      <div class="cart-item flex items-center justify-between bg-[#F7F7F7] rounded-[20px] p-3 mx-4 mt-8 shadow-[0_8px_25px_rgba(0,0,0,0.08)]">

        <div class="flex items-center justify-center w-24 h-24 bg-[#EFEFEF] rounded-[16px] shrink-0">
          <img src="${item.image}" class="w-20 h-auto object-contain" />
        </div>

        <div class="flex flex-col flex-1 mx-3 min-w-0">

          <h2 class="text-base font-semibold">${item.name}</h2>

          <div class="flex items-center gap-1.5 mt-2">
            <span class="text-xs text-gray-500">${item.info}</span>
          </div>

          <div class="flex items-center justify-between mt-4">

            <span class="text-xl font-semibold">$${item.price}</span>

            <div class="flex items-center gap-3 bg-[#EFEFEF] px-3 py-2 rounded-full">
              <button class="quantity-minus" data-id="${item.id}">−</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-plus" data-id="${item.id}">+</button>
            </div>

            <button data-remove-btn data-id="${item.id}">
              🗑
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
      const span = btn.nextElementSibling;
      let qty = Number(span.textContent);

      if (qty === 1) {
        await deleteItem(id);
        return;
      }

      await updateQuantity(id, qty - 1);
    });
  });

  document.querySelectorAll(".quantity-plus").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const span = btn.previousElementSibling;
      let qty = Number(span.textContent);

      await updateQuantity(id, qty + 1);
    });
  });

  document.querySelectorAll("[data-remove-btn]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await deleteItem(btn.dataset.id);
    });
  });
}

function openRemoveModal(cartItem) {
  const removeButton = cartItem.querySelector("[data-remove-btn]");
  const quantityElement = cartItem.querySelector(".quantity-value");

  selectedCartItem = cartItem;

  modalProductImage.src = removeButton.dataset.image;
  modalProductName.textContent = removeButton.dataset.name;
  modalProductInfo.textContent = removeButton.dataset.info;
  modalProductPrice.textContent = removeButton.dataset.price;
  modalProductQuantity.textContent = `- ${quantityElement.textContent} +`;

  removeModal.classList.remove("hidden");
  removeModal.classList.add("flex");
}

function closeRemoveModal() {
  removeModal.classList.add("hidden");
  removeModal.classList.remove("flex");
  selectedCartItem = null;
}

/* دکمه سطل زباله */
document.querySelectorAll("[data-remove-btn]").forEach((button) => {
  button.addEventListener("click", () => {
    openRemoveModal(button.closest(".cart-item"));
  });
});

/* دکمه منفی */
document.querySelectorAll(".quantity-minus").forEach((button) => {
  button.addEventListener("click", () => {
    const cartItem = button.closest(".cart-item");
    const quantityElement = cartItem.querySelector(".quantity-value");
    const quantity = Number(quantityElement.textContent);

    if (quantity === 1) {
      openRemoveModal(cartItem);
      return;
    }

    quantityElement.textContent = quantity - 1;
  });
});

/* دکمه مثبت */
document.querySelectorAll(".quantity-plus").forEach((button) => {
  button.addEventListener("click", () => {
    const cartItem = button.closest(".cart-item");
    const quantityElement = cartItem.querySelector(".quantity-value");

    quantityElement.textContent = Number(quantityElement.textContent) + 1;
  });
});

/* دکمه‌های مدال */
cancelRemoveBtn.addEventListener("click", closeRemoveModal);

confirmRemoveBtn.addEventListener("click", () => {
  if (selectedCartItem) {
    selectedCartItem.remove();
  }

  closeRemoveModal();
});

/* بستن مدال با کلیک بیرون آن */
removeModal.addEventListener("click", (event) => {
  if (event.target === removeModal) {
    closeRemoveModal();
  }
});





    // <main class="h-[calc(100vh-300px)] overflow-y-auto pb-8">
    //   <div
    //     class="cart-item flex items-center justify-between bg-[#F7F7F7] rounded-[20px] p-3 mx-4 mt-8 shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
    //   >
    //     <!-- Product Image -->
    //     <div
    //       class="flex items-center justify-center w-24 h-24 bg-[#EFEFEF] rounded-[16px] shrink-0"
    //     >
    //       <img
    //         src="../../assets/images/image-home/image-shoe-4.png"
    //         alt="shoe"
    //         class="w-20 h-auto object-contain"
    //       />
    //     </div>

    //     <!-- Product Info -->
    //     <div class="flex flex-col flex-1 mx-3 min-w-0">
    //       <h2 class="text-base font-semibold text-gray-900 whitespace-nowrap">
    //         Air Jordan 3 Retro
    //       </h2>

    //       <div class="flex items-center gap-1.5 mt-2 whitespace-nowrap">
    //         <div class="w-3 h-3 bg-black rounded-full shrink-0"></div>
    //         <span class="text-xs text-gray-500">Black</span>
    //         <span class="text-xs text-gray-400">|</span>
    //         <span class="text-xs text-gray-500">Size = 42</span>
    //       </div>

    //       <div class="flex items-center justify-between mt-4">
    //         <span class="text-xl font-semibold">$105.00</span>

    //         <div
    //           class="flex items-center gap-3 bg-[#EFEFEF] px-3 py-2 rounded-full"
    //         >
    //           <button
    //             class="quantity-minus text-base leading-none"
    //             type="button"
    //           >
    //             −
    //           </button>

    //           <span class="quantity-value text-sm font-medium">1</span>

    //           <button
    //             class="quantity-plus text-base leading-none"
    //             type="button"
    //           >
    //             +
    //           </button>
    //         </div>

    //         <button
    //           class="self-start mt-1 shrink-0"
    //           data-remove-btn
    //           data-name="Air Jordan 3 Retro"
    //           data-info="Black | Size = 42"
    //           data-price="$105.00"
    //           data-image="../../assets/images/image-home/image-shoe-4.png"
    //           data-quantity="1"
    //           type="button"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="30"
    //             height="30"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //             stroke-width="2"
    //           >
    //             <path d="M3 6h18" />
    //             <path d="M8 6V4h8v2" />
    //             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </main>
