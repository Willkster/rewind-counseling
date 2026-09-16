/* REWind Counseling. Vanilla, no dependencies.
   Every effect degrades to a plain visible page with no JS
   and is skipped entirely under prefers-reduced-motion. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var mobile = document.querySelector('.mobile-nav');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobile.classList.toggle('open', !open);
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        mobile.classList.remove('open');
      }
    });
  }

  /* ---- header hairline once scrolled ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('stuck', window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (reduce) return;

  /* ---- scroll reveal, once, with a gentle stagger ---- */
  var targets = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var i = Number(el.getAttribute('data-rv-i') || 0);
        el.style.transitionDelay = (i * 85) + 'ms';
        el.classList.add('vis');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('vis'); });
  }

  /* ---- slow hero settle on load ---- */
  var settle = document.querySelectorAll('.hero-settle');
  window.requestAnimationFrame(function () {
    settle.forEach(function (el, i) {
      el.style.transitionDelay = (120 + i * 130) + 'ms';
      el.classList.add('in');
    });
  });

  /* ---- cursor spotlight on the CTA mark pattern, pointer devices only ---- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-spotlight]').forEach(function (band) {
      var layer = band.querySelector('.spotlight');
      if (!layer) return;
      var pending = false, px = 0, py = 0;
      band.addEventListener('pointermove', function (e) {
        var r = band.getBoundingClientRect();
        px = e.clientX - r.left;
        py = e.clientY - r.top;
        if (pending) return;
        pending = true;
        window.requestAnimationFrame(function () {
          layer.style.setProperty('--mx', px + 'px');
          layer.style.setProperty('--my', py + 'px');
          layer.classList.add('on');
          pending = false;
        });
      }, { passive: true });
      band.addEventListener('pointerleave', function () { layer.classList.remove('on'); }, { passive: true });
    });
  }
})();
