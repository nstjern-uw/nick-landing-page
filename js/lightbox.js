// CS 506 · Week 3 · Lightbox (data-driven)
// Thumbnails and overlay are both driven by state.images — the array
// below is the single source of truth. index.html only holds an empty
// <section class="gallery"></section> and the hidden .lightbox container.
// Four concepts on display: DOM, events, state, security.

// ── DOM refs (cached once at load time) ─────────────────────────────────
const gallery = document.querySelector('.gallery');
const lb      = document.querySelector('.lightbox');
const lbImg   = lb.querySelector('.lightbox__img');
const lbCap   = lb.querySelector('.lightbox__caption');

// ── State ───────────────────────────────────────────────────────────────
const state = {
  isOpen: false,
  index: 0,
  images: [
    { src: 'new_images/music.jpg',   caption: 'Music Composition' },
    { src: 'new_images/sports.jpg',  caption: 'Sports and Performance' },
    { src: 'new_images/coding.jpg',  caption: 'Technology' },
    { src: 'new_images/reading.jpg', caption: 'Reading and Learning' },
  ],
};

// ── Build thumbnails from state.images ──────────────────────────────────
// createElement + setAttribute + textContent keeps captions/src treated as
// data, not markup — safe even if this array were ever populated from user
// input (XSS-safe by construction; no innerHTML).
state.images.forEach((image, i) => {
  const card = document.createElement('div');
  card.className = 'photo';

  const thumb = document.createElement('img');
  thumb.className = 'gallery__thumb';
  thumb.setAttribute('src', image.src);
  thumb.setAttribute('alt', image.caption);

  const label = document.createElement('p');
  label.textContent = image.caption;

  card.appendChild(thumb);
  card.appendChild(label);
  gallery.appendChild(card);

  thumb.addEventListener('click', () => openLightbox(i));
});

// ── Mutators ────────────────────────────────────────────────────────────
function openLightbox(i) {
  state.isOpen = true;
  state.index = i;
  render();
}

function closeLightbox() {
  state.isOpen = false;
  render();
}

// ── Render (state → DOM) ────────────────────────────────────────────────
function render() {
  if (state.isOpen) {
    const { src, caption } = state.images[state.index];
    lbImg.setAttribute('src', src);
    lbImg.setAttribute('alt', caption);
    lbCap.textContent = caption;
    lb.classList.add('open');
  } else {
    lb.classList.remove('open');
  }
}

// ── Overlay event listeners ─────────────────────────────────────────────
lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.isOpen) closeLightbox();
});
