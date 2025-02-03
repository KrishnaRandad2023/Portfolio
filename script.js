// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-quart'
});

// Particle Canvas Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
      this.reset();
  }

  reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.velocity = Math.random() * 0.5 + 0.5;
      this.size = Math.random() * 2;
      this.alpha = Math.random() * 0.5 + 0.1;
  }

  draw() {
      ctx.fillStyle = `rgba(100, 255, 218, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
  }

  update() {
      this.y -= this.velocity;
      if (this.y < 0) this.reset();
      this.draw();
  }
}

// Initialize particles
const particles = Array.from({ length: 100 }, () => new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => particle.update());
  requestAnimationFrame(animate);
}

animate();

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
  });
});

// Image Interaction
const profileImage = document.querySelector('.profile-image');
profileImage.addEventListener('mousemove', (e) => {
  const rect = profileImage.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  
  profileImage.style.transform = `
      scale(1.05)
      rotateX(${y * 10}deg)
      rotateY(${x * 10}deg)
  `;
});

profileImage.addEventListener('mouseleave', () => {
  profileImage.style.transform = 'scale(1) rotateX(0) rotateY(0)';
});

// Window Resize Handler
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});