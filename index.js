// Smooth scroll to section
function smoothScroll(target, duration) {
    const targetSection = document.querySelector(target);
    const targetPosition = targetSection.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function scrollAnimation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollY = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, scrollY);
      if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
    }
  
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(scrollAnimation);
  }
  
  // Navbar links smooth scroll
  const navLinks = document.querySelectorAll('#nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetSection = link.getAttribute('href');
      smoothScroll(targetSection, 1000); // Set the duration (in milliseconds) as per your preference
    });
  });

  
  const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectContainer = document.querySelector('.project-card-container');

let scrollPosition = 0;
const projectWidth = 320; // Adjust this value to match the width of each project card
const projectsToShow = 3; // Adjust this value to change the number of projects displayed at a time

prevBtn.addEventListener('click', scrollProjects.bind(null, 'prev'));
nextBtn.addEventListener('click', scrollProjects.bind(null, 'next'));

function scrollProjects(direction) {
  const containerWidth = projectContainer.offsetWidth;
  const scrollAmount = projectWidth * projectsToShow;
  const maxScroll = projectContainer.scrollWidth - containerWidth;

  if (direction === 'prev') {
    scrollPosition -= scrollAmount;
    scrollPosition = Math.max(scrollPosition, 0);
  } else {
    scrollPosition += scrollAmount;
    scrollPosition = Math.min(scrollPosition, maxScroll);
  }

  projectContainer.style.transform = `translateX(-${scrollPosition}px)`;
}

const resumeLink = document.querySelector('.nav-link.resume');

if (resumeLink) {
  resumeLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.open(this.href, '_blank', 'noopener');
  });
}
