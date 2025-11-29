/* script.js — External JavaScript file
   Save as script.js
   Contains:
   - Mobile hamburger toggle
   - Smooth scroll for nav links
   - FAQ accordion
   - Simple contact form validation
*/

/* ====== Helper: DOM Ready ====== */
document.addEventListener('DOMContentLoaded', function() {

  /* ====== 1) Mobile Hamburger Toggle ====== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    mobileMenu.style.display = expanded ? 'none' : 'block';
    mobileMenu.setAttribute('aria-hidden', expanded);
  });

  /* Close mobile menu when clicking a link (good UX) */
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
    });
  });

  /* ====== 2) Smooth Scroll for nav links ====== */
  function enableSmoothScroll(selector) {
    document.querySelectorAll(selector).forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        // Only handle internal hashes
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;

        // Smooth scroll behavior
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if open
        if (mobileMenu.style.display === 'block') {
          mobileMenu.style.display = 'none';
          hamburger.setAttribute('aria-expanded', false);
          mobileMenu.setAttribute('aria-hidden', true);
        }
      });
    });
  }
  enableSmoothScroll('a[href^="#"]');

  /* ====== 3) FAQ Accordion ====== */
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.querySelectorAll('.faq-item').forEach((item) => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        // Close all items (single-expand accordion behavior)
        faqList.querySelectorAll('.faq-item').forEach(i => {
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          i.querySelector('.faq-answer').hidden = true;
        });

        // Toggle clicked
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }

  /* ====== 4) Contact form simple validation ====== */
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = form.querySelector('#email').value.trim();
      const plan = form.querySelector('#plan').value;

      // Basic email pattern check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        formMsg.style.color = 'crimson';
        formMsg.textContent = 'Please enter a valid email address.';
        return;
      }
      if (!plan) {
        formMsg.style.color = 'crimson';
        formMsg.textContent = 'Please choose a plan.';
        return;
      }

      // Simulate success (no backend)
      formMsg.style.color = 'green';
      formMsg.textContent = 'Thanks! Your trial has started — check your inbox.';

      // Reset form after short delay
      setTimeout(() => {
        form.reset();
        formMsg.textContent = '';
      }, 3000);
    });
  }

  /* ====== 5) Footer year update ====== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
