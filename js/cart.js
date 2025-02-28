document.addEventListener("DOMContentLoaded", function () {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  const emptyMessage = document.querySelector(".empty");
  const cartContainer = document.querySelector("section.container");
  const totalContainer = document.createElement("h3");
  totalContainer.classList.add("w-100", "text-center", "mt-4", "pe-5");

  function updateCart() {
    cartContainer.innerHTML = "";

    if (items.length === 0) {
      emptyMessage.classList.add("d-flex");
      totalContainer.textContent = "";
    } else {
      emptyMessage.classList.add("d-none");

      let totalPrice = 0;

      items.forEach((item, index) => {
        const card = createCartItem(item, index);
        cartContainer.appendChild(card);
        totalPrice += item.price * item.amount;
      });

      totalContainer.textContent = `Total Price: $${totalPrice}`;
      cartContainer.appendChild(totalContainer);
      addCheckoutButton();
    }
  }

  function createCartItem(item, index) {
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "w-75",
      "d-flex",
      "flex-row",
      "align-items-center",
      "p-3",
      "mb-3"
    );

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img");
    imgDiv.style.width = "150px";
    imgDiv.style.height = "150px";

    const img = document.createElement("img");
    img.src = item.src;
    img.classList.add("w-100", "h-100");
    imgDiv.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.classList.add("card-text");
    price.textContent = `Price: $${item.price}`;

    const quantityContainer = createQuantityControls(item, index);

    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(quantityContainer);

    card.appendChild(imgDiv);
    card.appendChild(cardBody);

    return card;
  }

  function createQuantityControls(item, index) {
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("d-flex", "align-items-center", "mt-2");

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.classList.add("btn", "btn-danger", "me-2");
    minusBtn.onclick = function () {
      if (item.amount > 1) {
        item.amount--;
      } else {
        items.splice(index, 1);
      }
      updateLocalStorage();
    };

    const quantity = document.createElement("span");
    quantity.textContent = item.amount;
    quantity.classList.add("mx-2");

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.classList.add("btn", "btn-success", "ms-2");
    plusBtn.onclick = function () {
      item.amount++;
      updateLocalStorage();
    };

    quantityContainer.appendChild(minusBtn);
    quantityContainer.appendChild(quantity);
    quantityContainer.appendChild(plusBtn);

    return quantityContainer;
  }

  function addCheckoutButton() {
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Complete your purchase";
    checkoutButton.classList.add("btn", "btn-primary", "w-100", "mt-3");
    checkoutButton.onclick = function () {
      items = [];
      updateLocalStorage();
      showSuccessNotification("Your order has been completed successfully!");
      setTimeout(() => {
        window.location.href = "thanks.html";
      }, 1000);
    };

    cartContainer.appendChild(checkoutButton);
  }

  function updateLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
    updateCart();
  }

  function showSuccessNotification(message) {
    const notificationContainer =
      document.getElementById("notification-container") ||
      createNotificationContainer();
    const successAlert = document.createElement("div");
    successAlert.classList.add("alert", "alert-success", "text-center");
    successAlert.textContent = message;

    notificationContainer.appendChild(successAlert);

    setTimeout(() => {
      successAlert.remove();
    }, 2000);
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

  updateCart();
});
