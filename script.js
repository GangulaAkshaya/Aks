/**
 * ==========================================================================
 * Alex Morgan Portfolio - Interactive JavaScript (script.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive components
  initMobileMenu();
  initHeaderScroll();
  initScrollSpy();
  initContactForm();
  initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation Menu Toggle & Auto-Close
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  // Open mobile drawer
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  // Close mobile drawer via close icon
  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close mobile drawer when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.remove('show-menu');
      }
    });
  });

  // Close mobile drawer if clicked outside of the drawer
  document.addEventListener('click', (event) => {
    if (
      navMenu &&
      navMenu.classList.contains('show-menu') &&
      !navMenu.contains(event.target) &&
      navToggle &&
      !navToggle.contains(event.target)
    ) {
      navMenu.classList.remove('show-menu');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Sticky Header Elevation on Scroll
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');

  function checkScroll() {
    if (window.scrollY >= 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once on initial page load
}

/* --------------------------------------------------------------------------
   3. Scroll Spy (Highlight active navigation item based on viewport)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset || window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
  highlightNavOnScroll(); // Trigger on initial render
}

/* --------------------------------------------------------------------------
   4. Contact Form Validation & Feedback Simulation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  if (!form) return;

  // Simple Email Regex validation helper
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Clear specific field error
  function clearError(input, errorElement) {
    input.classList.remove('input-error');
    errorElement.textContent = '';
  }

  // Set field error message
  function setError(input, errorElement, message) {
    input.classList.add('input-error');
    errorElement.textContent = message;
  }

  // Real-time input error clearing
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      if (input === nameInput) clearError(nameInput, nameError);
      if (input === emailInput) clearError(emailInput, emailError);
      if (input === messageInput) clearError(messageInput, messageError);
      formMessage.style.display = 'none';
    });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    // Reset banner
    formMessage.className = 'form-message';
    formMessage.style.display = 'none';
    formMessage.textContent = '';

    // Validate Name
    if (nameVal === '') {
      setError(nameInput, nameError, 'Please enter your name.');
      isValid = false;
    } else if (nameVal.length < 2) {
      setError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate Email
    if (emailVal === '') {
      setError(emailInput, emailError, 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(emailVal)) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate Message
    if (messageVal === '') {
      setError(messageInput, messageError, 'Please enter your message.');
      isValid = false;
    } else if (messageVal.length < 10) {
      setError(messageInput, messageError, 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    // If validation fails, do not proceed
    if (!isValid) return;

    // Simulate sending form with loading feedback
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
      // Success feedback
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;

      formMessage.className = 'form-message success';
      formMessage.textContent = '🎉 Thank you! Your message has been sent successfully. I will get back to you soon.';
      formMessage.style.display = 'block';

      // Reset form fields
      form.reset();

      // Auto-hide success message after 6 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 6000);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   5. Dynamic Copyright Year
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
