//ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

//  Shipping Address
const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

const selectedAddressName = document.getElementById("selectedAddressName");
const selectedAddressText = document.getElementById("selectedAddressText");

if (savedAddress && selectedAddressName && selectedAddressText) {
  selectedAddressName.textContent = savedAddress.name;
  selectedAddressText.textContent = savedAddress.address;
}

// API cart
const API_URL = "http://localhost:3000";
let cartItems = [];

// گرفتن cart از json-server
async function loadCart() {
  try {
    const res = await fetch(`${API_URL}/cart`);
    const data = await res.json();

    cartItems = Array.isArray(data) ? data : data.cart || [];

    localStorage.setItem(
      "checkoutOrder",
      JSON.stringify(
        cartItems.map((item) => ({
          id: item.id,
          title: item.name,
          color: item.color || "Default",
          colorCode: item.colorCode || "#E4E4E4",
          size: item.size,
          qty: item.quantity,
          price: item.price,
          image: item.image,
          status: false,
        })),
      ),
    );

    renderOrderList();
    updateCheckoutPrices();
  } catch (err) {
    console.error("Error loading cart:", err);
    cartItems = [];
    renderOrderList();
    updateCheckoutPrices();
  }
}

// رندر Order List
const orderListContainer = document.querySelector(".space-y-7");

function renderOrderList() {
  if (!orderListContainer) return;

  orderListContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const itemTotal = Number(item.price) * Number(item.quantity);

    orderListContainer.innerHTML += `
      <article class="flex items-center gap-5 rounded-[34px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">

        <div class="flex h-[140px] w-[140px] shrink-0 items-center justify-center rounded-[24px] bg-[#F2F2F2]">
          <img class="w-[125px] object-contain" src="${item.image}" />
        </div>

        <div class="min-w-0 flex-1">
          <h3 class="truncate text-[20px] font-extrabold">
            ${item.name || item.title}
          </h3>

          <div class="mt-3 flex items-center gap-2 text-[14px] text-[#666666]">
            <span>${item.color}</span>
            <span>|</span>
            <span>Size = ${item.size}</span>
          </div>

          <div class="mt-5 flex items-center justify-between">
            <p class="text-[20px] font-extrabold">
              $${itemTotal.toFixed(2)}
            </p>

            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F2F2] font-bold">
              ${item.quantity}
            </span>
          </div>
        </div>

      </article>
    `;
  });
}

//  Shipping
const selectedShipping = JSON.parse(localStorage.getItem("selectedShipping"));

const shippingAmount = selectedShipping
  ? Number(selectedShipping.price) || 0
  : 0;

const shippingType = document.getElementById("selectedShippingType");
const shippingArrival = document.getElementById("selectedShippingArrival");
const selectedShippingPrice = document.getElementById("selectedShippingPrice");

if (
  selectedShipping &&
  shippingType &&
  shippingArrival &&
  selectedShippingPrice
) {
  shippingType.textContent = selectedShipping.name;

  shippingArrival.textContent = selectedShipping.arrival;
  shippingArrival.classList.remove("hidden");

  selectedShippingPrice.textContent = `$${shippingAmount.toFixed(2)}`;
  selectedShippingPrice.classList.remove("hidden");
}

//  Promo / Discount
const promoBadge = document.getElementById("promoBadge");
const promoText = document.getElementById("promoText");
const removePromoButton = document.getElementById("removePromoButton");
const addPromoButton = document.getElementById("addPromoButton");

const discountRow = document.getElementById("discountRow");
const discountLabel = document.getElementById("discountLabel");
const discountPrice = document.getElementById("discountPrice");

const amountPrice = document.getElementById("amountPrice");
const shippingPrice = document.getElementById("shippingPrice");
const totalPrice = document.getElementById("totalPrice");

if (localStorage.getItem("discountPercent") === null) {
  localStorage.setItem("discountPercent", "20");
}

let discountPercent = Number(localStorage.getItem("discountPercent"));

// قیمت ها
function updateCheckoutPrices() {
  const amount = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  const discountAmount = amount * (discountPercent / 100);
  const totalAmount = amount - discountAmount + shippingAmount;

  if (amountPrice) {
    amountPrice.textContent = `$${amount.toFixed(2)}`;
  }

  if (shippingPrice) {
    shippingPrice.textContent = selectedShipping
      ? `$${shippingAmount.toFixed(2)}`
      : "-";
  }

  if (discountPercent > 0) {
    promoBadge?.classList.remove("hidden");
    discountRow?.classList.remove("hidden");

    promoText.textContent = `Discount ${discountPercent}% Off`;
    discountLabel.textContent = `Discount (${discountPercent}%)`;
    discountPrice.textContent = `-$${discountAmount.toFixed(2)}`;
  } else {
    promoBadge?.classList.add("hidden");

    discountRow?.classList.add("hidden");
    discountPrice.textContent = "-$0.00";
  }

  if (totalPrice) {
    totalPrice.textContent = `$${totalAmount.toFixed(2)}`;
  }
}

//  Remove Discount
if (removePromoButton) {
  removePromoButton.addEventListener("click", function () {
    discountPercent = 0;
    localStorage.setItem("discountPercent", "0");
    updateCheckoutPrices();
  });
}

//  Add Discount
if (addPromoButton) {
  addPromoButton.addEventListener("click", function () {
    discountPercent = 20;
    localStorage.setItem("discountPercent", "20");
    updateCheckoutPrices();
  });
}

// init
loadCart();
updateCheckoutPrices();
