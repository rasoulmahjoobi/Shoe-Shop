const addressList = document.getElementById("addressList");
const addAddressButton = document.getElementById("addAddressButton");
const applyButton = document.getElementById("applyButton");

let selectedAddressId = null;

/*
  این تابع API را شبیه‌سازی می‌کند.
  بعداً وقتی API واقعی داشتی، فقط این تابع را با fetch تغییر می‌دهی.
*/
async function getAddressesFromAPI() {
  return [
    {
      id: 1,
      name: "Home",
      address: "61480 Sunbrook Park, PC 5679",
      isDefault: true,
    },
    {
      id: 2,
      name: "Office",
      address: "6993 Meadow Valley Terra, PC 3637",
      isDefault: false,
    },
    {
      id: 3,
      name: "Apartment",
      address: "21833 Clyde Gallagher, PC 4662",
      isDefault: false,
    },
    {
      id: 4,
      name: "Parent's House",
      address: "5259 Blue Bill Park, PC 4627",
      isDefault: false,
    },
  ];
}

/*
  آدرس‌هایی که کاربر خودش اضافه می‌کند از localStorage خوانده می‌شوند.
*/
function getLocalAddresses() {
  return JSON.parse(localStorage.getItem("userAddresses")) || [];
}

/*
  ذخیره آدرس‌های جدید کاربر در localStorage
*/
function saveLocalAddresses(addresses) {
  localStorage.setItem("userAddresses", JSON.stringify(addresses));
}

/*
  آیکون لوکیشن
*/
function locationIcon() {
  return `
    <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E8E8E8]">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#222222]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 10.25A3.25 3.25 0 1112 5.75a3.25 3.25 0 010 6.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  `;
}

/*
  ساخت کارت هر آدرس
*/
function createAddressCard(address) {
  const isSelected = address.id === selectedAddressId;

  return `
    <button
      class="address-card flex w-full items-center gap-5 rounded-[34px] bg-white px-5 py-9 text-left shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
      data-id="${address.id}"
    >
      ${locationIcon()}

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-3">
          <h2 class="text-[22px] font-extrabold">${address.name}</h2>

          ${
            address.isDefault
              ? `
                <span class="rounded-xl bg-[#EEEEEE] px-3 py-2 text-[14px] font-semibold text-[#555555]">
                  Default
                </span>
              `
              : ""
          }
        </div>

        <p class="mt-2 text-[16px] text-[#686868]">
          ${address.address}
        </p>
      </div>

      <span
        class="radio flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[4px] border-[#111111]"
      >
        ${
          isSelected
            ? `<span class="h-5 w-5 rounded-full bg-[#111111]"></span>`
            : ""
        }
      </span>
    </button>
  `;
}

/*
  فقط Home از API نمایش داده می‌شود.
  آدرس‌هایی که کاربر اضافه کرده هم نمایش داده می‌شوند.
*/
async function renderAddresses() {
  const apiAddresses = await getAddressesFromAPI();

  const homeAddress = apiAddresses.filter(
    (address) => address.name === "Home"
  );

  const localAddresses = getLocalAddresses();

  const allAddresses = [...homeAddress, ...localAddresses];

  if (!selectedAddressId && allAddresses.length > 0) {
    selectedAddressId = allAddresses[0].id;
  }

  addressList.innerHTML = allAddresses
    .map((address) => createAddressCard(address))
    .join("");

  document.querySelectorAll(".address-card").forEach((card) => {
    card.addEventListener("click", function () {
      selectedAddressId = Number(this.dataset.id);
      renderAddresses();
    });
  });
}

/*
  اضافه کردن آدرس جدید
*/
addAddressButton.addEventListener("click", function () {
  const name = prompt("Address name: مثال Work یا My House");
  const address = prompt("Full address:");

  if (!name || !address) {
    return;
  }

  const localAddresses = getLocalAddresses();

  const newAddress = {
    id: Date.now(),
    name: name,
    address: address,
    isDefault: false,
  };

  localAddresses.push(newAddress);

  saveLocalAddresses(localAddresses);

  selectedAddressId = newAddress.id;

  renderAddresses();
});

/*
  ذخیره آدرس انتخاب‌شده برای نمایش در checkout.html
*/
applyButton.addEventListener("click", async function () {
  const apiAddresses = await getAddressesFromAPI();
  const localAddresses = getLocalAddresses();

  const allAddresses = [
    ...apiAddresses.filter((address) => address.name === "Home"),
    ...localAddresses,
  ];

  const selectedAddress = allAddresses.find(
    (address) => address.id === selectedAddressId
  );

  if (!selectedAddress) {
    return;
  }

  localStorage.setItem(
    "selectedAddress",
    JSON.stringify(selectedAddress)
  );

  window.location.href = "checkout.html";
});

renderAddresses();