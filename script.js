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

