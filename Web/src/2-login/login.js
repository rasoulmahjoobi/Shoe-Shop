//گرفتن اینپوت ها و دکمه ها
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const rememberMe = document.getElementById("remember-me");
const loginBtn = document.getElementById("loginBtn");
const emailSuggestions = document.getElementById("email-suggestions");

//برای اینکه وقتی صفحه رفرش میشود، فیلدها خالی بمانند
window.addEventListener("load", () => {
  emailInput.value = "";
  passwordInput.value = "";
  rememberMe.checked = false;
});

//نمایش بوردر مشکی هنگام فوکوس
[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.remove("border-transparent");
    input.classList.add("border-black", "border-2");
  });

  input.addEventListener("blur", () => {
    input.classList.remove("border-black", "border-2");
    input.classList.add("border-transparent");
  });
});

// رنگ دکمه لاگین
function checkInputs() {
  if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
    loginBtn.classList.remove("bg-slate-400");
    loginBtn.classList.add("bg-slate-800");
  } else {
    loginBtn.classList.remove("bg-slate-800");
    loginBtn.classList.add("bg-slate-400");
  }
}

emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

// فعال شدن دکمه لاگین
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  //ذخیره ایمیل در localstorage
  if (rememberMe.checked) {
    let savedEmails = JSON.parse(localStorage.getItem("savedEmails")) || [];

    if (!savedEmails.includes(email)) {
      savedEmails.push(email);
    }

    localStorage.setItem("savedEmails", JSON.stringify(savedEmails));
  }

  // انتقال به صفحه بعد
  window.location.href = "../3-home/home/home.html";
});

//ساخت باکس ایمیل های ذخیره شده پایین فیلد ایمیل
emailInput.addEventListener("focus", () => {
  const savedEmails = JSON.parse(localStorage.getItem("savedEmails")) || [];

  if (savedEmails.length === 0) return;

  emailSuggestions.innerHTML = "";

  savedEmails.forEach((email) => {
    const item = document.createElement("div");

    item.className = "p-3 cursor-pointer hover:bg-gray-100";

    item.textContent = email;

    item.addEventListener("click", () => {
      emailInput.value = email;

      emailSuggestions.classList.add("hidden");
    });

    emailSuggestions.appendChild(item);
  });

  emailSuggestions.classList.remove("hidden");
});

//اگر جای دیگری از صفحه کلیک شد، باکس ایمیل بسته شود
document.addEventListener("click", (e) => {
  if (!emailInput.contains(e.target) && !emailSuggestions.contains(e.target)) {
    emailSuggestions.classList.add("hidden");
  }
});
