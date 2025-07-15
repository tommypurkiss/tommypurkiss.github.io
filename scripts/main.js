/**
 * Not a lot in here 🤔
 * Who needs JavaScript anyway?
 */

/**
 * ===========================
 * GLOBAL VARS
 * ===========================
 */
const toggleBtn = document.querySelector(".mobile-menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const contentEl = document.querySelector(".content");
const scrollUpBtn = document.querySelector(".scroll-up-btn");

/**
 * ===========================
 * SCROLL TO TOP BTN
 * ===========================
 */
function handleScrollUpButton() {
  contentEl.addEventListener("scroll", (event) => {
    const homeRect = document.querySelector("#home").getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();

    const showButton = homeRect.bottom < contentRect.top;

    if (showButton) {
      scrollUpBtn.style.display = "flex";

      scrollUpBtn.addEventListener("click", () => {
        contentEl.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      scrollUpBtn.style.display = "none";
    }
  });
}

/**
 * ===========================
 * SCROLL RESET
 * ===========================
 */
function resetScrollOnLoad() {
  window.addEventListener("load", () => {
    if (window.location.hash) {
      history.replaceState(null, null, " ");
      window.scrollTo(0, 0);
    }
  });
}

/**
 * ===========================
 * MOBILE NAV & MODAL
 * ===========================
 */
function setupMobileMenuToggle() {
  toggleBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
}

function setupMobileNavLinks() {
  const navLinks = document.querySelectorAll(".mobile-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
    });
  });
}

function setupOutsideClickListener() {
  document.addEventListener("click", (e) => {
    const target = e.target;
    const clickedInsideNav = mobileNav.contains(target);
    const clickedToggleBtn = toggleBtn.contains(target);

    if (!clickedInsideNav && !clickedToggleBtn) {
      mobileNav.classList.add("hidden");
    }
  });
}

/**
 * ===========================
 * GITHUB DATA
 * ===========================
 */
async function getDataFromGitHub() {
  try {
    const response = await fetch("https://api.github.com/users/tommypurkiss");
    return await response.json();
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
}

/**
 * ===========================
 * EMAIL
 * ===========================
 */
function sendEmail(event) {
  event.preventDefault();
  const message = document.getElementById("email-message").value;
  const mailto = `mailto:tommypurkiss1@gmail.com?subject=Portfolio%20Message&body=${encodeURIComponent(
    message
  )}`;
  window.location.href = mailto;
  return false;
}

(function () {
  emailjs.init("ZmaE7ZcDHugMVaC8S");
})();

document
  .getElementById("email-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    emailjs.sendForm("service_arhr1na", "template_gjui9h8", this).then(
      function () {
        document.getElementById("email-status").textContent =
          "Message sent! 🎉";
      },
      function (error) {
        document.getElementById("email-status").textContent =
          "Failed to send. Please try again later.";
      }
    );
  });

/**
 * ===========================
 * INIT
 * ===========================
 */
async function init() {
  setupMobileMenuToggle();
  setupMobileNavLinks();
  setupOutsideClickListener();
  resetScrollOnLoad();
  handleScrollUpButton();

  const githubData = await getDataFromGitHub();
  if (githubData) {
    console.log("GitHub data:", githubData);
    // TODO: Update your UI here with githubData

    const profileImg = document.querySelector(".profile-photo img");
    if (profileImg && githubData.avatar_url) {
      profileImg.src = githubData.avatar_url;
      profileImg.alt = `${githubData.name || "GitHub User"}'s Profile Photo`;
    }
  }
}

init();
