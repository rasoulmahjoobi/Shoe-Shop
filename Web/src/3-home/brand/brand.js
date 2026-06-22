//ساخت navbar
import { navbar } from "../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

//گرفتن نام برند از آدرس صفحه
//مثال:
//brand.html?brand=Nike
const params = new URLSearchParams(window.location.search);
const brand = params.get("brand");

//گرفتن المنت های مورد نیاز از html
const brandProductList = document.getElementById("brandBase-product-list");
const brandName = document.getElementById("brand-name");
const loadMoreBtn = document.getElementById("load-more-btn");

//متغیرهای مربوط به pagination
//page شماره صفحه فعلی
//limit تعداد محصولی که هر بار از سرور میگیریم
let page = 1;
const limit = 4;

//تابع گرفتن محصولات از json-server
async function getProducts() {
  try {
    //درخواست به سرور
    //فقط محصولات برند انتخاب شده را میگیرد
    //و به صورت صفحه بندی شده برمیگرداند
    const response = await fetch(
      `http://localhost:3000/products?brand=${brand}&_page=${page}&_per_page=${limit}`,
    );

    //تبدیل پاسخ سرور به json
    const data = await response.json();

    //ارسال لیست محصولات برای نمایش در صفحه
    renderProducts(data.data);

    //اگر به آخرین صفحه رسیدیم
    //دکمه Load More مخفی شود
    if (page >= data.pages) {
      loadMoreBtn.style.display = "none";
    }
  } catch (err) {
    //نمایش خطا در کنسول
    console.log(err);
  }
}

//تابع نمایش محصولات روی صفحه
function renderProducts(products) {
  //نمایش نام برند در هدر صفحه
  brandName.textContent = brand;

  //ساخت کارت هر محصول و اضافه کردن آن به صفحه
  products.forEach((product) => {
    brandProductList.innerHTML += `
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

//وقتی روی دکمه Load More کلیک شود
loadMoreBtn.addEventListener("click", () => {
  //رفتن به صفحه بعد
  page++;

  //گرفتن محصولات صفحه جدید
  getProducts();
});

//اجرای اولیه صفحه
//با باز شدن صفحه اولین محصولات نمایش داده میشوند
getProducts();
