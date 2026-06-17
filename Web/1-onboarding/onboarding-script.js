//گرفتن div صفحه ها
const page1 = document.getElementById("UI-loadingPage");
const page2 = document.getElementById("UI-page2");
const page3to5 = document.getElementById("UI-page3to5");

//گرفتن عناصری که در صفحه 3 تا 5 تغییر میکنن
const nextBtn = document.getElementById("nextBtn-onboarding");
const image = document.getElementById("bgImage-onboarding");
const title = document.getElementById("title-onboarding");

//گرفتن دکمه های خطی
const page3Btn = document.getElementById("page3Btn");
const page4Btn = document.getElementById("page4Btn");
const page5Btn = document.getElementById("page5Btn");

//تنظیم 2 ثانیه تاخیر صفحه لودینگ و رفتن از صفحه اول به صفحه دوم
window.addEventListener("load", () => {
  setTimeout(() => {
    // پنهان کردن صفحه اول
    page1.classList.add("hidden");
    page1.classList.remove("flex");
    // نمایش صفحه دوم
    page2.classList.remove("hidden");
    page2.classList.add("flex");
  }, 2000);
});

//رفتن از صفحه دوم به صفحه سوم
page2.addEventListener("click", () => {
  //پنهان کردن صفحه دوم
  page2.classList.remove("flex");
  page2.classList.add("hidden");
  //نمایش صفحه سوم
  page3to5.classList.remove("hidden");
});

//تعریف متغیر صفحه فعلی
let currentSlide = 0;

//آرایه تغییرات صفحه 3 تا 5
const onboardingSlides = [
  {
    image: "image-onboarding/onboarding-page3.jpg",
    title: "We provide high quality products just for you",
    buttonText: "Next",
  },
  {
    image: "image-onboarding/onboarding-page4.jpg",
    title: "Your satisfaction is our number one priority",
    buttonText: "Next",
  },
  {
    image: "image-onboarding/onboarding-page5.jpg",
    title: "Let's fulfill your fashion needs with Shoea right now!",
    buttonText: "Get started",
  },
];

//دکمه next
nextBtn.addEventListener("click", () => {
  currentSlide++;
  //رفتن به صفحه های بعدی - از 3 به 4 و از 4 به 5
  if (currentSlide < onboardingSlides.length) {
    updateSlide();
  } else {
    // رفتن به صفحه login
    window.location.href = "../2-login/login-page-index.html";
  }
});

//تغییر عناصر صفحه 3 تا 5
function updateSlide() {
  const slide = onboardingSlides[currentSlide];

  image.src = slide.image;
  title.textContent = slide.title;
  nextBtn.textContent = slide.buttonText;

  const buttons = [page3Btn, page4Btn, page5Btn];

  //تغییر رنگ دکمه های خطی
  buttons.forEach((btn, index) => {
    btn.classList.remove("bg-black");
    btn.classList.add("bg-gray-400");

    if (index === currentSlide) {
      btn.classList.remove("bg-gray-400");
      btn.classList.add("bg-black");
    }
  });
}

//تغییر صفحات با زدن روی دکمه های خطی
page3Btn.addEventListener("click", () => {
  currentSlide = 0;
  updateSlide();
});

page4Btn.addEventListener("click", () => {
  currentSlide = 1;
  updateSlide();
});

page5Btn.addEventListener("click", () => {
  currentSlide = 2;
  updateSlide();
});
