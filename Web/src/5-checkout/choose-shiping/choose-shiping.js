const shippingCards = document.querySelectorAll(".shipping-card");
const applyShippingButton = document.getElementById("applyShippingButton");

let selectedShipping = {
  name: "Regular",
  price: 15,
  arrival: "Estimated Arrival, Dec 20-22",
};

shippingCards.forEach((card) => {
  card.addEventListener("click", function () {
    selectedShipping = {
      name: this.dataset.name,
      price: this.dataset.price,
      arrival: this.dataset.arrival,
    };

    shippingCards.forEach((item) => {
      item.querySelector(".radio").innerHTML = "";
    });

    this.querySelector(".radio").innerHTML =
      '<span class="h-5 w-5 rounded-full bg-[#111111]"></span>';
  });
});

applyShippingButton.addEventListener("click", function () {
  localStorage.setItem("selectedShipping", JSON.stringify(selectedShipping));

  window.location.href = "../checkout/checkout.html";
});
