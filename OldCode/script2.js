(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "0BTonjp4iBF33pc3Q",
    });
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('contact_service', 'contact_form', this)
        .then(() => {
          console.log('Success !!')
          Swal.fire({
            title: "Whoosh!!",
            text: "Message delivered like a pro! 🚀 Keep an eye on your inbox!",
            imageUrl: "https://cdn.dribbble.com/users/1525393/screenshots/5419988/dfsd.gif",
            imageWidth: 300,
            imageAlt: "message sent",
            timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
          });

            }, (error) => {
              Swal.fire({
                title: "Uh-Oh!!",
                text: "Message delivery failed! 😅 No worries, just hit that send button one more time! 🚀",
                imageUrl: "https://cdn.dribbble.com/users/1088653/screenshots/9331108/untitled_artwork.gif",
                imageWidth: 300,
                imageAlt: "message sent",
                timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
              });
            });
    });
}

// Projects Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.project-card');
  const indicators = document.querySelectorAll('.indicator');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  let currentIndex = 0;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  // Initialize
  function init() {
    // Set initial position
    updateCarousel();
    
    // Add touch events for mobile
    cards.forEach(card => {
      card.addEventListener('touchstart', e => {
        if (e.target.closest('.project-links')) return;
        e.preventDefault();
        startPos = e.touches[0].clientX;
        isDragging = true;
      });
      
      card.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        const diff = currentPosition - startPos;
        
        if (Math.abs(diff) > 30) { // Threshold for swipe
          e.preventDefault();
          currentTranslate = prevTranslate + diff;
          updateTransform();
        }
      });
      
      card.addEventListener('touchend', e => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        
        if (Math.abs(movedBy) > 100) { // Threshold for slide change
          if (movedBy < 0 && currentIndex < cards.length - 1) {
            currentIndex++;
          } else if (movedBy > 0 && currentIndex > 0) {
            currentIndex--;
          }
        }
        
        updateCarousel();
      });
      
      // Add click/touch event for card flip
      card.addEventListener('click', function(e) {
        if (e.target.closest('.project-links')) return;
        this.classList.toggle('touch-flip');
      });
    });
  }

  // Update carousel position
  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    currentTranslate = -currentIndex * cardWidth;
    prevTranslate = currentTranslate;
    updateTransform();
    updateIndicators();
  }

  // Update transform
  function updateTransform() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Update indicators
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  // Navigation buttons
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Handle window resize
  window.addEventListener('resize', updateCarousel);

  // Initialize carousel
  init();
});
// $(document).ready(function(){
//   $(window).scroll(function(){
//     $('.intro-text').css('display', 'none');
//     $(".intro-text").slideDown(1000);
//   });  
//   });


//  let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }

// // ——————————————————————————————————————————————————
// // TextScramble
// // ——————————————————————————————————————————————————

// class TextScramble {
//   constructor(el) {
//     this.el = el;
//     this.chars = "!<>-_\\/[]{}—=+*^?#________";
//     this.update = this.update.bind(this);
//   }
//   setText(newText) {
//     const oldText = this.el.innerText;
//     const length = Math.max(oldText.length, newText.length);
//     const promise = new Promise(resolve => this.resolve = resolve);
//     this.queue = [];
//     for (let i = 0; i < length; i++) {
//       const from = oldText[i] || '';
//       const to = newText[i] || '';
//       const start = Math.floor(Math.random() * 40);
//       const end = start + Math.floor(Math.random() * 40);
//       this.queue.push({ from, to, start, end });
//     }
//     cancelAnimationFrame(this.frameRequest);
//     this.frame = 0;
//     this.update();
//     return promise;
//   }
//   update() {
//     let output = "";
//     let complete = 0;
//     for (let i = 0, n = this.queue.length; i < n; i++) {
//       let { from, to, start, end, char } = this.queue[i];
//       if (this.frame >= end) {
//         complete++;
//         output += to;
//       } else if (this.frame >= start) {
//         if (!char || Math.random() < 0.28) {
//           char = this.randomChar();
//           this.queue[i].char = char;
//         }
//         output += `<span class="dud">${char}</span>`;
//       } else {
//         output += from;
//       }
//     }
//     this.el.innerHTML = output;
//     if (complete === this.queue.length) {
//       this.resolve();
//     } else {
//       this.frameRequest = requestAnimationFrame(this.update);
//       this.frame++;
//     }
//   }
//   randomChar() {
//     return this.chars[Math.floor(Math.random() * this.chars.length)];
//   }}


// // ——————————————————————————————————————————————————
// // Example
// // ——————————————————————————————————————————————————

// const phrases = [
// "Neo,",
// "sooner or later",
// "you're going to realize",
// "Just as I did",
// "that there's a difference",
// "between knowing the path",
// "and walking the path"];


// const el = document.querySelector(".text");
// const fx = new TextScramble(el);

// let counter = 0;
// const next = () => {
//   fx.setText(phrases[counter]).then(() => {
//     setTimeout(next, 800);
//   });
//   counter = (counter + 1) % phrases.length;
// };

// next();

