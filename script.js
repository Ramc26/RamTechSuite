// Initialize AOS for scroll animations
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Particle Background System
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 80;
    this.mouse = { x: null, y: null, radius: 150 };
    
    this.init();
  }
  
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
    
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
    
    this.animate();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((p, i) => {
      // Move particles
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off walls
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          p.vx -= Math.cos(angle) * force * 0.2;
          p.vy -= Math.sin(angle) * force * 0.2;
        }
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(253, 172, 85, 0.7)';
      this.ctx.fill();
      
      // Connect nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(14, 110, 136, ${1 - distance / 100})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize Particle System
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});

// Page-load preloader with progress + emoji scramble (5 seconds)
document.addEventListener('DOMContentLoaded', () => {
  const emojis = ['💻','🤖','🚀','⚙️','🧠','☁️'];
  let progress = 0;
  const bar = document.getElementById('progress-bar');
  const emo = document.getElementById('emoji-scramble');
  const preloader = document.getElementById('preloader');

  if (preloader) {
    const interval = setInterval(() => {
      progress += 2; // Changed from 10 to 2 to make it 5 seconds (50 intervals * 100ms = 5000ms)
      if (bar) bar.style.width = progress + '%';
      if (emo) emo.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      
      if (progress >= 100) {
        clearInterval(interval);
        preloader.style.opacity = 0;
        setTimeout(() => {
          preloader.remove();
          // Add page reveal animation
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
            document.body.style.opacity = '1';
          }, 50);
        }, 500);
      }
    }, 100); // 100ms interval for smoother animation
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

// Scroll Progress Indicator
function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
}

// Parallax Effect for Sections
function handleParallax() {
  const sections = document.querySelectorAll('.hero, .cert-section, .skills-section, .timeline-section, .projects-section');
  sections.forEach(section => {
    const scrolled = window.pageYOffset;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrolled;
    const offset = (scrolled - sectionTop) * 0.5;
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.style.backgroundPositionY = offset + 'px';
    }
  });
}

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
  
  updateScrollProgress();
  handleParallax();
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

// Enhanced Custom Cursor with Trail
const cursor = document.querySelector('.custom-cursor');
const cursorInner = document.querySelector('.cursor-inner');
const cursorTrail = document.querySelector('.cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
    if (cursorInner) {
      cursorInner.style.left = mouseX + 'px';
      cursorInner.style.top = mouseY + 'px';
    }
});

// Smooth trailing cursor
function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  
  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }
  
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor hover effects
document.querySelectorAll('a, button, .skill-card, .timeline-item, .project-card, .nav-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.classList.add('hover');
      if (cursorTrail) cursorTrail.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.classList.remove('hover');
      if (cursorTrail) cursorTrail.style.opacity = '0.6';
    });
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
    // Subtract 2 years and 5 months (Masters study period) from total experience
    const mastersYears = 2;
    const mastersMonths = 2;
    const mastersDaysToSubtract = (mastersYears * 365.25) + (mastersMonths * 30.44);
    
    function updateCounter() {
      const now = new Date();
      let diff = now - startDate;
      
      // Subtract Masters study period (in milliseconds)
      diff -= mastersDaysToSubtract * 24 * 60 * 60 * 1000;
      
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

// Ripple Effect on Buttons and Cards
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple-effect');
  
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-primary, .btn-outline, .skill-card, .project-card').forEach(el => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', createRipple);
  });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .skill-icon {
    transition: transform 0.3s ease;
  }
  
  .skill-card:hover .skill-icon {
    transform: rotateY(360deg);
  }
  
  .social-links a {
    animation: float 3s ease-in-out infinite;
  }
  
  .social-links a:nth-child(2) { animation-delay: 0.2s; }
  .social-links a:nth-child(3) { animation-delay: 0.4s; }
  .social-links a:nth-child(4) { animation-delay: 0.6s; }
  .social-links a:nth-child(5) { animation-delay: 0.8s; }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  .timeline-item {
    transition: all 0.3s ease;
  }
  
  .timeline-item:hover {
    transform: translateX(10px);
  }
  
  .timeline-item:nth-child(even):hover {
    transform: translateX(-10px);
  }
