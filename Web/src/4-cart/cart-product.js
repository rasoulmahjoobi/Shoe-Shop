const removeModal = document.getElementById("removeModal");
const cancelRemoveBtn = document.getElementById("cancelRemoveBtn");
const confirmRemoveBtn = document.getElementById("confirmRemoveBtn");

const modalProductImage = document.getElementById("modalProductImage");
const modalProductName = document.getElementById("modalProductName");
const modalProductInfo = document.getElementById("modalProductInfo");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductQuantity = document.getElementById("modalProductQuantity");

let selectedCartItem = null;

function openRemoveModal(cartItem) {
  const removeButton = cartItem.querySelector("[data-remove-btn]");
  const quantityElement = cartItem.querySelector(".quantity-value");

  selectedCartItem = cartItem;

  modalProductImage.src = removeButton.dataset.image;
  modalProductName.textContent = removeButton.dataset.name;
  modalProductInfo.textContent = removeButton.dataset.info;
  modalProductPrice.textContent = removeButton.dataset.price;
  modalProductQuantity.textContent = `- ${quantityElement.textContent} +`;

  removeModal.classList.remove("hidden");
  removeModal.classList.add("flex");
}

function closeRemoveModal() {
  removeModal.classList.add("hidden");
  removeModal.classList.remove("flex");
  selectedCartItem = null;
}

/* دکمه سطل زباله */
document.querySelectorAll("[data-remove-btn]").forEach((button) => {
  button.addEventListener("click", () => {
    openRemoveModal(button.closest(".cart-item"));
  });
});

/* دکمه منفی */
document.querySelectorAll(".quantity-minus").forEach((button) => {
  button.addEventListener("click", () => {
    const cartItem = button.closest(".cart-item");
    const quantityElement = cartItem.querySelector(".quantity-value");
    const quantity = Number(quantityElement.textContent);

    if (quantity === 1) {
      openRemoveModal(cartItem);
      return;
    }

    quantityElement.textContent = quantity - 1;
  });
});

/* دکمه مثبت */
document.querySelectorAll(".quantity-plus").forEach((button) => {
  button.addEventListener("click", () => {
    const cartItem = button.closest(".cart-item");
    const quantityElement = cartItem.querySelector(".quantity-value");

    quantityElement.textContent = Number(quantityElement.textContent) + 1;
  });
});

/* دکمه‌های مدال */
cancelRemoveBtn.addEventListener("click", closeRemoveModal);

confirmRemoveBtn.addEventListener("click", () => {
  if (selectedCartItem) {
    selectedCartItem.remove();
  }

  closeRemoveModal();
});

/* بستن مدال با کلیک بیرون آن */
removeModal.addEventListener("click", (event) => {
  if (event.target === removeModal) {
    closeRemoveModal();
  }
});