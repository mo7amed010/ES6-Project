const form = document.getElementsByTagName("form")[0];
const email = document.querySelectorAll("input[type=email]")[0];
const password = document.getElementById("pass");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const account = document.getElementById("account");
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (window.localStorage.getItem("email") === emailValue) {
    if (window.localStorage.getItem("password") === passwordValue) {
      form.submit();
    } else {
      account.classList.add("error");
      account.classList.remove("success");
      account.innerText = "Invalid email or password, try agian";
    }
  } else {
    account.classList.add("error");
    account.classList.remove("success");
    account.innerText = "Invalid Email or Password, Please try agian";
  }
});
