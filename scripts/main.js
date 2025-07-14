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

async function getDataFromGitHub() {
  try {
    const response = await fetch('https://api.github.com/users/tommypurkiss');
    return await response.json();
  } catch (error) {
    return console.error('Error fetching data:', error);
  }
}

async function init() {
  setupMobileMenuToggle();
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