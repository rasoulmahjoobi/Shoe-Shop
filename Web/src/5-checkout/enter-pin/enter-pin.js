const pinKeys = document.querySelectorAll(".pin-key");
const pinDots = document.querySelectorAll(".pin-dot");
const deletePin = document.getElementById("deletePin");
const successModal = document.getElementById("successModal");
const viewOrderButton = document.getElementById("viewOrderButton");
const viewReceiptButton = document.getElementById("viewReceiptButton");

let pin = "";

const correctPin = "1234";

function updatePinDots() {
  pinDots.forEach((dot, index) => {
    if (index < pin.length) {
      dot.classList.remove("bg-[#E5E5E5]");
      dot.classList.add("bg-[#111111]");
    } else {
      dot.classList.remove("bg-[#111111]");
      dot.classList.add("bg-[#E5E5E5]");
    }
  });
}

function getCurrentOrder() {
  return JSON.parse(localStorage.getItem("currentOrder"));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function completePayment() {
  const currentOrder = getCurrentOrder();

  if (!currentOrder) {
    window.location.href = "checkout.html";
    return;
  }

  const orders = getOrders();

  const orderIndex = orders.findIndex(
    (order) => String(order.id) === String(currentOrder.id),
  );

  //------------------------------------------------------------------------------
  //بعد از کلی تست کردن این قسمت که مربوط به جلوگیری از پرداخت دوباره سفارش بود درست نشد
  //------------------------------------------------------------------------------
  
  // // جلوگیری از پرداخت مجدد
  // if (
  //   currentOrder.paymentStatus === "paid" ||
  //   currentOrder.status === "active" ||
  //   currentOrder.status === "completed" ||
  //   orderIndex !== -1
  // ) {
  //   alert("This order has already been paid.");

  //   successModal.classList.remove("hidden");
  //   successModal.classList.add("flex");

  //   return;
  // }

  // وضعیت سفارش برای صفحه order.html
  currentOrder.status = "active";

  currentOrder.paymentStatus = "paid";

  currentOrder.paidAt = new Date().toLocaleString();

  currentOrder.deliveryStatus = "In Delivery";

  //ذخیره سفارش در localstorage
  if (orderIndex === -1) {
    orders.push(currentOrder);
  } else {
    orders[orderIndex] = currentOrder;
  }

  saveOrders(orders);

  localStorage.setItem("orderPaid", "true");

  // اطلاعات سفارش پرداخت‌شده را آپدیت می‌کنیم.
  localStorage.setItem("currentOrder", JSON.stringify(currentOrder));

  successModal.classList.remove("hidden");
  successModal.classList.add("flex");
}

pinKeys.forEach((key) => {
  key.addEventListener("click", function () {
    if (pin.length >= 4) return;

    pin += this.dataset.number;

    updatePinDots();

    if (pin.length === 4) {
      setTimeout(() => {
        if (pin === correctPin) {
          completePayment();
        } else {
          alert("PIN is incorrect");

          pin = "";
          updatePinDots();
        }
      }, 250);
    }
  });
});

deletePin?.addEventListener("click", function () {
  pin = pin.slice(0, -1);
  updatePinDots();
});

// با کلیک روی View Order وارد صفحه سفارش‌ها می‌شویم.
viewOrderButton?.addEventListener("click", function () {
  const currentOrder = getCurrentOrder();

  if (!currentOrder) {
    window.location.href = "/Web/src/6-order/order.html";
    return;
  }

  localStorage.setItem("ordersCurrentTab", currentOrder.status);

  window.location.href = "/Web/src/6-order/order.html";
});

viewReceiptButton?.addEventListener("click", function () {
  const currentOrder = getCurrentOrder();

  if (!currentOrder) return;

  alert(
    `Receipt

Order ID: ${currentOrder.id}
Order Status: ${currentOrder.status}
Payment Status: ${currentOrder.paymentStatus}
Payment Method: ${currentOrder.paymentMethod?.name || "Unknown"}
Paid At: ${currentOrder.paidAt}`,
  );
});
