const pinKeys = document.querySelectorAll(".pin-key");
const pinDots = document.querySelectorAll(".pin-dot");
const deletePin = document.getElementById("deletePin");
const successModal = document.getElementById("successModal");
const viewReceiptButton = document.getElementById("viewReceiptButton");

let pin = "";

/*
  PIN موقت پروژه است.
  بعداً باید از API بررسی شود.
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

function completePayment() {
  const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));

  if (!currentOrder) {
    window.location.href = "checkout.html";
    return;
  }

  /*
    این بخش بعداً باید با API پرداخت جایگزین شود.
    فعلاً فقط پرداخت را در localStorage ثبت می‌کنیم.
  */
  currentOrder.status = "paid";
  currentOrder.paidAt = new Date().toLocaleString();

  localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  localStorage.setItem("orderPaid", "true");

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const orderAlreadyExists = orders.some(
    (order) => order.id === currentOrder.id
  );

  if (!orderAlreadyExists) {
    orders.push(currentOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
  }

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

deletePin.addEventListener("click", function () {
  pin = pin.slice(0, -1);

  updatePinDots();
});

viewReceiptButton.addEventListener("click", function () {
  const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));

  if (!currentOrder) return;

  alert(
    `Receipt\n\nOrder ID: ${currentOrder.id}\nStatus: ${currentOrder.status}\nPayment: ${currentOrder.paymentMethod.name}`
  );
});