const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: width .2s ease, height .2s ease;
  top: 0; left: 0;
  will-change: top, left;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.top  = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

document.querySelectorAll('a, button, .tech-item, .social-row').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '32px'; cursor.style.height = '32px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; });
});


const nav = document.getElementById('nav');
const darkSections = document.querySelectorAll('[data-nav-dark]');

function updateNav() {
  const navBottom = nav.getBoundingClientRect().bottom;
  const scrollY   = window.scrollY;


  nav.classList.toggle('scrolled', scrollY > 40);


  let overDark = false;
  darkSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < navBottom && rect.bottom > 0) {
      overDark = true;
    }
  });

  nav.classList.toggle('over-dark', overDark);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); 


const footerDateEl = document.getElementById('footerDate');
if (footerDateEl) {
  const now = new Date();
  const dayName   = now.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = now.toLocaleDateString('en-US', { month: 'long' });
  const day       = now.getDate();
  const year      = now.getFullYear();
  footerDateEl.textContent = `${dayName}, ${monthName} ${day}, ${year}`;
}

const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));


const track    = document.getElementById('carouselTrack');
const dots     = document.querySelectorAll('.carousel-dot');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');

if (track) {
  const slides = track.querySelectorAll('.carousel-slide');
  let current = 0;
  let autoTimer;

  track.style.transition = 'transform .7s cubic-bezier(.77,0,.175,1)';

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.index)); resetAuto(); });
  });

  function autoPlay() { autoTimer = setInterval(() => goTo(current + 1), 5000); }
  function resetAuto() { clearInterval(autoTimer); autoPlay(); }
  autoPlay();
}


const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
  }, { passive: true });
}


const projectRows = document.querySelectorAll('.project-row');
const rowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      rowObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
projectRows.forEach((row, i) => {
  row.style.opacity = '0';
  row.style.transform = 'translateY(40px)';
  row.style.transition = `opacity .7s ${i * 0.1}s ease, transform .7s ${i * 0.1}s ease`;
  rowObserver.observe(row);
});


const techItems = document.querySelectorAll('.tech-item');
if (techItems.length) {
  const techObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      techItems.forEach((item, i) => {
        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, i * 55);
      });
      techObserver.disconnect();
    }
  }, { threshold: 0.15 });
  techItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity .5s ease, transform .5s ease';
  });
  techObserver.observe(techItems[0].closest('section'));
}

console.log('%c Walkorion', 'font-family: Georgia, serif; font-style: italic; font-size: 32px; color: #0a0a0a;');
console.log('%c Stefan Tosev Portfolio', 'font-size: 12px; color: #7a7977;');