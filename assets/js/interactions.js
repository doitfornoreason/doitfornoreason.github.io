// ===== Navigation: Active section highlight on scroll =====
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = {};

  navItems.forEach(item => {
    const section = item.dataset?.section;
    if (section) {
      const el = document.getElementById(section) || document.querySelector(`[data-section-name="${section}"]`);
      if (el) sections[section] = el;
    }
  });

  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 120;
    Object.entries(sections).forEach(([name, el]) => {
      if (el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
        current = name;
      }
    });
    // Highlight matching nav item
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset?.section === current);
    });
  }

  if (Object.keys(sections).length > 0) {
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  }

  // ===== Mobile menu toggle =====
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }
});

// ===== Sticky header scrolled state =====
document.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  // ===== Scroll progress bar =====
  const fill = document.querySelector('.scroll-progress .fill');
  if (fill) {
    const scrollTop = window.scrollY;
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    fill.style.width = `${(scrollTop / totalScroll) * 100}%`;
  }
});

// ===== Scroll-triggered fade-in animations =====
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeElements.forEach(el => observer.observe(el));
});