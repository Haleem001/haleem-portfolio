// Cache DOM elements
const DOM = {
  typingText: document.getElementById('typing-text'),
  heroRest: document.getElementById('hero-rest'),
  burger: document.getElementById('burger-menu'),
  nav: document.querySelector('nav'),
  navLinks: document.querySelectorAll('.nav-link'),
  scrollUp: document.getElementById('scroll-up'),
  form: document.querySelector('.contact-form')
};

// Typing animation with performance optimization
const typeWriter = (text, element, speed = 100) => {
  return new Promise(resolve => {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        requestAnimationFrame(() => setTimeout(type, speed));
      } else {
        resolve();
      }
    };
    type();
  });
};

// Throttle scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Start typing animation
  await typeWriter("Hi, I am Mahmud Ghali", DOM.typingText);
  DOM.heroRest.style.opacity = "1";
  AOS.refresh();

  // Event Listeners
  DOM.burger?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
    DOM.burger.classList.toggle('active');
  });

  // Optimized scroll handler
  window.addEventListener('scroll', throttle(() => {
    const scrolled = window.scrollY > 300;
    DOM.scrollUp.style.display = scrolled ? 'block' : 'none';
  }, 100));

 
  
});

  document.getElementById('currentYear').textContent = new Date().getFullYear();

