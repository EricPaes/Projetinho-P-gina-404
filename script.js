/* ================================================
   script.js – 404 page interactions
   ================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Hamburger / mobile menu ----
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close mobile menu when any link inside it is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ---- Ensure video plays (autoplay policy safety net) ----
const video = document.getElementById('monster-video');

if (video) {
  // Some browsers block autoplay without user gesture – attempt play on first interaction
  document.addEventListener('click', () => { video.play().catch(() => {}); }, { once: true });
  document.addEventListener('touchstart', () => { video.play().catch(() => {}); }, { once: true });
}

// ---- Subtle parallax on the "4" glyphs while hovering hero ----
const hero  = document.getElementById('hero');
const fours = document.querySelectorAll('.four');

hero.addEventListener('mousemove', (e) => {
  const { clientWidth, clientHeight } = hero;
  const cx = e.clientX - clientWidth  / 2;
  const cy = e.clientY - clientHeight / 2;
  const maxShift = 14;

  fours.forEach((el, i) => {
    const dir = i === 0 ? -1 : 1; // left four moves opposite to right four
    const tx = (cx / clientWidth)  * maxShift * dir;
    const ty = (cy / clientHeight) * maxShift * 0.5;
    el.style.transform = `translate(${tx}px, ${ty}px)`;
  });
});

hero.addEventListener('mouseleave', () => {
  fours.forEach(el => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.6s ease';
  });
});

hero.addEventListener('mouseenter', () => {
  fours.forEach(el => {
    el.style.transition = 'transform 0.1s linear';
  });
});
