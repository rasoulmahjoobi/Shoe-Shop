//ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

const searchInput = document.getElementById("searchInput");

const recentSection = document.getElementById("recentSection");
const recentList = document.getElementById("recentList");
const clearAllButton = document.getElementById("clearAllButton");

const resultHeader = document.getElementById("resultHeader");
const resultText = document.getElementById("resultText");
const resultCount = document.getElementById("resultCount");

const productsSection = document.getElementById("productsSection");
const notFoundSection = document.getElementById("notFoundSection");

//   داده موقت محصولات

//   بعداً با API:
//   این آرایه باید حذف شود.

//   مثال دریافت محصولات از API:

//   async function getProducts(searchValue) {
//     const response = await fetch(
//       `https://your-api.com/products?search=${searchValue}`
//     );

//     const data = await response.json();

//     return data;
//   }
const products = [
    {
        id: 1,
        title: "K-Swiss Running Sneakers",
        price: 90,
        rating: 4.5,
        sold: "8,230 sold",
        image: "image-shoe-1.png",
    },
    {
        id: 2,
        title: "Adidas Running Sneakers",
        price: 105,
        rating: 4.8,
        sold: "7,450 sold",
        image: "image-shoe-2.png",
    },
    {
        id: 3,
        title: "Adidas Running Shoes",
        price: 80,
        rating: 4.5,
        sold: "5,997 sold",
        image: "image-shoe-3.png",
    },
    {
        id: 4,
        title: "RS-X Running Sneakers",
        price: 135,
        rating: 4.9,
        sold: "6,104 sold",
        image: "image-shoe-4.png",
    },
    {
        id: 5,
        title: "Nike Air Zoom Running",
        price: 120,
        rating: 4.7,
        sold: "3,480 sold",
        image: "image-shoe-1.png",
    },
    {
        id: 6,
        title: "Puma Sport Running Shoes",
        price: 110,
        rating: 4.6,
        sold: "2,980 sold",
        image: "image-shoe-2.png",
    },
];

// سرچ های اخیر
//   فعلاً از localStorage استفاده شده است.

//   بعداً با API:
//   اگر API بخش search history داشته باشد،
//   این اطلاعات باید از API دریافت و حذف شوند.

let recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [
        "Nike Wmnsphat Classic",
        "Puma Running Sneakers",
        "Nike Airforce 1",
        "Adidas Walking Sneakers",
        "K-Swiss Court Northam",
        "Nike Air Jordan XXXVI",
        "Fila Windshift 15",
        "Puma Suede Classic",
    ];

//   نمایش سرچ‌های اخیر
function renderRecentSearches() {
    if (recentSearches.length === 0) {
        recentList.innerHTML = `
      <p class="pt-5 text-center text-[12px] text-[#999999]">
        No recent searches
      </p>
    `;
        return;
    }

    recentList.innerHTML = recentSearches
        .map((search) => {
            return `
        <div class="flex items-center justify-between gap-3">
          <button
            type="button"
            data-recent-search="${search}"
            class="recent-search-btn min-w-0 truncate text-left text-[12px] text-[#777777]"
          >
            ${search}
          </button>

          <button
            type="button"
            data-delete-search="${search}"
            class="delete-search-btn flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#A5A5A5] text-[13px] leading-none text-[#777777]"
            aria-label="Delete recent search"
          >
            ×
          </button>
        </div>
      `;
        })
        .join("");

    /*
      کلیک روی یک سرچ اخیر
      همان عبارت داخل input قرار می‌گیرد و سرچ انجام می‌شود.
    */
    document.querySelectorAll(".recent-search-btn").forEach((button) => {
        button.addEventListener("click", function () {
            searchInput.value = this.dataset.recentSearch;

            searchProducts(searchInput.value);
        });
    });

    /*
      حذف فقط یک مورد از سرچ‌های اخیر
    */
    document.querySelectorAll(".delete-search-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const searchToDelete = this.dataset.deleteSearch;

            recentSearches = recentSearches.filter(
                (search) => search !== searchToDelete
            );

            localStorage.setItem(
                "recentSearches",
                JSON.stringify(recentSearches)
            );

            renderRecentSearches();
        });
    });
}

//   ذخیره عبارت سرچ شده

//   فعلاً localStorage

