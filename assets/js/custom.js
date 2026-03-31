// Scroll Animation: Reveal items on scroll
document.addEventListener("DOMContentLoaded", function() {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // Hero Slider Logic
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  if (slides.length > 0) {
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
});

// Parallax effect for hero
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero-custom');
  if (hero) {
    let offset = window.pageYOffset;
    // Shift background slightly to create depth without revealing edges
    hero.style.backgroundPositionY = (offset * 0.4) + 'px';
  }
});
