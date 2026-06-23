const paymentCards = document.querySelectorAll(".payment-card");
const confirmPaymentButton = document.getElementById("confirmPaymentButton");

let selectedPayment = {
  name: "My Wallet",
  balance: "9379",
};

paymentCards.forEach((card) => {
  card.addEventListener("click", function () {
    selectedPayment = {
      name: this.dataset.name,
      balance: this.dataset.balance || "",
      card: this.dataset.card || "",
    };

    paymentCards.forEach((item) => {
      item.querySelector(".radio").innerHTML = "";
    });

    this.querySelector(".radio").innerHTML = `
      <span class="h-5 w-5 rounded-full bg-[#111111]"></span>
    `;
  });
});

function generateCartHash(cart) {
  return JSON.stringify(
    cart.map((i) => ({
      id: i.id,
      qty: i.quantity,
    })),
  );
}

confirmPaymentButton.addEventListener("click", function () {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  if (!selectedPayment || !selectedPayment.name) {
    alert("Please select a payment method");
    return;
  }

  //------------------------------------------------------------------------------
  //بعد از کلی تست کردن این قسمت که مربوط به جلوگیری از پرداخت دوباره سفارش بود درست نشد
  //------------------------------------------------------------------------------

  // const cartHash = generateCartHash(cart);
  // const lastPaidCart = localStorage.getItem("lastPaidCart");

  // // اگر همین cart قبلا پرداخت شده
  // if (lastPaidCart === cartHash) {
  //   alert("This cart has already been paid.");
  //   return;
  // }

  const orderData = {
    id: Date.now(),
    paymentMethod: selectedPayment,
    address: JSON.parse(localStorage.getItem("selectedAddress")) || null,
    shipping: JSON.parse(localStorage.getItem("selectedShipping")) || null,
    cartItems: cart,
    discountPercent: Number(localStorage.getItem("discountPercent")) || 0,
    createdAt: new Date().toLocaleString(),
    status: "pending",
  };

  localStorage.setItem("currentOrder", JSON.stringify(orderData));

  window.location.href = "../enter-pin/enter-pin.html";
});