//   بعداً با API:
//   این بخش باید به API ارسال شود.
function saveRecentSearch(searchValue) {
    const cleanValue = searchValue.trim();

    if (!cleanValue) return;

    recentSearches = recentSearches.filter(
        (search) => search.toLowerCase() !== cleanValue.toLowerCase()
    );

    recentSearches.unshift(cleanValue);

    /*
      فقط 8 مورد آخر نگه داشته می‌شود
    */
    recentSearches = recentSearches.slice(0, 8);

    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

//   ساخت کارت محصول
function createProductCard(product) {
    return `
    <article class="min-w-0">
      <div
        class="relative flex h-[150px] items-center justify-center rounded-[13px] bg-[#F3F3F3]"
      >
        <img
          src="${product.image}"
          alt="${product.title}"
          class="max-h-[125px] max-w-[125px] object-contain"
        />

        <!-- دکمه favorite موقت -->
        <button
          type="button"
          class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#222222] text-[13px] text-white"
          aria-label="Add to favorite"
        >
          ♡
        </button>
      </div>

      <h3 class="mt-3 truncate text-[12px] font-semibold">
        ${product.title}
      </h3>

      <div class="mt-1 flex items-center gap-1 text-[10px] text-[#555555]">
        <span>★</span>
        <span>${product.rating}</span>
        <span>|</span>
        <span>${product.sold}</span>
      </div>

      <p class="mt-1 text-[14px] font-extrabold">$${product.price.toFixed(
        2
    )}</p>
    </article>
  `;
}

//   نمایش محصولات پیدا شده
function renderProducts(foundProducts, searchValue) {
    resultText.textContent = `Results for "${searchValue}"`;

    /*
      فعلاً تعداد از آرایه محصولات گرفته می‌شود.
  
      بعداً با API:
      اگر API تعداد کل نتایج را برگرداند،
      از مقدار total استفاده کن.
    */
    resultCount.textContent = `${foundProducts.length} founds`;

    productsSection.innerHTML = foundProducts
        .map((product) => createProductCard(product))
        .join("");

    productsSection.classList.remove("hidden");
    resultHeader.classList.remove("hidden");

    recentSection.classList.add("hidden");
    notFoundSection.classList.add("hidden");
}

//   نمایش حالت Not Found
function showNotFound() {
    recentSection.classList.add("hidden");
    resultHeader.classList.add("hidden");
    productsSection.classList.add("hidden");

    notFoundSection.classList.remove("hidden");
}

//   نمایش حالت Recent
function showRecent() {
    recentSection.classList.remove("hidden");

    resultHeader.classList.add("hidden");
    productsSection.classList.add("hidden");
    notFoundSection.classList.add("hidden");

    renderRecentSearches();
}

//   سرچ محصول

//   فعلاً سرچ از آرایه products انجام می‌شود.

//   بعداً با API:
//   کل این بخش باید با fetch جایگزین شود.

//   نمونه:

//   async function searchProducts(searchValue) {
//     const response = await fetch(
//       `https://your-api.com/products?search=${searchValue}`
//     );

//     const data = await response.json();

//     if (data.length === 0) {
//       showNotFound();
//       return;
//     }

//     renderProducts(data, searchValue);
//   }
function searchProducts(searchValue) {
    const cleanValue = searchValue.trim();

    /*
      اگر input خالی باشد حالت Recent نمایش داده می‌شود
    */
    if (!cleanValue) {
        showRecent();
        return;
    }

    const foundProducts = products.filter((product) =>
        product.title.toLowerCase().includes(cleanValue.toLowerCase())
    );

    /*
      ذخیره عبارت سرچ شده در recent searches
    */
    saveRecentSearch(cleanValue);

    /*
      اگر محصول پیدا نشود حالت Not Found
    */
    if (foundProducts.length === 0) {
        showNotFound();
        return;
    }

    /*
      اگر محصول پیدا شود حالت Results
    */
    renderProducts(foundProducts, cleanValue);
}

//   Event سرچ هنگام تایپ

//   بعداً با API:
//   بهتر است debounce اضافه شود
//   تا با هر حرف درخواست API ارسال نشود.
// 
searchInput.addEventListener("input", function () {
    searchProducts(this.value);
});

//   پاک کردن همه سرچ‌های اخیر
clearAllButton.addEventListener("click", function () {
    recentSearches = [];

    /*
      فعلاً پاک کردن localStorage
  
      بعداً با API:
      درخواست DELETE برای پاک کردن history ارسال شود.
    */
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

    renderRecentSearches();
});

/*
  شروع صفحه:
  چون input در ابتدا خالی است،
  حالت Recent نمایش داده می‌شود.
*/
showRecent();