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

// ===== Dark Mode Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const icon = toggleBtn?.querySelector('i');
  const html = document.documentElement;

  // Sync icon with current theme (already set by head script)
  const currentTheme = html.getAttribute('data-theme') || 'light';
  if (icon) {
    icon.className = currentTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  // Toggle on click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      html.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      if (icon) {
        icon.className = next === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
      }
    });
  }
});

// ===== Photo Carousel Controller =====
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('photo-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.photo-slide');
  const dots = carousel.querySelectorAll('.indicator-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (slides.length === 0) return;

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentIndex + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(dot.getAttribute('data-slide-to'), 10);
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
      }
    });
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff < 0) {
        showSlide(currentIndex + 1); // Swipe left -> next
      } else {
        showSlide(currentIndex - 1); // Swipe right -> prev
      }
    }
  }

  // Keyboard navigation when hovering or focused
  window.addEventListener('keydown', (e) => {
    if (!carousel.matches(':hover') && !carousel.contains(document.activeElement)) return;
    if (e.key === 'ArrowLeft') {
      showSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showSlide(currentIndex + 1);
    }
  });
});

// ===== Rock Paper Scissors Game =====
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.rps-section');
  if (!section) return;

  const MOVES = ['rock', 'paper', 'scissors'];
  const ICONS = { rock: 'O', paper: '||', scissors: '-<' };
  const NAMES = { rock: 'Rock', paper: 'Paper', scissors: 'Scissors' };
  const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

  const playerHand = section.querySelector('#rps-player-hand');
  const computerHand = section.querySelector('#rps-computer-hand');
  const resultEl = section.querySelector('#rps-result');
  const scoreEls = {
    player: section.querySelector('#rps-score-player'),
    draws: section.querySelector('#rps-score-draws'),
    computer: section.querySelector('#rps-score-computer')
  };
  const resetBtn = section.querySelector('#rps-reset');
  const score = { player: 0, computer: 0, draws: 0 };

  section.querySelectorAll('.rps-choice').forEach(btn => {
    btn.addEventListener('click', () => playRound(btn.dataset.move));
  });

  resetBtn.addEventListener('click', resetGame);

  function playRound(playerMove) {
    const computerMove = MOVES[Math.floor(Math.random() * MOVES.length)];

    setHand(playerHand, playerMove);
    setHand(computerHand, computerMove);

    if (playerMove === computerMove) {
      score.draws++;
      setResult(`Both played ${NAMES[playerMove].toLowerCase()} — it's a draw!`, 'draw');
    } else if (BEATS[playerMove] === computerMove) {
      score.player++;
      setResult(`${NAMES[playerMove]} beats ${NAMES[computerMove].toLowerCase()} — you win!`, 'win');
    } else {
      score.computer++;
      setResult(`${NAMES[computerMove]} beats ${NAMES[playerMove].toLowerCase()} — computer wins.`, 'lose');
    }

    Object.keys(scoreEls).forEach(key => {
      scoreEls[key].textContent = score[key];
    });
    resetBtn.hidden = false;
  }

  function setHand(el, move) {
    el.textContent = ICONS[move];
    el.classList.remove('pop');
    void el.offsetWidth; // restart the pop animation
    el.classList.add('pop');
  }

  function setResult(message, outcome) {
    resultEl.textContent = message;
    resultEl.className = `rps-result ${outcome}`;
  }

  function resetGame() {
    score.player = score.computer = score.draws = 0;
    Object.keys(scoreEls).forEach(key => {
      scoreEls[key].textContent = '0';
    });
    playerHand.textContent = '?';
    computerHand.textContent = '?';
    playerHand.classList.remove('pop');
    computerHand.classList.remove('pop');
    resultEl.textContent = 'Make your move!';
    resultEl.className = 'rps-result';
    resetBtn.hidden = true;
  }
});