  //  Shipping Address
const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

const selectedAddressName = document.getElementById("selectedAddressName");
const selectedAddressText = document.getElementById("selectedAddressText");

if (savedAddress && selectedAddressName && selectedAddressText) {
  selectedAddressName.textContent = savedAddress.name;
  selectedAddressText.textContent = savedAddress.address;
}

  //  Temporary Cart Products
  //  محصولات موقت برای صفحه Checkout

  //  فعلاً چون محصولات از صفحه Cart یا API دریافت نمی‌شوند،
  //  این دو محصول به صورت موقت داخل localStorage ذخیره می‌شوند.

  //  بعداً وقتی Cart و API کامل شد،
  //  کل این بخش را حذف کن و به جای آن محصولات واقعی را
  //  از localStorage یا API دریافت کن.
if (!localStorage.getItem("cartItems")) {
  const temporaryCartItems = [
    {
      id: 1,
      title: "Air Jordan 3 Retro",
      price: 105,
      quantity: 1,
      image: "image-shoe-3.png",
      color: "Black",
      size: 42,
    },
    {
      id: 2,
      title: "Running Sportwear",
      price: 240,
      quantity: 2,
      image: "image-shoe-2.png",
      color: "Silver",
      size: 41,
    },
  ];
// بعد از ساخت api این قسمت نباید تغییر کند
  localStorage.setItem("cartItems", JSON.stringify(temporaryCartItems));
}

  //  Cart Amount
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const amount = cartItems.reduce((total, item) => {
  const price = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 1;

  return total + price * quantity;
}, 0);

  //  Shipping
const selectedShipping = JSON.parse(
  localStorage.getItem("selectedShipping")
);

const shippingAmount = selectedShipping
  ? Number(selectedShipping.price) || 0
  : 0;

const shippingType = document.getElementById("selectedShippingType");
const shippingArrival = document.getElementById(
  "selectedShippingArrival"
);
const selectedShippingPrice = document.getElementById(
  "selectedShippingPrice"
);

if (selectedShipping && shippingType && shippingArrival && selectedShippingPrice) {
  shippingType.textContent = selectedShipping.name;

  shippingArrival.textContent = selectedShipping.arrival;
  shippingArrival.classList.remove("hidden");

  selectedShippingPrice.textContent = `$${shippingAmount.toFixed(2)}`;
  selectedShippingPrice.classList.remove("hidden");
}

  //  Promo / Discount
const promoBadge = document.getElementById("promoBadge");
const promoText = document.getElementById("promoText");
const removePromoButton = document.getElementById("removePromoButton");
const addPromoButton = document.getElementById("addPromoButton");

const discountRow = document.getElementById("discountRow");
const discountLabel = document.getElementById("discountLabel");
const discountPrice = document.getElementById("discountPrice");

const amountPrice = document.getElementById("amountPrice");
const shippingPrice = document.getElementById("shippingPrice");
const totalPrice = document.getElementById("totalPrice");

/*
  اگر برای اولین بار Checkout باز شود،
  تخفیف 20 درصد فعال می‌شود.
*/
if (localStorage.getItem("discountPercent") === null) {
  localStorage.setItem("discountPercent", "20");
}

let discountPercent = Number(
  localStorage.getItem("discountPercent")
);

  //  Calculate + Update UI
function updateCheckoutPrices() {
  const discountAmount = amount * (discountPercent / 100);

  const totalAmount = amount - discountAmount + shippingAmount;

  /* Amount */
  if (amountPrice) {
    amountPrice.textContent = `$${amount.toFixed(2)}`;
  }

  /* Shipping */
  if (shippingPrice) {
    shippingPrice.textContent = selectedShipping
      ? `$${shippingAmount.toFixed(2)}`
      : "-";
  }

  /* Discount badge + discount row */
  if (discountPercent > 0) {
    if (promoBadge) {
      promoBadge.classList.remove("hidden");
    }

    if (discountRow) {
      discountRow.classList.remove("hidden");
    }

    if (promoText) {
      promoText.textContent = `Discount ${discountPercent}% Off`;
    }

    if (discountLabel) {
      discountLabel.textContent = `Discount (${discountPercent}%)`;
    }

    if (discountPrice) {
      discountPrice.textContent = `-$${discountAmount.toFixed(2)}`;
    }
  } else {
    if (promoBadge) {
      promoBadge.classList.add("hidden");
    }

    if (discountRow) {
      discountRow.classList.add("hidden");
    }
  }

  /* Total */
  if (totalPrice) {
    totalPrice.textContent = `$${totalAmount.toFixed(2)}`;
  }
}

  //  Remove Discount
if (removePromoButton) {
  removePromoButton.addEventListener("click", function () {
    discountPercent = 0;

    localStorage.setItem("discountPercent", "0");

    updateCheckoutPrices();
  });
}

  //  Add Discount Again
if (addPromoButton) {
  addPromoButton.addEventListener("click", function () {
    discountPercent = 20;

    localStorage.setItem("discountPercent", "20");

    updateCheckoutPrices();
  });
}

  //  First Page Load
updateCheckoutPrices();