const landing = document.querySelectorAll(".landing img");
let slideIndex = 0;
let intervalId = null;

initializeSlider();

function initializeSlider() {
  if (landing.length > 0) {
    landing[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 3000);
  }
}

function showSlide(index) {
  if (index >= landing.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = landing.length - 1;
  } else {
    slideIndex = index;
  }
  landing.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  landing[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
  clearInterval(intervalId);
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// ========================== filter ==========================

const buttons = document.querySelectorAll("main button");
const cards = document.querySelectorAll("main .card");

const filterCard = (e) => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-secondary");
  });

  e.target.classList.remove("btn-secondary");
  e.target.classList.add("btn-primary");

  cards.forEach((card) => {
    card.classList.add("hide");
    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      card.classList.remove("hide");
    }
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", filterCard);
});

// ========================== up button ==========================
let i = document.querySelector(".up");

window.onscroll = function () {
  if (window.scrollY > 100) {
    i.classList.add("show");
  } else {
    i.classList.remove("show");
  }
};

i.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// ======================== redirect to product page ======================
function product(e, element) {
  const card = element.closest(".card");
  const imgSrc = card.querySelector("img").src;
  const title = card.querySelector("h4").textContent;
  const price = card.querySelector(".price").textContent;

  window.localStorage.setItem("src", imgSrc);
  window.localStorage.setItem("title", title);
  window.localStorage.setItem("price", price);
  window.localStorage.setItem("Category", card.dataset.name);
}
// ================================= login =======================
function logout(e) {
  e.preventDefault();
  history.replaceState(null, null, "/pages/login.html");

  setTimeout(() => {
    window.location.replace("/pages/login.html");
  }, 100);
}
// ================================ userName ====================
const user = document.querySelector(".userName");
user.innerHTML = `Welcome ${window.localStorage.getItem("name")}`;
