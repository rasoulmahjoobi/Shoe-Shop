// باید به فایل‌هایی که نیاز دارند وصل شود

export const navbar = () => {
  const currentPath = window.location.pathname;

  const isHome = currentPath.includes("home.html");
  const isCart = currentPath.includes("cart-product.html");
  const isOrders = currentPath.includes("order.html");

  window.goToHome = () => {
    window.location.href="/Web/src/3-home/home/home.html";
  };

  window.goToCart = () => {
    window.location.href = "/Web/src/4-cart/cart-product.html";
  };

  window.goToOrders = () => {
    window.location.href = "/Web/src/6-order/order.html";
  };

  return `
    <nav class="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-100">
      <div class="flex justify-evenly items-center h-16">

        <!-- Home -->
        <div class="flex flex-col items-center">
          <button
            onclick="goToHome()"
            class="${
              isHome
                ? "bg-black rounded-xl px-3 py-1"
                : "group rounded-xl px-3 py-1 transition-all duration-200 hover:bg-black"
            } flex flex-col items-center"
          >
            <svg
              class="${
                isHome
                  ? "text-white"
                  : "text-gray-800 group-hover:text-white"
              }"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>

            <span
              class="${
                isHome
                  ? "text-white"
                  : "text-gray-700 group-hover:text-white"
              } text-sm font-semibold"
            >
              Home
            </span>
          </button>
        </div>

        <!-- Cart -->
        <div class="flex flex-col items-center">
          <button
            onclick="goToCart()"
            class="${
              isCart
                ? "bg-black rounded-xl px-3 py-1"
                : "group rounded-xl px-3 py-1 transition-all duration-200 hover:bg-black"
            } flex flex-col items-center"
          >
            <svg
              class="${
                isCart
                  ? "text-white"
                  : "text-gray-800 group-hover:text-white"
              }"
              width="20"
              height="21"
              viewBox="0 0 21 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 1.5C11.4946 1.5 12.4484 1.89509 13.1517 2.59835C13.8549 3.30161 14.25 4.25544 14.25 5.25V6H6.75V5.25C6.75 4.25544 7.14509 3.30161 7.84835 2.59835C8.55161 1.89509 9.50544 1.5 10.5 1.5ZM15.75 6V5.25C15.75 3.85761 15.1969 2.52226 14.2123 1.53769C13.2277 0.553123 11.8924 0 10.5 0C9.10761 0 7.77226 0.553123 6.78769 1.53769C5.80312 2.52226 5.25 3.85761 5.25 5.25V6H0V21C0 21.7956 0.316071 22.5587 0.87868 23.1213C1.44129 23.6839 2.20435 24 3 24H18C18.7956 24 19.5587 23.6839 20.1213 23.1213C20.6839 22.5587 21 21.7956 21 21V6H15.75ZM1.5 7.5H19.5V21C19.5 21.3978 19.342 21.7794 19.0607 22.0607C18.7794 22.342 18.3978 22.5 18 22.5H3C2.60218 22.5 2.22064 22.342 1.93934 22.0607C1.65804 21.7794 1.5 21.3978 1.5 21V7.5Z"
                fill="currentColor"
              />
            </svg>

            <span
              class="${
                isCart
                  ? "text-white"
                  : "text-gray-700 group-hover:text-white"
              } text-sm font-semibold"
            >
              Cart
            </span>
          </button>
        </div>

        <!-- Orders -->
        <div class="flex flex-col items-center">
          <button
            onclick="goToOrders()"
            class="${
              isOrders
                ? "bg-black rounded-xl px-3 py-1"
                : "group rounded-xl px-3 py-1 transition-all duration-200 hover:bg-black"
            } flex flex-col items-center"
          >
            <svg
              class="${
                isOrders
                  ? "text-white"
                  : "text-gray-800 group-hover:text-white"
              }"
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.75C0 0.551088 0.0790176 0.360322 0.21967 0.21967C0.360322 0.0790178 0.551088 0 0.75 0H3C3.1673 4.62172e-05 3.32978 0.056026 3.4616 0.159037C3.59342 0.262048 3.68701 0.406176 3.7275 0.5685L4.335 3H21.75C21.8639 3.00003 21.9763 3.02602 22.0787 3.07598C22.1811 3.12594 22.2708 3.19857 22.3409 3.28836C22.411 3.37814 22.4598 3.48272 22.4834 3.59416C22.5071 3.7056 22.5051 3.82096 22.4775 3.9315L20.2275 12.9315C20.187 13.0938 20.0934 13.238 19.9616 13.341C19.8298 13.444 19.6673 13.5 19.5 13.5H6C5.8327 13.5 5.67022 13.444 5.5384 13.341C5.40658 13.238 5.31299 13.0938 5.2725 12.9315L2.415 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790176 1.13968 0 0.948912 0 0.75ZM4.71 4.5L6.585 12H18.915L20.79 4.5H4.71ZM7.5 16.5C7.10218 16.5 6.72064 16.658 6.43934 16.9393C6.15804 17.2206 6 17.6022 6 18C6 18.3978 6.15804 18.7794 6.43934 19.0607C6.72064 19.342 7.10218 19.5 7.5 19.5C7.89782 19.5 8.27936 19.342 8.56066 19.0607C8.84196 18.7794 9 18.3978 9 18C9 17.6022 8.84196 17.2206 8.56066 16.9393C8.27936 16.658 7.89782 16.5 7.5 16.5ZM4.5 18C4.5 17.2044 4.81607 16.4413 5.37868 15.8787C5.94129 15.3161 6.70435 15 7.5 15C8.29565 15 9.05871 15.3161 9.62132 15.8787C10.1839 16.4413 10.5 17.2044 10.5 18C10.5 18.7956 10.1839 19.5587 9.62132 20.1213C9.05871 20.6839 8.29565 21 7.5 21C6.70435 21 5.94129 20.6839 5.37868 20.1213C4.81607 19.5587 4.5 18.7956 4.5 18ZM18 16.5C17.6022 16.5 17.2206 16.658 16.9393 16.9393C16.658 17.2206 16.5 17.6022 16.5 18C16.5 18.3978 16.658 18.7794 16.9393 19.0607C17.2206 19.342 17.6022 19.5 18 19.5C18.3978 19.5 18.7794 19.342 19.0607 19.0607C19.342 18.7794 19.5 18.3978 19.5 18C19.5 17.6022 19.342 17.2206 19.0607 16.9393C18.7794 16.658 18.3978 16.5 18 16.5ZM15 18C15 17.2044 15.3161 16.4413 15.8787 15.8787C16.4413 15.3161 17.2044 15 18 15C18.7956 15 19.5587 15.3161 20.1213 15.8787C20.6839 16.4413 21 17.2044 21 18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21C17.2044 21 16.4413 20.6839 15.8787 20.1213C15.3161 19.5587 15 18.7956 15 18Z"
                fill="currentColor"
              />
            </svg>

            <span
              class="${
                isOrders
                  ? "text-white"
                  : "text-gray-700 group-hover:text-white"
              } text-sm font-semibold"
            >
              Orders
            </span>
          </button>
        </div>

        <!-- Wallet -->
        <div class="flex flex-col items-center">
          <button
            class="group flex flex-col items-center rounded-xl px-3 py-1 transition-all duration-200 hover:bg-black"
          >
            <svg
              class="text-gray-700 group-hover:text-white"
              width="24"
              height="23"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.204 0.0672533C18.5356 -0.0156915 18.8817 -0.0219995 19.2161 0.0488083C19.5505 0.119616 19.8644 0.265678 20.1339 0.475907C20.4034 0.686135 20.6214 0.955003 20.7715 1.2621C20.9216 1.5692 20.9997 1.90645 21 2.24825V4.07825H21.75C22.3467 4.07825 22.919 4.31531 23.341 4.73726C23.7629 5.15922 24 5.73152 24 6.32825V19.8283C24 20.425 23.7629 20.9973 23.341 21.4192C22.919 21.8412 22.3467 22.0783 21.75 22.0783H2.25C1.65326 22.0783 1.08097 21.8412 0.65901 21.4192C0.237053 20.9973 1.47137e-07 20.425 1.47137e-07 19.8283V6.32825C-0.000209191 5.74903 0.222964 5.19205 0.623066 4.77322C1.02317 4.3544 1.56938 4.10601 2.148 4.07975L18.204 0.0672533Z"
                fill="currentColor"
              />
            </svg>
            <span class="text-sm font-semibold text-gray-700 group-hover:text-white">
              Wallet
            </span>
          </button>
        </div>

        <!-- Profile -->
        <div class="flex flex-col items-center">
          <button
            class="group flex flex-col items-center rounded-xl px-3 py-1 transition-all duration-200 hover:bg-black"
          >
            <svg
              class="text-gray-700 group-hover:text-white"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9ZM18 16.5C18 18 16.5 18 16.5 18H1.5C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5Z"
                fill="currentColor"
              />
            </svg>
            <span class="text-sm font-semibold text-gray-700 group-hover:text-white">
              Profile
            </span>
          </button>
        </div>

      </div>
    </nav>
  `;
};