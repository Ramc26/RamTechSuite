// Initialize AOS for scroll animations
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Page-load preloader with progress + emoji scramble
document.addEventListener('DOMContentLoaded', () => {
const emojis = ['💻','👨🏻‍💻','🚀','⚙️','🔧','📂'];
let progress = 0;
const bar = document.getElementById('progress-bar');
const emo = document.getElementById('emoji-scramble');
const interval = setInterval(() => {
  progress += 10;
  bar.style.width = progress + '%';
  emo.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  if (progress >= 100) {
    clearInterval(interval);
    const pre = document.getElementById('preloader');
    pre.style.opacity = 0;
    setTimeout(() => pre.remove(), 500);
  }
}, 200);
});


// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});


// Navbar & Back-to-Top Button on Scroll
function handleScroll() {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
  } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
  }
}
window.addEventListener('scroll', handleScroll);

// EmailJS Form Submission
(function() {
  emailjs.init({ publicKey: "0BTonjp4iBF33pc3Q" });
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      emailjs.sendForm('contact_service', 'contact_form', this)
          .then(() => {
              Swal.fire({
                  title: "Message Sent!",
                  text: "I'll get back to you soon!",
                  icon: "success",
                  confirmButtonColor: '#0e6e88',
                  timer: 3000,
                  timerProgressBar: true
              });
              this.reset();
          })
          .catch((error) => {
              Swal.fire({
                  title: "Oops!",
                  text: "Something went wrong. Please try again later.",
                  icon: "error",
                  confirmButtonColor: '#0e6e88'
              });
              console.error('Email error:', error);
          })
          .finally(() => {
              submitButton.innerHTML = originalText;
              submitButton.disabled = false;
          });
  });
})();

// Text Scramble Effect
class TextScramble {
  constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
  }
  
  setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
  }
  
  update() {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < this.queue.length; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
              complete++;
              output += to;
          } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                  char = this.randomChar();
                  this.queue[i].char = char;
              }
              output += `<span class="dud">${char}</span>`;
          } else {
              output += from;
          }
      }
      
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
          this.resolve();
      } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
      }
  }
  
  randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Initialize Text Scramble Effect
document.addEventListener('DOMContentLoaded', () => {
  const phrases = ['Ram', 'Ramarao', 'Veera', 'Bikkina', 'itsmeramc'];
  const el = document.querySelector('.scramble-text');
  const fx = new TextScramble(el);
  let counter = 0;
  
  const next = () => {
      fx.setText(phrases[counter]).then(() => {
          setTimeout(next, 2000);
      });
      counter = (counter + 1) % phrases.length;
  };
  next();
});

// Custom Cursor Effect
class CustomCursor {
  constructor() {
      this.cursor = document.createElement('div');
      this.cursor.className = 'custom-cursor';
      document.body.appendChild(this.cursor);
      
      this.cursorinner = document.createElement('div');
      this.cursorinner.className = 'cursor-inner';
      document.body.appendChild(this.cursorinner);
      
      this.init();
  }
  
