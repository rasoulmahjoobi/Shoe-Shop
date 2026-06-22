//ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

// گرفتن کانتینر محصولات
const popularProductList = document.getElementById("popular-product-list");

const brandButtons = document.querySelectorAll("[data-brand]");

// فعال کردن pagination
const loadMoreBtn = document.getElementById("load-more-btn");
let page = 1;
const limit = 6;
let currentBrand = "all";

//برای فعال کردن دکمه های برند بالای صفحه
const activeClass = "bg-black text-white border-black";
const inactiveClass = "bg-white text-black border-black";

//تابع برای فعال کردن دکمه ها
function setActiveButton(clickedButton) {
  brandButtons.forEach((button) => {
    button.classList.remove("bg-black", "text-white");

    button.classList.add("bg-white", "text-black");
  });

  clickedButton.classList.remove("bg-white", "text-black");

  clickedButton.classList.add("bg-black", "text-white");
}

// گرفتن محصولات محبوب از api
async function getPopularProducts(brand = currentBrand) {
  try {
    let url =
      `http://localhost:3000/products?popular=true` +
      `&_page=${page}` +
      `&_per_page=${limit}`;

    if (brand !== "all") {
      url += `&brand=${brand}`;
    }

    const response = await fetch(url);

    const data = await response.json();

    renderProducts(data.data);

    currentBrand = brand;

    if (page >= data.pages) {
      loadMoreBtn.classList.add("hidden");
    } else {
      loadMoreBtn.classList.remove("hidden");
    }
  } catch (error) {
    console.error(error);
  }
}

// نمایش محصولات در صفحه
function renderProducts(products) {
  products.forEach((product) => {
    popularProductList.insertAdjacentHTML(
      "beforeend",
      `
      <div
      class="flex flex-col items-center py-3 w-full"
      onclick="window.location.href='../card/card.html?id=${product.id}'"
      >
        <div
          class="relative bg-gray-100 flex items-center justify-center w-44 h-44 rounded-2xl overflow-hidden"
        >

          ${
            product.qty === 0
              ? `
            <span class="absolute top-3 right-[-25px] rotate-45 bg-red-600 text-white text-[9px] font-bold w-28 pl-6 py-[3px] mt-2 shadow-lg">
              OUT OF STOCK
            </span>
          `
              : ""
          }

          <img
            class="w-32 h-auto"
            src="${product.image}"
            alt="${product.title}"
          />
        </div>

        <div class="w-44 text-left flex flex-col gap-1 mt-3">
          <h1 class="text-xl font-bold truncate">
            ${product.title}
          </h1>

          <p>$${product.price}</p>
        </div>
      </div>
      `,
    );
  });
}

//فعال کردن کلیک روی برندها
brandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const brand = button.dataset.brand;

    setActiveButton(button);

    currentBrand = brand;

    page = 1;

    popularProductList.innerHTML = "";

    getPopularProducts(brand);
  });
});

//فعال کردن دکمه برای pagination
loadMoreBtn.addEventListener("click", () => {
  page++;

  getPopularProducts(currentBrand);
});

// اجرای اولیه
getPopularProducts();
