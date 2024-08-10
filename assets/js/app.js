const text = "Hi, I am Haleem";
const typingText = document.getElementById("typing-text");
const heroRest = document.getElementById("hero-rest");
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typingText.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  } else {
    // Fade in the rest of the hero content after typing is done
    heroRest.style.opacity = "1";
    // Refresh AOS to trigger animations
    AOS.refresh();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  typeWriter();
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});




// Nav hamburgerburger selections
const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

// Scroll to top selection
const scrollUp = document.querySelector("#scroll-up");
var mybutton = document.getElementById("#scroll-up")

// Select nav links
const navLink = document.querySelectorAll(".nav-link");

// Hamburger menu function
burger.addEventListener("click", () => {
  ul.classList.toggle("show");
});

// Close hamburger menu when a link is clicked
navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);

// scroll to top functionality
function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// document.addEventListener('DOMContentLoaded', function() {
//   const burger = document.querySelector('.burger');
//   const nav = document.querySelector('.nav-links');

//   burger.addEventListener('click', function() {
//     nav.classList.toggle('show');
//   });
// });


