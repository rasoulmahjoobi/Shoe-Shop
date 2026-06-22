//ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

//فعال کردن pagination
// شماره صفحه فعلی
let page = 1;
// تعداد محصول در هر بار نمایش
const limit = 6;
const loadMoreBtn = document.getElementById("load-more-btn");

// گرفتن دکمه های برند
const brandButtons = document.querySelectorAll(".brand-btn");

// برند انتخاب شده
let currentBrand = "All";

// گرفتن المنت لیست محصولات
const wishlistContainer = document.getElementById("wishlist-container");

// گرفتن wishlist از localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// رندر کردن لیست
function renderWishlist() {
  wishlistContainer.innerHTML = "";

  // فیلتر محصولات بر اساس برند انتخاب شده
  const filteredWishlist =
    currentBrand === "All"
      ? wishlist
      : wishlist.filter((product) => product.brand === currentBrand);

  // محصولات قابل نمایش در صفحه فعلی
  const paginatedWishlist = filteredWishlist.slice(0, page * limit);

  // اگر محصولی وجود نداشت
  if (filteredWishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <p class="text-center col-span-2 text-gray-500 mt-10">
        Wishlist is empty 💔
      </p>
    `;

    loadMoreBtn.classList.add("hidden");
    return;
  }

  paginatedWishlist.forEach((product) => {
    wishlistContainer.innerHTML += `
      <div
        class="flex flex-col items-center py-3 w-full cursor-pointer"
        onclick="window.location.href='../card/card.html?id=${product.id}'"
      >
        <div class="bg-gray-100 flex items-center justify-center w-44 h-44 rounded-2xl relative overflow-hidden">

          <!-- قلب -->
          <button
            onclick="event.stopPropagation(); removeFromWishlist(${product.id})"
            class="bg-black rounded-full p-2 inline-flex absolute top-4 right-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5z"/>
            </svg>
          </button>

          <img
            class="w-32 h-auto object-contain"
            src="${product.image}"
          />
        </div>

        <div class="w-44 text-left flex flex-col gap-1 mt-3">

          <h1 class="text-xl font-bold truncate">
            ${product.title}
          </h1>

          <div class="flex items-center gap-2">
            <span class="text-sm text-slate-500">
              ${product.rating || 4.5}
            </span>

            <span class="text-xs font-bold">|</span>

            <button class="text-sm bg-slate-300 rounded-md px-3">
              ${product.sold || 0} sold
            </button>
          </div>

          <p class="font-bold">$ ${product.price}</p>
        </div>
      </div>
    `;
  });

  // مدیریت نمایش دکمه لود بیشتر
  if (paginatedWishlist.length >= filteredWishlist.length) {
    loadMoreBtn.classList.add("hidden");
  } else {
    loadMoreBtn.classList.remove("hidden");
  }
}

// فعال کردن دکمه برندها
brandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentBrand = button.dataset.brand;

    // برگشت به صفحه اول pagination
    page = 1;

    // حذف حالت فعال از همه دکمه ها
    brandButtons.forEach((btn) => {
      btn.classList.remove("bg-black", "text-white");
    });

    // فعال کردن دکمه انتخاب شده
    button.classList.add("bg-black", "text-white");

    // رندر مجدد محصولات
    renderWishlist();
  });
});

// حذف از wishlist
window.removeFromWishlist = function (id) {
  wishlist = wishlist.filter((item) => item.id !== id);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlist();
};

// فعال بودن اولیه دکمه All
document
  .querySelector('[data-brand="All"]')
  .classList.add("bg-black", "text-white");

// نمایش محصولات بیشتر
loadMoreBtn.addEventListener("click", () => {
  page++;
  renderWishlist();
});

// اجرا
renderWishlist();
