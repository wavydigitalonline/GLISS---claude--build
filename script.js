// ==========================================================================
// GLISS — Beautiful Systems — V2
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Nav solid-on-scroll ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('is-solid');
      else nav.classList.remove('is-solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('is-open'));
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.remove('is-open'))
    );
  }

  /* ---------- Hero headline: word-by-word reveal ---------- */
  document.querySelectorAll('[data-split-words]').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = text
      .split(' ')
      .map((w, i) => `<span class="word" style="animation-delay:${0.15 + i * 0.09}s">${w}</span>`)
      .join(' ');
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Select field label color fix ---------- */
  document.querySelectorAll('select.field').forEach(sel => {
    const check = () => sel.classList.toggle('has-value', sel.value !== '');
    sel.addEventListener('change', check);
    check();
  });

  /* ---------- Contact form → WhatsApp ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const business = form.business.value.trim();
      const phone = form.phone.value.trim();
      const service = form.service.value;
      const message = form.message.value.trim();

      let text = `Hi GLISS, I'd like to book a consultation.%0A%0A`;
      text += `Name: ${name}%0A`;
      if (business) text += `Business: ${business}%0A`;
      if (email) text += `Email: ${email}%0A`;
      if (phone) text += `Phone: ${phone}%0A`;
      if (service) text += `Service: ${service}%0A`;
      if (message) text += `%0AProject details: ${message}`;

      window.open(`https://wa.me/27714636308?text=${text}`, '_blank');
    });
  }

});
