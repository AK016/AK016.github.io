
// project animation event 
const projectCards = document.querySelectorAll(".project-card");

function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide() {
  projectCards.forEach((projectCard) => {
    // Check if the project card is in the viewport
    const slideInAt = (window.scrollY + window.innerHeight) - (projectCard.offsetHeight / 2);
    const cardBottom = projectCard.offsetTop + projectCard.offsetHeight;
    const isHalfShown = slideInAt > projectCard.offsetTop;
    const isNotScrolledPast = window.scrollY < cardBottom;
    if (isHalfShown && isNotScrolledPast) {
      projectCard.classList.add("active");
    } else {
      projectCard.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));

// Run checkSlide initially to show the project cards in the initial viewport
checkSlide();
