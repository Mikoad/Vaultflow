//burger menu
const burgerMenu = document.getElementById("burgerMenu");
const navBurger = document.querySelector(".navBurger");
burgerMenu.addEventListener("click", () => {
  navBurger.classList.toggle("active");
  burgerMenu.classList.toggle("active");
});
//form
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  "input[type='text'], input[type='password']"
);
const progressBar = document.getElementById("progress-bar");
console.log(inputs);
let pseudo, email, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Le pseudo doit contenir entre 3 et 20 caractères.");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_\-.]*$/)) {
    errorDisplay("pseudo", "Le pseudo n'est pas correcte.");
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le format du mail n'est pas correcte.");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = "";
  if (value.length === 0) {
    errorDisplay("password", "", true);
    progressBar.classList.remove("progressRed");
  } else if (!value.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)) {
    errorDisplay(
      "password",
      "8 caractères minimum, avec au moins 1 majuscule, 1 chiffre et un caractère spécial."
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressBlue");
    password = value;
  } else {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressGreen");
    password = value;
  }
  if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm", "Les mots de passe ne correspondent pas.");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});
const profileInfos = document.querySelector(".profileInfos");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo,
      email,
      password,
    };
    console.log(data);

    inputs.forEach((input) => {
      input.value = "";
    });
    progressBar.classList = "";
    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validée");
    window.location.href = "profile.html";
  } else {
    alert("Veuillez remplir correctement les champs");
  }
  // profileInfos.textContent = `Pseudo : ${data.pseudo}, Email : ${data.email}, Mot de passe : ${data.password}`;
});
// RegEx :
// pseudo : /^[a-zA-Z0-9_\-.]*$/
// mail : /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i
// password : /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/
