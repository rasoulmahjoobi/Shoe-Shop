const pinKeys = document.querySelectorAll(".pin-key");
const pinDots = document.querySelectorAll(".pin-dot");
const deletePin = document.getElementById("deletePin");
const successModal = document.getElementById("successModal");
const viewOrderButton = document.getElementById("viewOrderButton");
const viewReceiptButton = document.getElementById("viewReceiptButton");

let pin = "";

/*
  PIN موقت پروژه است.

  بعداً با اضافه شدن API:
  این مقدار نباید داخل JavaScript باشد.
  PIN باید به API ارسال شود و API درست یا غلط بودن آن را برگرداند.
*/
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

  /*
    بعداً با اضافه شدن API:
    این قسمت باید با درخواست پرداخت به API جایگزین شود.

    مثال:
    POST /payments
    {
      orderId: currentOrder.id,
      paymentMethod: currentOrder.paymentMethod,
      pin: pin
    }
  */

  const orders = getOrders();

  const orderIndex = orders.findIndex(
    (order) => String(order.id) === String(currentOrder.id)
  );

  /*
    جلوگیری از پرداخت مجدد بدون API

    بعداً با API:
    این بررسی باید از API انجام شود،
    چون localStorage قابل تغییر توسط کاربر است.
  */
  if (
    currentOrder.paymentStatus === "paid" ||
    currentOrder.status === "active" ||
    currentOrder.status === "completed" ||
    orderIndex !== -1
  ) {
    alert("This order has already been paid.");

    successModal.classList.remove("hidden");
    successModal.classList.add("flex");

    return;
  }

  /*
    وضعیت سفارش برای صفحه order.html

    active = سفارش فعال و در حال ارسال
    completed = سفارش تحویل شده

    بعداً با API:
    مقدار status باید از API سفارش دریافت شود.
  */
  currentOrder.status = "active";

  /*
    بعداً با API:
    وضعیت پرداخت باید از API دریافت شود.
  */
  currentOrder.paymentStatus = "paid";

  /*
    بعداً با API:
    تاریخ پرداخت باید از API دریافت شود.
  */
  currentOrder.paidAt = new Date().toLocaleString();

  /*
    بعداً با API:
    وضعیت ارسال باید از API دریافت شود.
  */
  currentOrder.deliveryStatus = "In Delivery";

  /*
    فعلاً سفارش را داخل localStorage ذخیره می‌کنیم.

    بعداً با API:
    API خودش سفارش را ذخیره می‌کند
    و این بخش لازم نیست.
  */
  if (orderIndex === -1) {
    orders.push(currentOrder);
  } else {
    orders[orderIndex] = currentOrder;
  }

  saveOrders(orders);

  /*
    بعداً با API:
    این کلید لازم نیست.
    وضعیت پرداخت از API خوانده می‌شود.
  */
  localStorage.setItem("orderPaid", "true");

  /*
    فعلاً اطلاعات سفارش پرداخت‌شده را آپدیت می‌کنیم.

    بعداً با API:
    currentOrder باید از API دریافت شود.
  */
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
        /*
          بعداً با اضافه شدن API:
          این شرط باید حذف شود.

          PIN باید به API ارسال شود و پاسخ API بررسی شود.
        */
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

/*
  با کلیک روی View Order وارد صفحه سفارش‌ها می‌شویم.

  مسیر درست:
  src/5-checkout/pin.js
  src/6-order/order.html
*/
viewOrderButton?.addEventListener("click", function () {
  const currentOrder = getCurrentOrder();

  if (!currentOrder) {
    window.location.href = "../6-order/order.html";
    return;
  }

  /*
    فعلاً برای باز شدن تب درست در صفحه سفارش‌ها.

    active => تب Active
    completed => تب Completed

    بعداً با API:
    وضعیت سفارش باید از API گرفته شود.
  */
  localStorage.setItem("ordersCurrentTab", currentOrder.status);

  window.location.href = "../6-order/order.html";
});

viewReceiptButton?.addEventListener("click", function () {
  const currentOrder = getCurrentOrder();

  if (!currentOrder) return;

  /*
    بعداً با API:
    رسید باید از API دریافت شود.
    مثلاً API شماره رسید یا فایل PDF برگرداند.
  */
  alert(
    `Receipt

Order ID: ${currentOrder.id}
Order Status: ${currentOrder.status}
Payment Status: ${currentOrder.paymentStatus}
Payment Method: ${currentOrder.paymentMethod?.name || "Unknown"}
Paid At: ${currentOrder.paidAt}`
  );
});