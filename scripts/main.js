/**
 * Not a lot in here 🤔
 * Who needs JavaScript anyway?
 */

const toggleBtn = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function setupMobileMenuToggle() {
  toggleBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
}

function resetScrollOnLoad() {
  window.addEventListener('load', () => {
    if (window.location.hash) {
      history.replaceState(null, null, ' ');
      window.scrollTo(0, 0);
    }
  });
}

function setupMobileNavLinks() {
  const navLinks = document.querySelectorAll('.mobile-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}

function setupOutsideClickListener() {
  document.addEventListener('click', (e) => {
    const target = e.target;
    const clickedInsideNav = mobileNav.contains(target);
    const clickedToggleBtn = toggleBtn.contains(target);

    if (!clickedInsideNav && !clickedToggleBtn) {
      mobileNav.classList.add('hidden');
    }
  });
}

async function getDataFromGitHub() {
  try {
    const response = await fetch('https://api.github.com/users/tommypurkiss');
    return await response.json();
  } catch (error) {
    return console.error('Error fetching data:', error);
  }
}

function sendEmail(event) {
  event.preventDefault();
  const message = document.getElementById('email-message').value;
  const mailto = `mailto:tommypurkiss1@gmail.com?subject=Portfolio%20Message&body=${encodeURIComponent(message)}`;
  window.location.href = mailto;
  return false;
}

(function() {
  emailjs.init('ZmaE7ZcDHugMVaC8S');
})();

document.getElementById('email-form').addEventListener('submit', function(event) {
  event.preventDefault();
  emailjs.sendForm('service_arhr1na', 'template_gjui9h8', this)
    .then(function() {
      document.getElementById('email-status').textContent = 'Message sent! 🎉';
    }, function(error) {
      document.getElementById('email-status').textContent = 'Failed to send. Please try again later.';
    });
});

async function init() {
  setupMobileMenuToggle();
  setupMobileNavLinks();
  setupOutsideClickListener();
  resetScrollOnLoad();

  const githubData = await getDataFromGitHub();
  if (githubData) {
    console.log('GitHub data:', githubData);
    // TODO: Update your UI here with githubData

    const profileImg = document.querySelector('.profile-photo img');
    if (profileImg && githubData.avatar_url) {
      profileImg.src = githubData.avatar_url;
      profileImg.alt = `${githubData.name || 'GitHub User'}'s Profile Photo`;
    }
  }
}

init();