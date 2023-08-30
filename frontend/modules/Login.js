import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector("input[name='email']");
    const passwordInput = el.querySelector("input[name='password']");

    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      const parent = emailInput.parentElement;
      if (!parent.querySelector("p")) {
        const p = document.createElement("p");
        p.style.color = "red";
        p.innerText = "Email inválido";
        parent.append(p);
      }
      error = true;
    } else {
      const parent = emailInput.parentElement;
      if (parent.querySelector("p"))
        parent.removeChild(parent.querySelector("p"));
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length >= 50) {
      const parent = passwordInput.parentElement;
      if (!parent.querySelector("p")) {
        const p = document.createElement("p");
        p.style.color = "red";
        p.innerText = "Senha precisa ter entre 3 e 50 caracteres";
        parent.append(p);
      }
      error = true;
    } else {
      const parent = passwordInput.parentElement;
      if (parent.querySelector("p"))
        parent.removeChild(parent.querySelector("p"));
    }

    if (!error) el.submit();
  }
}
