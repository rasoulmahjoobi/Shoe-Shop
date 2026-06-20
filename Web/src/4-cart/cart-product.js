
const removeModal = document.getElementById("removeModal");
const cancelRemoveBtn = document.getElementById("cancelRemoveBtn");
const confirmRemoveBtn = document.getElementById("confirmRemoveBtn");

const modalProductImage = document.getElementById("modalProductImage");
const modalProductName = document.getElementById("modalProductName");
const modalProductInfo = document.getElementById("modalProductInfo");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductQuantity = document.getElementById("modalProductQuantity");

let selectedCartItem = null;

document.querySelectorAll("[data-remove-btn]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCartItem = button.closest(".cart-item");

    modalProductImage.src = button.dataset.image;
    modalProductName.textContent = button.dataset.name;
    modalProductInfo.textContent = button.dataset.info;
    modalProductPrice.textContent = button.dataset.price;
    modalProductQuantity.textContent = `- ${button.dataset.quantity} +`;

    removeModal.classList.remove("hidden");
    removeModal.classList.add("flex");
  });
});

function closeRemoveModal() {
  removeModal.classList.add("hidden");
  removeModal.classList.remove("flex");
  selectedCartItem = null;
}

cancelRemoveBtn.addEventListener("click", closeRemoveModal);

confirmRemoveBtn.addEventListener("click", () => {
  if (selectedCartItem) {
    selectedCartItem.remove();
  }

  closeRemoveModal();
});

removeModal.addEventListener("click", (event) => {
  if (event.target === removeModal) {
    closeRemoveModal();
  }
});