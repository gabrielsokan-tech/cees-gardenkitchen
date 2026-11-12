// ===== Cees Garden Kitchen - JavaScript =====

// ---- 1. Mobile navigation toggle (event handling) ----
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

// ---- 2. Back-to-top button ----
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- 3. Menu filter (interactive feature) ----
const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

function filterMenu(category) {
  menuItems.forEach(function (item) {
    const show = category === "all" || item.dataset.category === category;
    item.classList.toggle("hidden", !show);
  });
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");
    filterMenu(button.dataset.filter);
  });
});

// ---- 4. Contact form validation ----
const form = document.getElementById("contactForm");

if (form) {
  const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
  };
  const feedback = document.getElementById("formFeedback");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // returns an error message, or "" when the value is valid
  function validateField(name, value) {
    value = value.trim();
    switch (name) {
      case "fullName":
        if (value === "") return "Please enter your full name.";
        if (value.length < 3) return "Name must be at least 3 characters.";
        return "";
      case "email":
        if (value === "") return "Please enter your email address.";
        if (!emailPattern.test(value)) return "Please enter a valid email address.";
        return "";
      case "subject":
        if (value === "") return "Please enter a subject.";
        if (value.length < 3) return "Subject must be at least 3 characters.";
        return "";
      case "message":
        if (value === "") return "Please write a message.";
        if (value.length < 10) return "Message must be at least 10 characters.";
        return "";
    }
    return "";
  }

  function showResult(name) {
    const input = fields[name];
    const error = validateField(name, input.value);
    const group = input.parentElement;
    document.getElementById(name + "Error").textContent = error;
    group.classList.toggle("invalid", error !== "");
    group.classList.toggle("valid", error === "");
    return error === "";
  }

  // live feedback while the user types / leaves a field
  Object.keys(fields).forEach(function (name) {
    fields[name].addEventListener("blur", function () { showResult(name); });
    fields[name].addEventListener("input", function () {
      if (fields[name].parentElement.classList.contains("invalid")) showResult(name);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let allValid = true;
    Object.keys(fields).forEach(function (name) {
      if (!showResult(name)) allValid = false;
    });

    feedback.className = "feedback";
    if (allValid) {
      feedback.classList.add("success");
      feedback.textContent =
        "Thank you, " + fields.fullName.value.trim() +
        "! Your details passed validation. (Demo form: no message is actually sent, as no backend is connected.)";
      form.reset();
      Object.values(fields).forEach(function (f) { f.parentElement.classList.remove("valid"); });
    } else {
      feedback.textContent = "Please fix the errors above and try again.";
      feedback.style.color = "#c62828";
    }
  });
}
