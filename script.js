// Initialize AOS for scroll animations
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Page-load preloader with progress + emoji scramble
document.addEventListener('DOMContentLoaded', () => {
  const emojis = ['💻','🤖','🚀','⚙️','🧠','☁️'];
  let progress = 0;
  const bar = document.getElementById('progress-bar');
  const emo = document.getElementById('emoji-scramble');
  const preloader = document.getElementById('preloader');

  if (preloader) {
    const interval = setInterval(() => {
      progress += 10;
      if (bar) bar.style.width = progress + '%';
      if (emo) emo.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      
      if (progress >= 100) {
        clearInterval(interval);
        preloader.style.opacity = 0;
        setTimeout(() => preloader.remove(), 500);
      }
    }, 200);
  }
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
      if (backToTop) backToTop.classList.add('visible');
  } else {
      navbar.classList.remove('scrolled');
      if (backToTop) backToTop.classList.remove('visible');
  }
}
window.addEventListener('scroll', handleScroll);
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// EmailJS Form Submission
(function() {
  if (document.getElementById('contact-form')) {
    emailjs.init({ publicKey: "0BTonjp4iBF33pc3Q" });
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(() => {
                Swal.fire({ title: "Message Sent!", text: "I'll get back to you soon!", icon: "success", confirmButtonColor: '#0e6e88' });
                this.reset();
            })
            .catch((error) => {
                Swal.fire({ title: "Oops!", text: "Something went wrong. Please try again.", icon: "error", confirmButtonColor: '#0e6e88' });
                console.error('Email error:', error);
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
    });
  }
})();

// Text Scramble Effect
class TextScramble {
  constructor(el) { this.el = el; this.chars = '!<>-_\\/[]{}—=+*^?#________'; this.update = this.update.bind(this); }
  setText(newText) {
    const oldText = this.el.innerText; const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve); this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''; const to = newText[i] || ''; const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40); this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest); this.frame = 0; this.update(); return promise;
  }
  update() {
    let output = ''; let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; } 
      else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) { char = this.randomChar(); this.queue[i].char = char; }
        output += `<span class="dud">${char}</span>`;
      } else { output += from; }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) { this.resolve(); } 
    else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
  }
  randomChar() { return this.chars[Math.floor(Math.random() * this.chars.length)]; }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.scramble-text');
  if(el) {
    const phrases = ['Ram', 'a Developer', 'an Innovator', 'Agentic AI Dev'];
    const fx = new TextScramble(el); let counter = 0;
    const next = () => { fx.setText(phrases[counter]).then(() => { setTimeout(next, 2000); }); counter = (counter + 1) % phrases.length; };
    next();
  }
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorInner = document.querySelector('.cursor-inner');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorInner.style.left = e.clientX + 'px';
    cursorInner.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .skill-card, .timeline-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Projects Carousel
class ProjectsCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    if (!this.track) return;
    this.cards = Array.from(this.track.children);
    this.prevButton = document.querySelector('.carousel-button.prev');
    this.nextButton = document.querySelector('.carousel-button.next');
    this.indicatorsContainer = document.querySelector('.carousel-indicators');
    this.indicators = Array.from(this.indicatorsContainer.children);
    this.currentIndex = 0;
    this.cardWidth = 0;
    this.maxIndex = 0;
    this.touchStartX = 0;
    this.isSwiping = false;
    this.init();
  }
  init() {
    this.updateDimensions();
    window.addEventListener('resize', () => this.updateDimensions());
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());
    this.track.addEventListener('touchstart', e => this.handleTouchStart(e));
    this.track.addEventListener('touchmove', e => this.handleTouchMove(e));
    this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    this.cards.forEach(card => card.addEventListener('click', e => this.handleCardClick(e)));
    this.indicators.forEach((indicator, index) => indicator.addEventListener('click', () => this.goToIndex(index)));
    this.updateCarousel();
  }
  updateDimensions() {
    if (this.cards.length === 0) return;
    const viewportWidth = window.innerWidth;
    let cardsPerView = 3;

    if (viewportWidth <= 768) { 
      cardsPerView = 1; 
      this.cardWidth = this.track.parentElement.offsetWidth; 
    } else if (viewportWidth <= 1024) { 
      cardsPerView = 2; 
      const cardStyle = window.getComputedStyle(this.cards[0]);
      this.cardWidth = this.cards[0].offsetWidth + parseInt(cardStyle.marginRight);
    } else {
      cardsPerView = 3;
      const cardStyle = window.getComputedStyle(this.cards[0]);
      this.cardWidth = this.cards[0].offsetWidth + parseInt(cardStyle.marginRight);
    }
    
    this.maxIndex = Math.max(0, this.cards.length - cardsPerView);
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
    this.updateCarousel();
  }
  updateCarousel() {
    const offset = -this.currentIndex * this.cardWidth;
    this.track.style.transform = `translateX(${offset}px)`;
    this.indicators.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
    this.prevButton.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
    this.nextButton.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
  }
  handleTouchStart(e) { this.touchStartX = e.touches[0].clientX; this.isSwiping = false; }
  handleTouchMove(e) { if (Math.abs(e.touches[0].clientX - this.touchStartX) > 20) { this.isSwiping = true; } }
  handleTouchEnd(e) {
    if (this.isSwiping) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - touchEndX;
      if (Math.abs(diff) > 50) { diff > 0 ? this.next() : this.prev(); }
    }
    this.isSwiping = false;
  }
  handleCardClick(e) {
    if (this.isSwiping || e.target.closest('.project-links a')) return;
    if (window.matchMedia('(hover: none)').matches) {
      const cardInner = e.currentTarget.querySelector('.card-inner');
      this.cards.forEach(card => {
        if (card !== e.currentTarget) card.querySelector('.card-inner').classList.remove('flip');
      });
      cardInner.classList.toggle('flip');
    }
  }
  prev() { if (this.currentIndex > 0) { this.currentIndex--; this.updateCarousel(); } }
  next() { if (this.currentIndex < this.maxIndex) { this.currentIndex++; this.updateCarousel(); } }
  goToIndex(index) {
    this.currentIndex = Math.min(Math.max(0, index), this.maxIndex);
    this.updateCarousel();
  }
}
document.addEventListener('DOMContentLoaded', () => { new ProjectsCarousel(); });

// Certifications Slideshow
let certSlideIndex = 0;
showCertSlides();
function showCertSlides() {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if(slides.length === 0) return;
  for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
  certSlideIndex++;
  if (certSlideIndex > slides.length) { certSlideIndex = 1; }
  for (let i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", ""); }
  slides[certSlideIndex - 1].style.display = "block";
  dots[certSlideIndex - 1].className += " active";
  setTimeout(showCertSlides, 2500);
}

// Experience Counter & Resume Logic
document.addEventListener('DOMContentLoaded', () => {
  const expCounter = document.getElementById('exp-counter');
  if (expCounter) {
    const startDate = new Date('2020-07-01');
    function updateCounter() {
      const now = new Date();
      let diff = now - startDate;
      const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      diff -= years * (365.25 * 24 * 60 * 60 * 1000);
      const months = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
      diff -= months * (30.44 * 24 * 60 * 60 * 1000);
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      expCounter.textContent = `${years} Years, ${months} Months, ${days} Days`;
    }
    updateCounter();
    setInterval(updateCounter, 1000 * 60 * 60 * 24);
  }

  // Resume Print Button Functionality
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const resumeIframe = document.getElementById('resume-iframe');
      if (resumeIframe && resumeIframe.src) {
        resumeIframe.contentWindow.print();
      }
    });
  }

  // --- Resume Link Configuration ---
  const resumeIframe = document.getElementById('resume-iframe');
  if (resumeIframe) {
    // This is the "Publish to web" embed link.
    resumeIframe.src = "https://docs.google.com/document/d/e/2PACX-1vSuU577c7ut5byhEA62RMU0C8cLcCMEsqLpYYQQyIQhUMmU5s0V4xziHuQt4CxZVEdDrxA59fhwI8hj/pub?embedded=true";
  }

  const downloadBtn = document.getElementById('download-resume-btn');
  if (downloadBtn) {
    // IMPORTANT: Make sure your Google Doc sharing is set to "Anyone with the link can view" for this to work.
    const docId = "1hByg4zogKNdMbZhQV5cNaT4Oy8zlirdrS_I68xotHRw";
    downloadBtn.href = `https://docs.google.com/document/d/${docId}/export?format=pdf`;
  }
});