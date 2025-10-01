// Reveal on scroll using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback
  revealElements.forEach((el) => el.classList.add('in-view'));
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Back to top button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  const onScroll = () => {
    if (window.scrollY > 240) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact form validation & UX
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const hpInput = document.getElementById('company');
  const statusEl = contactForm.querySelector('.form-status');

  const setFieldError = (inputEl, message) => {
    const errorId = inputEl.getAttribute('aria-describedby');
    if (!errorId) return;
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message || '';
  };

  const isEmailValid = (value) => {
    return /.+@.+\..+/.test(value);
  };

  const validate = () => {
    let isValid = true;
    // Honeypot
    if (hpInput && hpInput.value.trim().length > 0) {
      return false;
    }

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      setFieldError(nameInput, '');
    }

    if (!emailInput.value.trim()) {
      setFieldError(emailInput, 'Please enter your email.');
      isValid = false;
    } else if (!isEmailValid(emailInput.value.trim())) {
      setFieldError(emailInput, 'Please enter a valid email.');
      isValid = false;
    } else {
      setFieldError(emailInput, '');
    }

    if (!messageInput.value.trim()) {
      setFieldError(messageInput, 'Please enter a message.');
      isValid = false;
    } else {
      setFieldError(messageInput, '');
    }
    return isValid;
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    if (!validate()) {
      statusEl.textContent = 'Please fix the errors above and try again.';
      return;
    }
    // Simulate successful submit
    statusEl.textContent = 'Sending...';
    setTimeout(() => {
      statusEl.textContent = 'Thanks! Your message has been sent.';
      contactForm.reset();
    }, 700);
  });

  // Re-validate on input
  [nameInput, emailInput, messageInput].forEach((el) => {
    el.addEventListener('input', () => validate());
    el.addEventListener('blur', () => validate());
  });
}

