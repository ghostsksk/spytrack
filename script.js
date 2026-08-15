// Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-item');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    }
  });
});

// Sombra no Header ao rolar a página
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Efeito de Digitação (Typewriter)
const words = ["escalar suas vendas.", "destacar sua marca.", "criar seu e-commerce."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 1800;
const targetElement = document.getElementById('typewriter');

function typeEffect() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    targetElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    targetElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, delayBetweenWords);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
  setTimeout(typeEffect, currentSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// Animação ao rolar a tela (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));