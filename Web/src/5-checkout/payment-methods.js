      const paymentCards = document.querySelectorAll(".payment-card");
      const confirmPaymentButton = document.getElementById(
        "confirmPaymentButton"
      );

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
            const radio = item.querySelector(".radio");
            radio.innerHTML = "";
          });

          const selectedRadio = this.querySelector(".radio");

          selectedRadio.innerHTML = `
            <span class="h-5 w-5 rounded-full bg-[#111111]"></span>
          `;
        });
      });

confirmPaymentButton.addEventListener("click", function () {
  const alreadyPaid = localStorage.getItem("orderPaid");

  if (alreadyPaid === "true") {
    alert("This order has already been paid.");
    return;
  }

  const orderData = {
    id: Date.now(),
    paymentMethod: selectedPayment,
    address: JSON.parse(localStorage.getItem("selectedAddress")) || null,
    shipping: JSON.parse(localStorage.getItem("selectedShipping")) || null,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    discountPercent: Number(localStorage.getItem("discountPercent")) || 0,
    createdAt: new Date().toLocaleString(),
    status: "pending",
  };

  localStorage.setItem("currentOrder", JSON.stringify(orderData));

  window.location.href = "enter-pin.html";
});
