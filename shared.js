(function () {
  'use strict';

  /* ── CURSOR ── */
  var cur = document.getElementById('cursor');
  if (cur) {
    document.addEventListener('mousemove', function (e) {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .srow, .offering-card, .gitem, .tcard, .path-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cur.classList.add('hovering'); });
      el.addEventListener('mouseleave', function () { cur.classList.remove('hovering'); });
    });
  }

  /* ── NAV SCROLL ── */
  var nav = document.getElementById('sitenav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('sc', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── HAMBURGER ── */
  var burger  = document.getElementById('nav-burger');
  var mobile  = document.getElementById('nav-mobile');
  var closeBtn = document.getElementById('nav-close');
  function closeMenu() {
    burger.classList.remove('open');
    mobile.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobile.classList.toggle('open');
      document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ── REVEAL ── */
  var rvEls = document.querySelectorAll('.rv, .rv-l, .rv-r, .rv-s');
  function reveal() {
    rvEls.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('on');
    });
  }
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    rvEls.forEach(function (el) { obs.observe(el); });
  }
  reveal();
  window.addEventListener('scroll', reveal, { passive: true });
  setTimeout(reveal, 200);
  setTimeout(reveal, 700);

  /* ── PARALLAX ── */
  var heroVid    = document.getElementById('heroVid');
  var ctaSection = document.querySelector('.cta-section');
  var ctaBg      = document.querySelector('.cta-bg');
  var meetImg    = document.querySelector('.meet-img-inner');
  var meetWrap   = document.querySelector('.meet-image');
  var pathImg    = document.querySelector('.path-img');
  var pathWrap   = document.querySelector('.path-img-wrap');

  window.addEventListener('scroll', function () {
    var sy = window.scrollY, wh = window.innerHeight;
    if (heroVid) {
      heroVid.style.transform = 'translateY(' + (sy / wh * 12) + '%)';
    }
    if (meetImg && meetWrap) {
      var r = meetWrap.getBoundingClientRect();
      if (r.bottom > 0 && r.top < wh) {
        meetImg.style.transform = 'translateY(' + ((wh * .5 - r.top) / (wh + r.height) * 10) + '%)';
      }
    }
    if (pathImg && pathWrap) {
      var sr = pathWrap.getBoundingClientRect();
      if (sr.bottom > 0 && sr.top < wh) {
        pathImg.style.transform = 'translateY(' + ((wh * .5 - sr.top) / (wh + sr.height) * 14 - 10) + '%)';
      }
    }
    if (ctaBg && ctaSection) {
      var cr = ctaSection.getBoundingClientRect();
      if (cr.bottom > 0 && cr.top < wh) {
        ctaBg.style.transform = 'translateY(' + ((wh * .5 - cr.top) / (wh + cr.height) * 12) + '%)';
      }
    }
  }, { passive: true });

  /* ── HERO VIDEO FALLBACK ── */
  var v = document.getElementById('heroVid');
  if (v) {
    var srcs = [
      'https://rosa-diosa.vercel.app/Hero.mp4',
      'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_25fps.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-tropical-jungle-1375-large.mp4'
    ];
    var si = 0;
    v.addEventListener('error', function () {
      if (++si < srcs.length) { v.src = srcs[si]; v.load(); v.play().catch(function () {}); }
    }, true);
    var pp = v.play();
    if (pp) pp.catch(function () { v.muted = true; v.play(); });
  }

})();
