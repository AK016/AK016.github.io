// Smooth scroll to section
const navLinks = document.querySelectorAll('#nav-menu a:not(.resume-link)');

// Function to add the "active" class to the navigation link of the currently active section
function highlightActiveSection() {
  const sections = document.querySelectorAll("section"); 
  const navLinks = document.querySelectorAll('.nav-link:not(.resume)');

  let currentActiveIndex = -1;

  sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) { 
          currentActiveIndex = index;
      }
  });

  navLinks.forEach((link, index) => {
      if (index === currentActiveIndex) {
          link.classList.add("active");
      } else {
          link.classList.remove("active");
      }
  });
}


// Call the main event handler when the page loads and when the user scrolls
window.addEventListener("load", () => {
  highlightActiveSection();
});

window.addEventListener("scroll", () => {
  highlightActiveSection();
});


// Call the functions again after a delay in case the page content changes dynamically
setInterval(() => {
  highlightActiveSection();
}, 1000); // Adjust the delay time (1000 milliseconds = 1 second) as needed


const toggleButton = document.getElementById('nav-toggle-button');
const navList = document.getElementById('nav-links');

// Function to toggle the 'active' class for the nav-list
function toggleNavMenu() {
    navList.classList.toggle('active');
}

// Add a click event listener to the nav-toggle-button to toggle the menu
toggleButton.addEventListener('click', toggleNavMenu);

// Add click event listeners to each menu link to close the menu when clicked
navLinks.forEach((link) => {
    link.addEventListener('click', toggleNavMenu);
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
  darkModeToggle.checked = true;
  enableDarkMode();
}
else {
  darkModeToggle.checked = false;
  disableDarkMode();
}


// Burger menu toggle 
$(document).ready(function() {
  var windowWidth = window.innerWidth;
  var navLinks = $('#nav-links');

  // Function to toggle the navigation menu on mobile screens
  $('#nav-toggle-button').click(function() {
    if (windowWidth <= 770) {
      navLinks.slideToggle();
    }
  });

  // Function to close the navigation menu when a link is clicked
  $('#nav-links a').click(function() {
    if (windowWidth <= 770) {
      navLinks.slideUp();
    }
  });

  // Add an event listener to handle screen size changes
  $(window).resize(function() {
    windowWidth = window.innerWidth;

    // Show or hide the navigation links based on screen size
    handleScreenSizeChange();
  });

  // Initial call to handle screen size on page load
  handleScreenSizeChange();

  // Function to handle screen size changes
  function handleScreenSizeChange() {
    // Show or hide the navigation links based on screen size
    if (windowWidth > 770) {
      navLinks.show();
    } else {
      navLinks.hide();
    }
  }
});



// Function to handle screen size changes
function handleScreenSizeChange() {
  if (window.innerWidth > 770) {
    navList.classList.remove('active'); // Close the burger menu
    navList.style.display = 'flex'; // Display links in a row
  } else {
    navList.style.display = 'none'; // Hide the navigation links on small screens
  }
}

// Add an event listener to handle screen size changes
window.addEventListener('resize', handleScreenSizeChange);

// Initial call to handle screen size on page load
handleScreenSizeChange();
