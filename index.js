// Smooth scroll to section
const navLinks = document.querySelectorAll('#nav-menu a:not(.resume-link)');

// Add event listener to track scroll position
window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset;

  // Iterate through each section to determine the active section
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 70;
    const sectionHeight = section.offsetHeight;

    // Check if the current scroll position is within the bounds of the section
    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      // Remove the 'active' class from all navigation links
      navLinks.forEach(link => link.classList.remove('active'));

      // Get the corresponding navigation link using the section ID
      const targetNavLink = document.querySelector(`#nav-menu a[href="#${section.id}"]`);

      // Add the 'active' class to the corresponding navigation link
      targetNavLink.classList.add('active');
    }

    // Special case for the contact section
    if (
      currentScroll + window.innerHeight >= document.documentElement.scrollHeight &&
      section.id === 'contact'
    ) {
      // Remove the 'active' class from all navigation links
      navLinks.forEach(link => link.classList.remove('active'));

      // Get the corresponding navigation link using the section ID
      const targetNavLink = document.querySelector(`#nav-menu a[href="#${section.id}"]`);

      // Add the 'active' class to the corresponding navigation link
      targetNavLink.classList.add('active');
    }
  });
});


// Smooth scroll function
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
navLinks.forEach(link => {
  if (!link.classList.contains('resume') && !link.classList.contains('logo')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetSection = link.getAttribute('href');
      smoothScroll(targetSection, 1000); // Set the duration (in milliseconds) as per your preference
    });
  }
});



const jobTitleElement = document.getElementById('job-title');
const cursorElement = document.createElement('span');
cursorElement.classList.add('cursor');
cursorElement.textContent = '|';
jobTitleElement.appendChild(cursorElement);

const jobTitles = [
  'Full Stack Web Developer.',
  'Java Backend Developer.'
];

let currentIndex = 0;

function updateJobTitle() {
  const currentJobTitle = jobTitles[currentIndex];
  const typingDelay = 150; // Delay between typing each character
  const erasingDelay = 100; // Delay before erasing the job title

  let i = 0;
  let isErasing = false;

  function typeNextCharacter() {
    if (isErasing) {
      const updatedJobTitle = currentJobTitle.slice(0, i);
      jobTitleElement.textContent = updatedJobTitle;
      i--;
      if (i === 0) {
        isErasing = false;
        currentIndex = (currentIndex + 1) % jobTitles.length;
        setTimeout(updateJobTitle, 500);
      } else {
        setTimeout(typeNextCharacter, erasingDelay);
      }
    } else {
      const updatedJobTitle = currentJobTitle.slice(0, i) + '|';
      jobTitleElement.textContent = updatedJobTitle;
      i++;
      if (i <= currentJobTitle.length) {
        setTimeout(typeNextCharacter, typingDelay);
      } else {
        isErasing = true;
        cursorElement.style.visibility = 'hidden'; // Hide cursor when erasing
        setTimeout(typeNextCharacter, erasingDelay);
      }
    }
  }

  typeNextCharacter();
}

// Start the job title animation
updateJobTitle();


// Add event listener for page load
window.addEventListener('load', function () {
  const logo = document.querySelector('.logo');
  logo.classList.add('visible');
});





// Callback function when the skills section is intersecting
function handleSkillsIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.skills-card:not(.animate)'); // Select only the cards that are not already animated
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`; // Add a delay to each card's animation based on its index
        card.classList.add('animate'); // Add class to trigger the animation
      });
      observer.unobserve(entry.target); // Stop observing once the animation is triggered for all cards
    }
  });
}

// Create an intersection observer
const skillsObserver = new IntersectionObserver(handleSkillsIntersection, {
  root: null,
  threshold: 0.5 // Adjust the threshold as needed
});

// Select the skills section containers
const skillsSections = document.querySelectorAll('#skills');

// Observe each skills section container
skillsSections.forEach(skillsSection => {
  skillsObserver.observe(skillsSection);
});

// Helper function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScroll() {
  skillsSections.forEach(skillsSection => {
    if (isInViewport(skillsSection)) {
      skillsObserver.observe(skillsSection);
    } else {
      skillsObserver.unobserve(skillsSection);
    }
  });
}

// Attach the handleScroll function to the scroll event
window.addEventListener('scroll', handleScroll());





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


// Add the following JavaScript code

// Function to check if an element is in the viewport
function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  var contactSection = document.getElementById('contact');
  var contactLeft = document.querySelector('.contact-half.contact-left');
  var contactRight = document.querySelector('.contact-half.contact-right');

  if (isElementInViewport(contactSection)) {
    contactLeft.classList.add('appear');
    contactRight.classList.add('appear');
  } else {
    contactLeft.classList.remove('appear');
    contactRight.classList.remove('appear');
  }
}

// Event listener for scroll event
window.addEventListener('scroll', handleScroll);





// dark mode toggle 
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('change', function () {
  if (darkModeToggle.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

function enableDarkMode() {
  body.classList.add('dark-mode');
  localStorage.setItem('darkModeEnabled', true);
}

function disableDarkMode() {
  body.classList.remove('dark-mode');
  localStorage.setItem('darkModeEnabled', false);
}

// Check if dark mode was previously enabled
const darkModeEnabled = localStorage.getItem('darkModeEnabled');
if (darkModeEnabled && darkModeEnabled === 'true') {
  darkModeToggle.checked = true; // Set the checkbox state to checked
  enableDarkMode();
} 
else {
  darkModeToggle.checked = false; // Set the checkbox state to unchecked
  disableDarkMode();
}


