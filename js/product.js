document.addEventListener("DOMContentLoaded", function () {
  const h2 = document.getElementsByTagName("h2")[0];
  const img = document.getElementById("img");
  const price = document.getElementsByClassName("price")[0];
  const category = document.getElementsByClassName("category")[0];

  h2.textContent = window.localStorage.getItem("title") || "Product Name";
  price.textContent = window.localStorage.getItem("price") || "0";
  category.textContent = window.localStorage.getItem("Category") || "Category";
  img.src = window.localStorage.getItem("src") || "default.jpg";

  if (!window.localStorage.getItem("items")) {
    window.localStorage.setItem("items", JSON.stringify([]));
  }

  const addToCart = document.getElementsByClassName("buy")[0];

  addToCart.addEventListener("click", function () {
    let items = JSON.parse(localStorage.getItem("items")) || [];

    const productName = document.querySelector("h2").textContent;
    const productPrice = parseFloat(
      document.querySelector(".price").textContent
    );
    const productSrc = document.querySelector("#img").src;

    let existingItem = items.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.amount++;
    } else {
      items.push({
        name: productName,
        price: productPrice,
        amount: 1,
        src: productSrc,
      });
    }

    localStorage.setItem("items", JSON.stringify(items));

    showSuccessNotification("Product added to cart successfully!");
  });

  function showSuccessNotification(message) {
    const notificationContainer =
      // document.getElementById("notification-container") ||
      createNotificationContainer();
    const successAlert = document.createElement("div");
    successAlert.classList.add("alert", "alert-success", "text-center");
    successAlert.textContent = message;

    notificationContainer.appendChild(successAlert);

    setTimeout(() => {
      successAlert.remove();
    }, 3000);
  }

  function createNotificationContainer() {
    const notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    notificationContainer.style.position = "fixed";
    notificationContainer.style.top = "10px";
    notificationContainer.style.left = "50%";
    notificationContainer.style.transform = "translateX(-50%)";
    notificationContainer.style.zIndex = "1000";
    notificationContainer.style.width = "90%";
    notificationContainer.style.maxWidth = "400px";
    document.body.prepend(notificationContainer);
    return notificationContainer;
  }
});
