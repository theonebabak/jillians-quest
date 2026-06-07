// Countdown: June 7, 2026 at 7:00 PM Eastern Time.
const TARGET = new Date('2026-06-07T19:00:00-04:00');

const el = {
  big: document.getElementById('bigNumber'),
  bigUnit: document.getElementById('bigUnit'),
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  mini: document.getElementById('miniClock'),
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function tick() {
  const diff = TARGET.getTime() - Date.now();

  if (diff <= 0) {
    el.big.textContent = '0';
    el.bigUnit.textContent = "it's time";
    el.days.textContent = '00';
    el.hours.textContent = '00';
    el.minutes.textContent = '00';
    el.seconds.textContent = '00';
    el.mini.textContent = '00 : 00 : 00';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const totalHours = Math.floor(diff / 3600000);

  el.big.textContent = totalHours.toString();
  el.bigUnit.textContent = totalHours === 1 ? 'hour' : 'hours';
  el.days.textContent = pad(days);
  el.hours.textContent = pad(hours);
  el.minutes.textContent = pad(minutes);
  el.seconds.textContent = pad(seconds);
  el.mini.textContent = `${pad(hours + days * 24)} : ${pad(minutes)} : ${pad(seconds)}`;
}

tick();
setInterval(tick, 1000);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));

const galleryItems = [
  {
    src: 'photo_2026-06-06_20-29-50.jpg',
    alt: 'Gallery photo 1',
    caption: '01 / The smile',
  },
  {
    src: 'photo_2026-06-06_20-30-06.jpg',
    alt: 'Gallery photo 2',
    caption: '02 / The look',
  },
  {
    src: 'photo_2026-06-06_20-30-09.jpg',
    alt: 'Gallery photo 3',
    caption: '03 / The vibe',
  },
  {
    src: 'photo_2026-06-06_20-30-13.jpg',
    alt: 'Gallery photo 4',
    caption: '04 / The whole thing',
  },
];

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');
let activeIndex = 0;

function renderLightbox(index) {
  activeIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
}

function openLightbox(index) {
  renderLightbox(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-gallery-index]').forEach((button) => {
  button.addEventListener('click', () => {
    openLightbox(Number(button.dataset.galleryIndex));
  });
});

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', () => renderLightbox(activeIndex - 1));
nextButton.addEventListener('click', () => renderLightbox(activeIndex + 1));
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') renderLightbox(activeIndex - 1);
  if (event.key === 'ArrowRight') renderLightbox(activeIndex + 1);
});
