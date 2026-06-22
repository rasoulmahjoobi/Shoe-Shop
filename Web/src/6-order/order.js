const activeTab = document.getElementById("activeTab");
const completedTab = document.getElementById("completedTab");
const tabIndicator = document.getElementById("tabIndicator");
const ordersContainer = document.getElementById("ordersContainer");

/*
  بعداً این آرایه باید از API دریافت شود.

  status: false  => Active
  status: true   => Completed
*/
const orders = [
    {
        id: 1,
        title: "Air Jordan 3 Retro",
        color: "Black",
        colorCode: "#3D3D3D",
        size: 42,
        qty: 1,
        price: 105,
        image: "image-shoe-3.png",
        status: true,
    },
    {
        id: 2,
        title: "Running Sportwear",
        color: "Silver",
        colorCode: "#E4E4E4",
        size: 41,
        qty: 2,
        price: 240,
        image: "image-shoe-2.png",
        status: false,
    },
    {
        id: 3,
        title: "New Balance 996 V2",
        color: "Brown",
        colorCode: "#6E6E6E",
        size: 42,
        qty: 1,
        price: 125,
        image: "image-shoe-1.png",
        status: true,
    },
    {
        id: 4,
        title: "Fila Running Sneakers",
        color: "Silver",
        colorCode: "#E4E4E4",
        size: 42,
        qty: 1,
        price: 95,
        image: "image-shoe-4.png",
        status: false,
    },
];

let currentTab = "active";

function createOrderCard(order) {
    const isCompleted = order.status === true;

    return `
    <article
      class="flex min-h-[174px] w-full items-center gap-3 rounded-[28px] bg-white p-3 shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
    >
      <div
        class="flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-[22px] bg-[#F1F1F1]"
      >
        <img
          src="${order.image}"
          alt="${order.title}"
          class="max-h-[98px] max-w-[98px] object-contain"
        />
      </div>

      <div class="min-w-0 flex-1">
        <h2 class="truncate text-[16px] font-extrabold leading-tight">
          ${order.title}
        </h2>

        <div class="mt-3 flex items-center gap-2 whitespace-nowrap text-[11px] text-[#666666]">
          <span
            class="h-3 w-3 shrink-0 rounded-full"
            style="background-color: ${order.colorCode}"
          ></span>

          <span>${order.color}</span>
          <span>|</span>
          <span>Size = ${order.size}</span>
          <span>|</span>
          <span>Qty = ${order.qty}</span>
        </div>

        <span
          class="mt-3 inline-flex rounded-[8px] bg-[#EEEEEE] px-3 py-[5px] text-[10px] font-semibold text-[#555555]"
        >
          ${isCompleted ? "Completed" : "In Delivery"}
        </span>

        <div class="mt-3 flex items-center justify-between gap-2">
          <p class="shrink-0 text-[17px] font-extrabold">
            $${order.price.toFixed(2)}
          </p>

          <button
            type="button"
            class="flex h-[36px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#111111] px-4 text-[11px] font-bold text-white"
          >
            ${isCompleted ? "View Order" : "Track Order"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderOrders() {
    const filteredOrders = orders.filter((order) => {
        if (currentTab === "active") {
            return order.status === false;
        }

        return order.status === true;
    });

    if (filteredOrders.length === 0) {
        const isActiveTab = currentTab === "active";

        ordersContainer.innerHTML = `
    <div class="flex flex-col items-center px-3 pt-24 text-center">
      
      <!-- تصویر خالی بودن سفارش‌ها -->
      <div class="relative mb-12 h-[260px] w-full max-w-[290px]">
        
        <!-- کارت عقب -->
        <div
          class="absolute left-[35px] top-[20px] h-[190px] w-[150px] rotate-[-15deg] rounded-[12px] border border-[#3D3D46] bg-white"
        >
          <div
            class="absolute left-1/2 top-[-22px] h-[40px] w-[138px] -translate-x-1/2 rounded-[6px] bg-[#111111]"
          ></div>

          <div
            class="absolute left-[22px] top-[28px] h-[145px] w-[108px] rounded-[5px] bg-[#F1F1F1]"
          ></div>

          <div
            class="absolute left-1/2 top-[-38px] h-[25px] w-[25px] -translate-x-1/2 rounded-full border-[4px] border-[#111111] bg-white"
          ></div>
        </div>

        <!-- کارت جلو -->
        <div
          class="absolute right-[18px] top-[58px] h-[205px] w-[190px] rounded-[12px] border border-[#3D3D46] bg-white"
        >
          <div
            class="absolute left-1/2 top-[-20px] h-[42px] w-[138px] -translate-x-1/2 rounded-[6px] bg-[#111111]"
          ></div>

          <div
            class="absolute left-[24px] top-[25px] h-[150px] w-[142px] rounded-[5px] bg-[#E9E9E9]"
          ></div>

          <div
            class="absolute left-1/2 top-[-38px] h-[25px] w-[25px] -translate-x-1/2 rounded-full border-[4px] border-[#111111] bg-white"
          ></div>
        </div>
      </div>

      <h2 class="text-[27px] font-extrabold tracking-[-0.8px] text-[#222222]">
        You don't have an order yet
      </h2>

      <p class="mt-5 max-w-[320px] text-[18px] leading-relaxed text-[#555555]">
        ${isActiveTab
                ? "You don't have an active orders at this time"
                : "You don't have any completed orders at this time"
            }
      </p>
    </div>
  `;

        return;
    }
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