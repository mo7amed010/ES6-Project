const form = document.getElementsByTagName("form")[0];
const uName = document.querySelectorAll("input[type=text]")[0];
const email = document.querySelectorAll("input[type=email]")[0];
const password = document.getElementById("pass");
const confPassword = document.querySelectorAll("input[type=password]")[1];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const account = document.getElementById("account");

  if (validateInputs()) {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const nameValue = uName.value.trim();

    if (window.localStorage.getItem("email") == emailValue) {
      account.classList.add("error");
      account.classList.remove("success");
      account.innerText = "You already has an account, click on login";
    } else {
      window.localStorage.setItem("name", nameValue);
      window.localStorage.setItem("email", emailValue);
      window.localStorage.setItem("password", passwordValue);
      form.submit();
    }
  }
});

const setError = (element, error) => {
  const inputGroup = element.parentElement;
  const errorDisplay = inputGroup.nextElementSibling;

  errorDisplay.innerText = error;

  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
};

const setSuccess = (element) => {
  const inputGroup = element.parentElement;
  const errorDisplay = inputGroup.nextElementSibling;
  console.log(errorDisplay);

  errorDisplay.innerText = "";

  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
};

const validateInputs = () => {
  const nameValue = uName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confPasswordValue = confPassword.value.trim();
  const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const letterRegex = /^[A-Za-z\s]+$/;
  let isValid = true;

  if (nameValue === "") {
    setError(uName, "Name is required");
    isValid = false;
  } else if (!letterRegex.test(nameValue)) {
    setError(uName, "Invalid Name");
    isValid = false;
  } else {
    setSuccess(uName);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    setError(email, "Invalid Email");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password is short, must be at least 8 character");
    isValid = false;
  } else {
    setSuccess(password);
  }
  if (confPasswordValue === "") {
    setError(confPassword, "Please confirm your password");
    isValid = false;
  } else if (confPasswordValue !== passwordValue) {
    setError(confPassword, "Password doesn't match");
    isValid = false;
  } else {
    setSuccess(confPassword);
  }

  return isValid;
};
