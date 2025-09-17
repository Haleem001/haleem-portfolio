// Cache DOM elements
const DOM = {
  typingText: document.getElementById('typing-text'),
  heroRest: document.getElementById('hero-rest'),
  burger: document.getElementById('burger-menu'),
  nav: document.querySelector('nav'),
  navLinks: document.querySelectorAll('.nav-link'),
  scrollUp: document.getElementById('scroll-up'),
  form: document.querySelector('.contact-form'),
  scrollUp: document.getElementById('scroll-up')
};
// Enhanced typing animation - fixed version
const typeWriter = (text, element, speed = 100) => {
  return new Promise(resolve => {
    let i = 0;
    
    // Clear element and set up
    element.innerHTML = '';
    element.style.position = 'relative';
    
    // Add styles only once
    if (!document.getElementById('enhanced-typing-styles')) {
      const style = document.createElement('style');
      style.id = 'enhanced-typing-styles';
      style.textContent = `
        .typing-cursor {
          display: inline-block;
          background: linear-gradient(45deg, #00ff88, #00ccff);
          color: transparent;
          animation: cursorGlow 1s ease-in-out infinite alternate;
          margin-left: 3px;
          width: 2px;
          height: 1.2em;
          vertical-align: baseline;
        }
        
        @keyframes cursorGlow {
          0% { 
            opacity: 1; 
            box-shadow: 0 0 10px #00ff88;
            transform: scale(1);
          }
          100% { 
            opacity: 0.3; 
            box-shadow: 0 0 20px #00ccff;
            transform: scale(1.1);
          }
        }
        
        .char-appear {
          display: inline-block;
          animation: charSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes charSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
          60% {
            opacity: 0.8;
            transform: translateY(3px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '|';
    
    const type = () => {
      if (i < text.length) {
        // Remove cursor temporarily
        if (cursor.parentNode) {
          cursor.remove();
        }
        
        // Add character with animation
        const char = document.createElement('span');
        char.className = 'char-appear';
        const currentChar = text.charAt(i);
        
        // Handle spaces as line breaks for responsive design
        if (currentChar === ' ') {
          const spaceSpan = document.createElement('span');
          spaceSpan.className = 'char-appear';
          spaceSpan.textContent = '\u00A0'; // non-breaking space
          element.appendChild(spaceSpan);

          
        } else {
          char.textContent = currentChar;
          element.appendChild(char);
        }
        
        // Add cursor back
        element.appendChild(cursor);
        
        i++;
        
        // Variable speed for natural feel
        const variance = (Math.random() - 0.5) * 40;
        const nextSpeed = Math.max(50, speed + variance);
        
        setTimeout(type, nextSpeed);
      } else {
        // Fade out cursor when done
        setTimeout(() => {
          if (cursor.parentNode) {
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
            cursor.style.transition = 'opacity 0.5s ease';
          }
        }, 1000);
        resolve();
      }
    };
    
    // Start typing
    element.appendChild(cursor);
    setTimeout(type, 200);
  });
};

// Keep your existing throttle function unchanged
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Initialize with better timing
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    mirror: false
  });

  // Start enhanced typing animation
  const firstName = "Mahmud";
  const lastName = "Ghali";
  const space = "  ";
  // const fullName = `${firstName} ${space} ${lastName}`;
  const fullName = "Mahmud" + " " +   "Ghali";
  await typeWriter(fullName, DOM.typingText);
  
  // Show hero content
  DOM.heroRest.style.opacity = "1";
  DOM.heroRest.style.transition = "opacity 0.8s ease";
  
  AOS.refresh();

  // Intercept contact form submission to prevent Formspree redirect
  if (DOM.form) {
    DOM.form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const action = form.getAttribute('action');
      const method = form.getAttribute('method') || 'POST';
      try {
        const response = await fetch(action, {
          method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          // Redirect to thank you page
          window.location.href = 'thankyou.html';
        } else {
          // Optionally show an error message
          alert('There was a problem submitting the form.');
        }
      } catch (err) {
        alert('There was a problem submitting the form.');
      }
    });
  }
});
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
 
  // Event Listeners
  DOM.burger?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
    DOM.burger.classList.toggle('active');
  });

  // Optimized scroll handler


 
  
});

  document.getElementById('currentYear').textContent = new Date().getFullYear();



// Scroll up button visibility
window.addEventListener('scroll', throttle(() => {
  const scrolled = window.scrollY > 300;
  if (DOM.scrollUp) {
    DOM.scrollUp.style.display = scrolled ? 'block' : 'none';
  }
}, 100));

// Scroll up button click handler
if (DOM.scrollUp) {
  DOM.scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.addEventListener('scroll', () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progress = `${(scrolled / scrollable) * 100}%`;
  scrollProgress.style.width = progress;
});


document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', '/' + sectionId);
      }
    }
  });
});

// Optional: Handle browser back/forward navigation
window.addEventListener('popstate', function() {
  const sectionId = window.location.pathname.replace('/', '');
  if (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
});


