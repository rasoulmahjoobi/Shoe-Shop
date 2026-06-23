// ساخت navbar
import { navbar } from "../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

const activeTab = document.getElementById("activeTab");
const completedTab = document.getElementById("completedTab");
const tabIndicator = document.getElementById("tabIndicator");
const ordersContainer = document.getElementById("ordersContainer");
const notFoundSection = document.getElementById("notFoundSection");

let orders = JSON.parse(localStorage.getItem("checkoutOrder")) || [];
let currentTab = "active";

function createOrderCard(order) {
  const isCompleted = order.status === true;

  return `
    <article class="flex min-h-[174px] w-full items-center gap-3 rounded-[28px] bg-white p-3 shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
      <div class="flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-[22px] bg-[#F1F1F1]">
        <img src="${order.image}" alt="${order.title}" class="max-h-[98px] max-w-[98px] object-contain"/>
      </div>

      <div class="min-w-0 flex-1">
        <h2 class="truncate text-[16px] font-extrabold leading-tight">
          ${order.title}
        </h2>

        <div class="mt-3 flex items-center gap-2 whitespace-nowrap text-[11px] text-[#666666]">
          <span class="h-3 w-3 shrink-0 rounded-full" style="background-color: ${order.colorCode}"></span>
          <span>${order.color}</span>
          <span>|</span>
          <span>Size = ${order.size}</span>
          <span>|</span>
          <span>Qty = ${order.qty}</span>
        </div>

        <span class="mt-3 inline-flex rounded-[8px] bg-[#EEEEEE] px-3 py-[5px] text-[10px] font-semibold text-[#555555]">
          ${isCompleted ? "Completed" : "In Delivery"}
        </span>

        <div class="mt-3 flex items-center justify-between gap-2">
          <p class="shrink-0 text-[17px] font-extrabold">
            $${order.price.toFixed(2)}
          </p>

          <button class="flex h-[36px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#111111] px-4 text-[11px] font-bold text-white">
            ${isCompleted ? "View Order" : "Track Order"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderOrders() {
  const filteredOrders = orders.filter((order) => {
    if (currentTab === "active") return order.status === false;
    return order.status === true;
  });

  if (filteredOrders.length === 0) {
    ordersContainer.classList.add("hidden");
    notFoundSection.classList.remove("hidden");
    return;
  }

  notFoundSection.classList.add("hidden");
  ordersContainer.classList.remove("hidden");

  ordersContainer.innerHTML = filteredOrders
    .map((order) => createOrderCard(order))
    .join("");
}

function setActiveTab() {
  currentTab = "active";

  activeTab.className =
    "w-1/2 pb-4 text-center text-[20px] font-extrabold text-[#222222]";

  completedTab.className =
    "w-1/2 pb-4 text-center text-[20px] font-medium text-[#A7A7A7]";

  tabIndicator.style.left = "0";

  renderOrders();
}

function setCompletedTab() {
  currentTab = "completed";

  completedTab.className =
    "w-1/2 pb-4 text-center text-[20px] font-extrabold text-[#222222]";

  activeTab.className =
    "w-1/2 pb-4 text-center text-[20px] font-medium text-[#A7A7A7]";

  tabIndicator.style.left = "50%";

  renderOrders();
}

activeTab.addEventListener("click", setActiveTab);
completedTab.addEventListener("click", setCompletedTab);

renderOrders();