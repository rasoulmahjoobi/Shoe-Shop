//ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

//product-list
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");
  const loadMoreBtn = document.getElementById("load-more-btn");

  let page = 1;
  const limit = 4;

  //ساخت لیست محصولات
  async function getProducts() {
    try {
      const response = await fetch(
        `http://localhost:3000/products?_page=${page}&_per_page=${limit}`,
      );
      const data = await response.json();

      renderProducts(data.data);

      //حذف دکمه loadMore
      if (data.data.length < limit) {
        loadMoreBtn.style.display = "none";
      }
    } catch (err) {
      console.log(err);
    }
  }

  //ساختار لیست محصولات
  function renderProducts(products) {
    products.forEach((product) => {
      container.innerHTML += `
      <div
      class="flex flex-col items-center py-3 w-full"
      onclick="window.location.href='../card/card.html?id=${product.id}'"
      >
        <div class="relative bg-gray-100 flex items-center justify-center w-44 h-44 rounded-2xl overflow-hidden">

          ${
            product.qty === 0
              ? `
            <span class="absolute top-3 right-[-25px] rotate-45 bg-red-600 text-white text-[9px] font-bold w-28 pl-6 py-[3px] mt-2 shadow-lg">
              OUT OF STOCK
            </span>
          `
              : ""
          }

          <img class="w-full h-full object-contain" src="${product.image}" />
        </div>

        <div class="w-44 text-left flex flex-col gap-1 mt-3">
          <h1 class="text-xl font-bold truncate">
            ${product.title}
          </h1>

          <p>$ ${product.price}</p>
        </div>
      </div>
    `;
    });
  }

  getProducts();

  //فعال کردن دکمه loadMore
  loadMoreBtn.addEventListener("click", () => {
    page++;
    getProducts();
  });
});
