// ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

//  DOM
const searchInput = document.getElementById("searchInput");

const recentSection = document.getElementById("recentSection");
const recentList = document.getElementById("recentList");
const clearAllButton = document.getElementById("clearAllButton");

const resultHeader = document.getElementById("resultHeader");
const resultText = document.getElementById("resultText");
const resultCount = document.getElementById("resultCount");

const productsSection = document.getElementById("productsSection");
const notFoundSection = document.getElementById("notFoundSection");

//  API
async function fetchProducts(searchValue) {
  const res = await fetch(`http://localhost:3000/products`);

  const data = await res.json();

  const clean = searchValue.trim().toLowerCase();

  return data.filter((p) => p.title.toLowerCase().includes(clean));
}
//  Recent Search (localStorage)
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

function saveRecentSearch(searchValue) {
  const cleanValue = searchValue.trim();
  if (!cleanValue) return;

  recentSearches = recentSearches.filter(
    (s) => s.toLowerCase() !== cleanValue.toLowerCase(),
  );

  recentSearches.unshift(cleanValue);
  recentSearches = recentSearches.slice(0, 8);

  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

//  UI: Recent
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
    .map(
      (search) => `
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
            class="delete-search-btn flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#A5A5A5] text-[13px] text-[#777777]"
          >
            ×
          </button>
        </div>
      `,
    )
    .join("");

  document.querySelectorAll(".recent-search-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      searchInput.value = this.dataset.recentSearch;
      searchProducts(searchInput.value);
    });
  });

  document.querySelectorAll(".delete-search-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const value = this.dataset.deleteSearch;

      recentSearches = recentSearches.filter((s) => s !== value);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

      renderRecentSearches();
    });
  });
}

//  Product Card
function createProductCard(product) {
  return `
    <article class="min-w-0">
      <div class="relative flex h-[150px] items-center justify-center rounded-[13px] bg-[#F3F3F3]">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="max-h-[125px] max-w-[125px] object-contain"
        />

        <button
          type="button"
          class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#222222] text-white"
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

      <p class="mt-1 text-[14px] font-extrabold">
        $${Number(product.price).toFixed(2)}
      </p>
    </article>
  `;
}

//  UI States
function showRecent() {
  recentSection.classList.remove("hidden");
  resultHeader.classList.add("hidden");
  productsSection.classList.add("hidden");
  notFoundSection.classList.add("hidden");

  renderRecentSearches();
}

function showNotFound() {
  recentSection.classList.add("hidden");
  resultHeader.classList.add("hidden");
  productsSection.classList.add("hidden");
  notFoundSection.classList.remove("hidden");
}

function renderProducts(products, searchValue) {
  resultText.textContent = `Results for "${searchValue}"`;
  resultCount.textContent = `${products.length} found`;

  productsSection.innerHTML = products
    .map((p) => createProductCard(p))
    .join("");

  recentSection.classList.add("hidden");
  notFoundSection.classList.add("hidden");
  resultHeader.classList.remove("hidden");
  productsSection.classList.remove("hidden");
}

//  Search (API)
async function searchProducts(searchValue) {
  const cleanValue = searchValue.trim();

  if (!cleanValue) {
    showRecent();
    return;
  }

  try {
    const data = await fetchProducts(cleanValue);

    saveRecentSearch(cleanValue);

    if (!data || data.length === 0) {
      showNotFound();
      return;
    }

    renderProducts(data, cleanValue);
  } catch (err) {
    console.error(err);
    showNotFound();
  }
}

//  Debounce
function debounce(fn, delay = 400) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

//  Events
searchInput.addEventListener(
  "input",
  debounce(function () {
    searchProducts(this.value);
  }, 400),
);

clearAllButton.addEventListener("click", function () {
  recentSearches = [];
  localStorage.setItem("recentSearches", JSON.stringify([]));
  renderRecentSearches();
});

//  Init
showRecent();