  init() {
      document.addEventListener('mousemove', e => {
          this.cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          this.cursorinner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
      
      document.querySelectorAll('a, button, .skill-card, .timeline-item').forEach(el => {
          el.addEventListener('mouseenter', () => {
              this.cursor.classList.add('hover');
              this.cursorinner.classList.add('hover');
          });
          el.addEventListener('mouseleave', () => {
              this.cursor.classList.remove('hover');
              this.cursorinner.classList.remove('hover');
          });
      });
  }
}

// Initialize Custom Cursor
new CustomCursor();

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  .custom-cursor {
      width: 20px;
      height: 20px;
      border: 2px solid var(--primary-color);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      transition: all 0.3s ease;
      z-index: 9999;
  }
  .cursor-inner {
      width: 6px;
      height: 6px;
      background-color: var(--secondary-color);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      transition: all 0.1s ease;
      z-index: 9999;
  }
  .custom-cursor.hover {
      transform: scale(1.5);
      background-color: rgba(14, 110, 136, 0.1);
  }
  .cursor-inner.hover {
      transform: scale(0.5);
  }
`;
document.head.appendChild(cursorStyle);

// Updated Projects Carousel with Mobile Card Flip Fix
class ProjectsCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.cards = document.querySelectorAll('.project-card');
    this.prevButton = document.querySelector('.carousel-button.prev');
    this.nextButton = document.querySelector('.carousel-button.next');
    this.indicators = document.querySelectorAll('.dot');
    this.currentIndex = 0;
    this.cardWidth = 0;
    this.maxIndex = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.isSwiping = false;
    this.init();
  }

  init() {
    this.updateDimensions();
    window.addEventListener('resize', () => this.updateDimensions());
    this.prevButton?.addEventListener('click', () => this.prev());
    this.nextButton?.addEventListener('click', () => this.next());
    
    // Use passive:false so we can call e.preventDefault()
    this.track.addEventListener('touchstart', e => this.handleTouchStart(e), { passive: false });
    this.track.addEventListener('touchmove', e => this.handleTouchMove(e), { passive: false });
    this.track.addEventListener('touchend', () => this.handleTouchEnd());
    
    this.cards.forEach(card => {
      card.addEventListener('click', e => this.handleCardClick(e));
      card.style.setProperty('--card-index', Array.from(this.cards).indexOf(card));
    });
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToIndex(index));
    });
    
    this.updateCarousel();
  }

  updateDimensions() {
    const card = this.cards[0];
    this.cardWidth = card.offsetWidth + parseInt(window.getComputedStyle(card).marginRight);
    const viewportWidth = window.innerWidth;
    let cardsPerView = 3;
    if (viewportWidth <= 768) {
      cardsPerView = 1;
    } else if (viewportWidth <= 1024) {
      cardsPerView = 2;
    }
    this.maxIndex = Math.max(0, this.cards.length - cardsPerView);
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
    this.updateCarousel();
  }

  updateCarousel() {
    const offset = -this.currentIndex * this.cardWidth;
    this.track.style.transform = `translateX(${offset}px)`;
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
    if (this.prevButton && this.nextButton) {
      this.prevButton.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
      this.nextButton.style.opacity = this.currentIndex === this.maxIndex ? '0.5' : '1';
    }
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.isSwiping = false; // Reset at start of touch
  }

  handleTouchMove(e) {
    if (!this.touchStartX || !this.touchStartY) return;
    this.touchEndX = e.touches[0].clientX;
    this.touchEndY = e.touches[0].clientY;
    
    // Calculate movement differences
    const xDiff = Math.abs(this.touchEndX - this.touchStartX);
    const yDiff = Math.abs(this.touchEndY - this.touchStartY);
    
    // Only treat as swipe if horizontal movement is clearly dominant and above threshold (e.g. 20px)
    if (xDiff > 20 && xDiff > yDiff) {
      this.isSwiping = true;
      e.preventDefault(); // Prevent scrolling during a horizontal swipe
    }
  }

  handleTouchEnd() {
    if (!this.touchStartX || !this.touchEndX) {
      this.resetTouch();
      return;
    }
    
    if (this.isSwiping) {
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }
    this.resetTouch();
  }

  resetTouch() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.isSwiping = false;
  }

  handleCardClick(e) {
    // If the user swiped, do not treat as a tap
    if (this.isSwiping) return;
    
    // Stop propagation so the carousel doesn't treat the tap as a swipe navigation
    e.stopPropagation();
    
    // If clicking on project-links, do nothing
    if (e.target.closest('.project-links')) return;
    
    // On mobile (hover: none), toggle the flip state on the card-inner element.
    if (window.matchMedia('(hover: none)').matches) {
      const cardInner = e.currentTarget.querySelector('.card-inner');
      // Optionally, remove flip from other cards:
      this.cards.forEach(card => {
        if (card !== e.currentTarget) {
          const inner = card.querySelector('.card-inner');
          inner.classList.remove('flip');
        }
      });
      cardInner.classList.toggle('flip');
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  goToIndex(index) {
    this.currentIndex = Math.min(Math.max(0, index), this.maxIndex);
    this.updateCarousel();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProjectsCarousel();
});

// Back to Top Button
document.querySelector('.back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Responsive Parallax Effect ----------
// Adjust the background position for sections as you scroll.
// On mobile devices, use a lower speed factor.
window.addEventListener('scroll', function() {
  const parallaxSections = document.querySelectorAll(
    '.hero, .cert-section, .skills-section, .timeline-section, .projects-section, .contact-section'
  );
  parallaxSections.forEach(section => {
    const bgImage = getComputedStyle(section).backgroundImage;
    if (bgImage && bgImage !== 'none') {
      let speedFactor = section.getAttribute('data-parallax-speed') || 0.3;
      if (window.innerWidth < 768) {
        speedFactor = 0.1;
      }
      const yPos = -(window.pageYOffset * speedFactor);
      section.style.backgroundPosition = 'center ' + yPos + 'px';
    }
  });
});

// ---------- Certifications Slideshow ----------
let certSlideIndex = 0;
showCertSlides();

function showCertSlides() {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  certSlideIndex++;
  if (certSlideIndex > slides.length) { certSlideIndex = 1; }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides[certSlideIndex - 1]) {
    slides[certSlideIndex - 1].style.display = "block";
    dots[certSlideIndex - 1].className += " active";
  }
  setTimeout(showCertSlides, 2000);
}  

// Add event listener for DOM content loaded to ensure all elements are available
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeComponents();
});

function initializeComponents() {
  // Check if navbar is present and initialize scroll behavior
  const navbar = document.querySelector('.navbar');
  if (navbar) {
      window.addEventListener('scroll', function() {
          if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
      });
  }

  // // Initialize mobile menu behavior
  (function() {
    const startDate = new Date('2020-07-01');
    // Subtract 1.5 years (18 months) for your MS study
    startDate.setMonth(startDate.getMonth() + 18);

    function updateCounter() {
      const now = new Date();
      let diff = now - startDate; // milliseconds

      // compute total days
      const totalDays = Math.floor(diff / (1000*60*60*24));
      // years, then remaining days
      const years = Math.floor(totalDays / 365);
      let daysLeft = totalDays - years*365;
      // months (approximate 30 days per month)
      const months = Math.floor(daysLeft / 30);
      const days = daysLeft - months*30;

      document.getElementById('exp-counter').textContent =
        years + ' Years, ' +
        months + ' Months, ' +
        days + ' Days';
    }

    // initialize and tick every day at midnight
    updateCounter();
    setInterval(updateCounter, 24*60*60*1000);
  })();

  // Initialize AOS (Animate on Scroll) with custom settings
  AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 50
  });

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Initialize form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Basic form validation
          const name = this.querySelector('#name').value.trim();
          const email = this.querySelector('#email').value.trim();
          const message = this.querySelector('#message').value.trim();
          
          if (!name || !email || !message) {
              Swal.fire({
                  title: 'Oops!',
                  text: 'Please fill in all fields',
                  icon: 'warning',
                  confirmButtonColor: '#0e6e88'
              });
              return;
          }
          
          if (!isValidEmail(email)) {
              Swal.fire({
                  title: 'Invalid Email',
                  text: 'Please enter a valid email address',
                  icon: 'warning',
                  confirmButtonColor: '#0e6e88'
              });
              return;
          }
          
          // If validation passes, submit the form
          submitForm(this);
      });
  }
}

// Email validation helper function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form submission helper function
function submitForm(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitButton.disabled = true;

  // Simulate form submission (replace with actual form submission logic)
  setTimeout(() => {
      Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully!',
          icon: 'success',
          confirmButtonColor: '#0e6e88'
      });
      
      form.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
  }, 1500);
}