`;
document.head.appendChild(style);

// Add shake animation to emoji counter on hover
document.addEventListener('DOMContentLoaded', () => {
  const expCounter = document.querySelector('.exp-counter');
  if (expCounter) {
    expCounter.style.cursor = 'pointer';
    expCounter.addEventListener('mouseenter', function() {
      this.style.animation = 'shake 0.5s';
    });
    expCounter.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  }
});

// Add shake keyframe
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// Intersection Observer for Enhanced Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.skill-card, .timeline-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Add tilt effect to skill cards (desktop only)
document.addEventListener('DOMContentLoaded', () => {
  // Only enable tilt on devices with hover capability (desktops)
  if (window.matchMedia('(hover: hover)').matches) {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      });
    });
  }
});

// Add Easter Egg: Konami Code
document.addEventListener('DOMContentLoaded', () => {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
      style.remove();
    }, 5000);
    
    // Track achievement
    window.unlockAchievement && window.unlockAchievement('konami_code');
    
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: '🎉 Konami Code Activated!',
        text: 'You discovered the legendary cheat code! Achievement unlocked! 🏆',
        icon: 'success',
        confirmButtonColor: '#0e6e88'
      });
    }
  }
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
  // Press 'H' to go to home
  if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
    const target = document.querySelector('#home');
    if (target && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape') {
    const navCollapse = document.querySelector('.navbar-collapse');
    if (navCollapse && navCollapse.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.click();
    }
  }
});

// Add performance monitoring and secret console messages
if (window.performance) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`🚀 Page loaded in ${pageLoadTime}ms`);
    
    // Secret console messages
    console.log('%c🎮 HEY THERE, CURIOUS DEVELOPER! 🎮', 'color: #FDAC55; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
    console.log('%cLooking for easter eggs? Here are some hints:', 'color: #0e6e88; font-size: 14px; font-weight: bold;');
    console.log('%c1. 🕹️ Try the Konami Code: ↑↑↓↓←→←→BA (or 🎮 button on mobile!)', 'color: #ffffff; font-size: 12px;');
    console.log('%c2. 🖱️ Click the logo 10 times', 'color: #ffffff; font-size: 12px;');
    console.log('%c3. 🎯 Double-click any section title', 'color: #ffffff; font-size: 12px;');
    console.log('%c4. ⌨️ Press "H" to jump to home (or 🎮 menu on mobile)', 'color: #ffffff; font-size: 12px;');
    console.log('%c5. 🎨 Hold Shift and scroll for a surprise', 'color: #ffffff; font-size: 12px;');
    console.log('%c6. 🌟 Type "magic" anywhere on the page', 'color: #ffffff; font-size: 12px;');
    console.log('%c📱 On mobile? Look for the 🎮 button!', 'color: #FDAC55; font-size: 13px; font-weight: bold;');
    console.log('%c\n💡 Hints will pop up randomly as you explore! Find all 10 Easter eggs and email me! 🏆', 'color: #FDAC55; font-size: 14px; font-weight: bold;');
  });
}

// Logo Click Counter Easter Egg
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.rubik-80s-fade-regular');
  const clickCounter = document.getElementById('click-counter');
  let logoClicks = 0;
  let clickTimeout;
  
  if (logo && clickCounter) {
    logo.addEventListener('click', () => {
      logoClicks++;
      
      // Show counter
      clickCounter.textContent = `🎯 ${logoClicks}/10 clicks`;
      clickCounter.style.opacity = '1';
      
      // Reset timeout
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        clickCounter.style.opacity = '0';
        logoClicks = 0;
      }, 3000);
      
      // Add bounce effect
      logo.style.transform = 'scale(1.2) rotate(5deg)';
      setTimeout(() => {
        logo.style.transform = 'scale(1) rotate(0deg)';
      }, 200);
      
      // Easter egg at 10 clicks
      if (logoClicks === 10) {
        clearTimeout(clickTimeout);
        clickCounter.style.opacity = '0';
        logoClicks = 0;
        
        activateLogoEasterEgg();
      }
    });
  }
  
  function activateLogoEasterEgg() {
    // Create confetti effect
    const colors = ['#FDAC55', '#0e6e88', '#D8B5FF', '#F7E987'];
    for (let i = 0; i < 50; i++) {
      createConfetti(colors[Math.floor(Math.random() * colors.length)]);
    }
    
    // Track achievement
    window.unlockAchievement && window.unlockAchievement('logo_clicker');
    
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: '🎊 Achievement Unlocked!',
        text: 'You found the "Persistent Clicker" badge! You\'re now officially part of the 1% who explore everything!',
        icon: 'success',
        confirmButtonColor: '#0e6e88',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif")
          left top
          no-repeat
        `
      });
    }
  }
  
  function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${color};
      top: ${Math.random() * 100}vh;
      left: ${Math.random() * 100}vw;
      opacity: 1;
      pointer-events: none;
      z-index: 10001;
      border-radius: 50%;
    `;
    document.body.appendChild(confetti);
    
    const duration = 1000 + Math.random() * 2000;
    const tx = (Math.random() - 0.5) * 500;
    const ty = Math.random() * 500 + 500;
    
    confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => confetti.remove(), duration);
  }
});

// Double-click section titles for surprises
document.addEventListener('DOMContentLoaded', () => {
  const sectionTitles = document.querySelectorAll('.section-title');
  const messages = [
    '✨ You found a hidden message!',
    '🎨 Color magician at work!',
    '🌈 Reality is now bendable!',
    '⚡ Power-up activated!',
    '🎭 The matrix revealed!',
    '🔮 Future is being decoded...'
  ];
  
  sectionTitles.forEach((title, index) => {
    title.addEventListener('dblclick', () => {
      // Random effect
      const effects = [
        () => {
          title.style.animation = 'none';
          setTimeout(() => {
            title.style.animation = 'rainbow 2s';
          }, 10);
          setTimeout(() => {
            title.style.animation = '';
          }, 2000);
        },
        () => {
          title.style.transform = 'scale(1.5) rotate(360deg)';
          setTimeout(() => {
            title.style.transform = '';
          }, 1000);
        },
        () => {
          const originalText = title.textContent;
          const scrambleInterval = setInterval(() => {
            title.textContent = originalText.split('').sort(() => Math.random() - 0.5).join('');
          }, 100);
          setTimeout(() => {
            clearInterval(scrambleInterval);
            title.textContent = originalText;
          }, 1000);
        }
      ];
      
      effects[Math.floor(Math.random() * effects.length)]();
      
      // Show message
      showSecretMessage(messages[index % messages.length]);
      
      // Track achievement (first double-click only)
      if (!title.getAttribute('data-double-clicked')) {
        title.setAttribute('data-double-clicked', 'true');
        window.unlockAchievement && window.unlockAchievement('section_explorer');
      }
    });
  });
});

function showSecretMessage(text) {
  const messageDiv = document.getElementById('secret-message');
  if (!messageDiv) return;
  
  messageDiv.textContent = text;
  messageDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(45deg, #0e6e88, #FDAC55);
    color: white;
    padding: 20px 40px;
    border-radius: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    z-index: 10001;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    display: block;
    animation: messagePopup 2s ease-out forwards;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes messagePopup {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
      20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
    style.remove();
  }, 2000);
}

// Shift + Scroll Easter Egg
let shiftHeld = false;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Shift') shiftHeld = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') shiftHeld = false;
});

let scrollTimeout;
window.addEventListener('scroll', () => {
  if (shiftHeld) {
    document.body.style.filter = `hue-rotate(${window.scrollY % 360}deg)`;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.style.filter = '';
    }, 1000);
  }
});

// Secret Word Typing Easter Egg
let typedWord = '';
const secretWords = {
  'magic': () => {
    document.body.style.animation = 'rainbow 3s infinite';
    showSecretMessage('🪄 Magic Mode Activated!');
    window.unlockAchievement && window.unlockAchievement('magic_word');
    setTimeout(() => {
      document.body.style.animation = '';
    }, 3000);
  },
  'developer': () => {
    showSecretMessage('👨‍💻 Hello, fellow developer!');
    window.unlockAchievement && window.unlockAchievement('dev_greeting');
  },
  'ram': () => {
    showSecretMessage('🎯 That\'s me! Thanks for visiting!');
    window.unlockAchievement && window.unlockAchievement('name_finder');
  },
  'awesome': () => {
    showSecretMessage('😊 You\'re awesome too!');
    window.unlockAchievement && window.unlockAchievement('positivity');
  }
};

document.addEventListener('keypress', (e) => {
  // Only track if not in input field
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  typedWord += e.key.toLowerCase();
  
  // Keep only last 15 characters
  if (typedWord.length > 15) {
    typedWord = typedWord.slice(-15);
  }
  
  // Check for secret words
  Object.keys(secretWords).forEach(word => {
    if (typedWord.includes(word)) {
      secretWords[word]();
      typedWord = '';
    }
  });
});

// Random floating emojis on skill card hover
document.addEventListener('DOMContentLoaded', () => {
  const skillCards = document.querySelectorAll('.skill-card');
  const emojis = ['⚡', '🚀', '💡', '✨', '🎯', '🔥', '💻', '🤖'];
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      if (Math.random() > 0.7) { // 30% chance
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const floatingEmoji = document.createElement('div');
        const rect = this.getBoundingClientRect();
        
        floatingEmoji.textContent = emoji;
        floatingEmoji.style.cssText = `
          position: fixed;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top}px;
          font-size: 2rem;
          pointer-events: none;
          z-index: 9999;
          animation: floatUpEmoji 2s ease-out forwards;
        `;
        
        document.body.appendChild(floatingEmoji);
        
        setTimeout(() => floatingEmoji.remove(), 2000);
      }
    });
  });
  
  const floatStyle = document.createElement('style');
  floatStyle.textContent = `
    @keyframes floatUpEmoji {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
    }
  `;
  document.head.appendChild(floatStyle);
});

// Secret shake on long press
let pressTimer;
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    hero.addEventListener('mousedown', () => {
      pressTimer = setTimeout(() => {
        document.body.style.animation = 'shake 0.5s';
        showSecretMessage('🌪️ Earthquake Mode!');
        setTimeout(() => {
          document.body.style.animation = '';
        }, 500);
      }, 2000);
    });
    
    hero.addEventListener('mouseup', () => {
      clearTimeout(pressTimer);
    });
    
    hero.addEventListener('mouseleave', () => {
      clearTimeout(pressTimer);
    });
  }
});

// Random mysterious messages near cursor
let messageShown = false;
document.addEventListener('DOMContentLoaded', () => {
  const mysteriousMessages = [
    '👀 Still exploring?',
    '🎯 Found all the secrets yet?',
    '✨ Magic is everywhere...',
    '🕵️ Keep looking...',
    '🎮 Try the Konami Code!',
    '🖱️ Click click click...'
  ];
  
  // Show random message after 30 seconds of activity
  setTimeout(() => {
    if (!messageShown && Math.random() > 0.5) {
      messageShown = true;
      const randomMsg = mysteriousMessages[Math.floor(Math.random() * mysteriousMessages.length)];
      showSecretMessage(randomMsg);
      
      // Reset after showing
      setTimeout(() => {
        messageShown = false;
      }, 60000); // Can show again after 1 minute
    }
  }, 30000);
});

// Secret achievement tracker in localStorage
document.addEventListener('DOMContentLoaded', () => {
  const achievements = JSON.parse(localStorage.getItem('portfolio_achievements') || '{}');
  
  // Track unique achievements
  window.unlockAchievement = function(name) {
    if (!achievements[name]) {
      achievements[name] = {
        unlocked: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('portfolio_achievements', JSON.stringify(achievements));
      
      // Show achievement count in console
      const count = Object.keys(achievements).length;
      console.log(`%c🏆 Achievement Unlocked: ${name}`, 'color: gold; font-size: 14px; font-weight: bold;');
      console.log(`%c📊 Total Achievements: ${count}/10`, 'color: #0e6e88; font-size: 12px;');
      
      // Secret message for getting all achievements
      if (count >= 10) {
        Swal.fire({
          title: '🏆 Master Explorer!',
          html: 'You\'ve discovered ALL hidden features!<br><br>🎉 You are now a certified Portfolio Explorer!<br><br>Thanks for being so curious! 💖',
          icon: 'success',
          confirmButtonColor: '#0e6e88',
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          }
        });
      }
    }
  };
  
  // Show achievement count on load (in console)
  if (Object.keys(achievements).length > 0) {
    console.log(`%c🏆 Your Progress: ${Object.keys(achievements).length}/10 achievements unlocked!`, 'color: gold; font-size: 14px;');
  }
});

// Update existing easter eggs to track achievements
document.addEventListener('DOMContentLoaded', () => {
  // Track Konami Code
  const originalKonamiSuccess = document.querySelector('.konami-code-success');
  
  // Track logo clicks
  const originalLogo = document.querySelector('.rubik-80s-fade-regular');
  if (originalLogo) {
    originalLogo.addEventListener('click', function handler() {
      if (this.getAttribute('data-clicks') === '10') {
        window.unlockAchievement('logo_clicker');
      }
    });
  }
});

// Easter Egg: Spin the page with Ctrl+Shift+S
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
    e.preventDefault();
    document.body.style.transition = 'transform 2s ease-in-out';
    document.body.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
      document.body.style.transform = '';
      document.body.style.transition = '';
    }, 2000);
    
    showSecretMessage('🌀 Spinning Time!');
    window.unlockAchievement && window.unlockAchievement('spinner');
  }
});

// Secret: Click experience counter 3 times fast
document.addEventListener('DOMContentLoaded', () => {
  const expCounter = document.getElementById('exp-counter');
  if (expCounter) {
    let clickCount = 0;
    let clickTimer;
    
    expCounter.addEventListener('click', () => {
      clickCount++;
      
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 1000);
      
      if (clickCount === 3) {
        clickCount = 0;
        showSecretMessage('⏰ Time flies when you\'re coding!');
        window.unlockAchievement && window.unlockAchievement('time_traveler');
      }
    });
  }
});

// ========== MOBILE SHORTCUTS MENU ==========
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobile-shortcuts');
  const mobileMenu = document.getElementById('mobile-shortcuts-menu');
  const shortcutBtns = document.querySelectorAll('.mobile-shortcut-btn');
  
  if (mobileBtn && mobileMenu) {
    // Toggle menu
    mobileBtn.addEventListener('click', () => {
      const isVisible = mobileMenu.style.display === 'block';
      mobileMenu.style.display = isVisible ? 'none' : 'block';
      mobileBtn.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.style.display = 'none';
        mobileBtn.style.transform = 'rotate(0deg)';
      }
    });
    
    // Handle shortcut actions
    shortcutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        
        switch(action) {
          case 'home':
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
            showSecretMessage('🏠 Welcome Home!');
            window.unlockAchievement && window.unlockAchievement('mobile_navigator');
            break;
            
          case 'konami':
            // Trigger Konami Code effect
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
              document.body.style.animation = '';
            }, 5000);
            window.unlockAchievement && window.unlockAchievement('konami_code');
            if (typeof Swal !== 'undefined') {
              Swal.fire({
                title: '🎉 Konami Code Activated!',
                text: 'You discovered the legendary cheat code! Achievement unlocked! 🏆',
                icon: 'success',
                confirmButtonColor: '#0e6e88'
              });
            }
            break;
            
          case 'spin':
            document.body.style.transition = 'transform 2s ease-in-out';
            document.body.style.transform = 'rotate(360deg)';
            setTimeout(() => {
              document.body.style.transform = '';
              document.body.style.transition = '';
            }, 2000);
            showSecretMessage('🌀 Spinning Time!');
            window.unlockAchievement && window.unlockAchievement('spinner');
            break;
            
          case 'magic':
            document.body.style.animation = 'rainbow 3s infinite';
            showSecretMessage('🪄 Magic Mode Activated!');
            window.unlockAchievement && window.unlockAchievement('magic_word');
            setTimeout(() => {
              document.body.style.animation = '';
            }, 3000);
            break;
        }
        
        // Close menu after action
        mobileMenu.style.display = 'none';
        mobileBtn.style.transform = 'rotate(0deg)';
      });
    });
  }
});

// ========== SCROLL TRACKING & DYNAMIC HINT SYSTEM ==========
document.addEventListener('DOMContentLoaded', () => {
  const scrollTracker = {
    startTime: Date.now(),
    hasScrolledToBottom: false,
    footerMessageShown: false,
    scrollStarted: false,
    highestScroll: 0,
    hintsShown: [],
    hintTimer: null,
    
    // All available hints
    allHints: [
      { id: 'konami', text: '🕹️ Try the classic Konami Code: ↑↑↓↓←→←→BA (or tap the 🎮 button on mobile!)' },
      { id: 'logo', text: '🖱️ Click the "RamTechSuite" logo 10 times for a confetti surprise!' },
      { id: 'sections', text: '🎯 Double-click any section title (like "What I Do") for random magical effects!' },
      { id: 'magic', text: '🪄 Type "magic" anywhere on the page (not in input fields!) for rainbow mode!' },
      { id: 'developer', text: '👨‍💻 Type "developer" to get a special greeting from a fellow coder!' },
      { id: 'counter', text: '⏰ Click the experience counter (the one showing years/months) 3 times quickly!' },
      { id: 'spin', text: '🌀 Press Ctrl+Shift+S to spin the entire page 360° (or use 🎮 menu!)' },
      { id: 'ram', text: '🎯 Type "ram" anywhere on the page to get a personal message!' },
      { id: 'awesome', text: '😊 Type "awesome" to spread some positivity!' }
    ],
    
    checkScrollProgress() {
      const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Track highest scroll
      if (scrollPercent > this.highestScroll) {
        this.highestScroll = scrollPercent;
      }
      
      // Check if scrolled to bottom (at least 95%)
      if (scrollPercent >= 95 && !this.hasScrolledToBottom) {
        this.hasScrolledToBottom = true;
        console.log('✅ Full page scroll completed! Hint system activated!');
        
        // Show footer message once
        if (!this.footerMessageShown) {
          this.footerMessageShown = true;
          setTimeout(() => {
            if (typeof Swal !== 'undefined') {
              Swal.fire({
                title: '🎯 Achievement Zone Reached!',
                html: `
                  <p style="margin: 15px 0; font-size: 1.1rem; line-height: 1.6;">
                    Great job exploring! Now the real fun begins... 🎮
                  </p>
                  <p style="margin: 15px 0; font-size: 1rem; line-height: 1.6;">
                    <strong>💡 Easter Egg hints will pop up randomly as you continue scrolling!</strong>
                  </p>
                  <p style="margin: 15px 0; font-size: 0.95rem; line-height: 1.6; color: #666;">
                    There are <strong style="color: #FDAC55;">10 hidden Easter Eggs</strong> total. Find them all and email me at 
                    <strong style="color: #0e6e88;">rambikkina@zohomail.in</strong> with your discoveries for a <strong style="color: #FDAC55;">special surprise</strong>! 🏆
                  </p>
                  <p style="margin: 15px 0; font-size: 0.9rem; font-style: italic; opacity: 0.8;">
                    Remember: Use your keyboard, mouse, and imagination! 🔍✨
                  </p>
                `,
                icon: 'success',
                confirmButtonColor: '#0e6e88',
                confirmButtonText: 'Let\'s Go! 🚀'
              });
            }
          }, 1000);
        }
        
        // Start hint timer after reaching bottom
        this.startHintTimer();
      }
      
      // Start tracking after first scroll
      if (scrollPercent > 5 && !this.scrollStarted) {
        this.scrollStarted = true;
        this.startTime = Date.now();
        console.log('🎯 Scroll tracking started!');
      }
    },
    
    shouldShowHint() {
      const timeElapsed = Date.now() - this.startTime;
      const oneMinute = 60000; // 1 minute in milliseconds
      
      // Conditions: 1 minute passed AND scrolled to bottom at least once
      return timeElapsed >= oneMinute && this.hasScrolledToBottom;
    },
    
    getRandomUnshownHint() {
      const unshownHints = this.allHints.filter(h => !this.hintsShown.includes(h.id));
      if (unshownHints.length === 0) {
        // Reset if all hints shown
        this.hintsShown = [];
        console.log('🔄 All hints shown! Resetting hint pool...');
        return this.allHints[Math.floor(Math.random() * this.allHints.length)];
      }
      return unshownHints[Math.floor(Math.random() * unshownHints.length)];
    },
    
    showDynamicHint() {
      if (!this.shouldShowHint()) return;
      
      const hint = this.getRandomUnshownHint();
      if (!hint) return;
      
      this.hintsShown.push(hint.id);
      
      const hintDiv = document.getElementById('dynamic-hint');
      const hintContent = document.getElementById('hint-content');
      
      if (hintDiv && hintContent) {
        hintContent.textContent = hint.text;
        hintDiv.style.display = 'block';
        
        // Auto-hide after 12 seconds
        setTimeout(() => {
          hintDiv.style.display = 'none';
        }, 12000);
      }
      
      console.log(`💡 Hint revealed: ${hint.id} (${this.hintsShown.length}/${this.allHints.length})`);
    },
    
    startHintTimer() {
      // Clear any existing timer
      if (this.hintTimer) {
        clearInterval(this.hintTimer);
      }
      
      // Show first hint after 1 minute, then every 1-2 minutes
      this.hintTimer = setInterval(() => {
        if (this.shouldShowHint() && Math.random() > 0.3) { // 70% chance
          this.showDynamicHint();
        }
      }, 60000); // Check every minute
    }
  };
  
  // Track scroll
  window.addEventListener('scroll', () => {
    scrollTracker.checkScrollProgress();
  });
  
  // Also try to show hint on scroll pause after conditions are met (15% chance)
  let scrollHintTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollHintTimeout);
    scrollHintTimeout = setTimeout(() => {
      if (scrollTracker.shouldShowHint() && Math.random() > 0.85) {
        scrollTracker.showDynamicHint();
      }
    }, 3000); // After 3 seconds of no scrolling
  });
  
  // Close hint button
  const closeHintBtn = document.getElementById('close-hint');
  if (closeHintBtn) {
    closeHintBtn.addEventListener('click', () => {
      document.getElementById('dynamic-hint').style.display = 'none';
    });
  }
  
  // Log progress for debugging (every 30 seconds)
  setInterval(() => {
    if (scrollTracker.scrollStarted) {
      const elapsed = Math.floor((Date.now() - scrollTracker.startTime) / 1000);
      console.log(`📊 Explorer Stats: ${elapsed}s active | ${scrollTracker.highestScroll.toFixed(1)}% scrolled | Full scroll: ${scrollTracker.hasScrolledToBottom} | Hints revealed: ${scrollTracker.hintsShown.length}/10`);
    }
  }, 30000);
});