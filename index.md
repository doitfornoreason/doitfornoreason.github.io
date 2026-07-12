---
layout: page
title: "Home"
permalink: /
---

<div class="hero-section text-center py-5">
  <h1 class="display-4 fw-bold mb-3 fade-in">Welcome to My World</h1>
  <p class="lead fade-in" style="transition-delay: 0.2s;">Where curiosity meets creativity and code fuels exploration</p>
  <div class="mt-4 fade-in" style="transition-delay: 0.4s;">
    <a href="/projects/" class="btn btn-primary me-2">View Projects</a>
    <a href="/puzzles/" class="btn btn-outline-primary">Puzzle Corner</a>
  </div>
</div>

<div class="container my-5">
  <div class="row text-center">
    <div class="col-md-4 fade-in" style="transition-delay: 0.6s;">
      <div class="project-card">
        <i class="bi bi-code-slash display-1 text-primary mb-3"></i>
        <h3>Code Experiments</h3>
        <p>Exploring new technologies and building interactive projects that push boundaries.</p>
      </div>
    </div>
    <div class="col-md-4 fade-in" style="transition-delay: 0.8s;">
      <div class="project-card">
        <i class="bi bi-puzzle-piece display-1 text-success mb-3"></i>
        <h3>Puzzle Design</h3>
        <p>Creating and solving intricate puzzles that challenge the mind and spark creativity.</p>
      </div>
    </div>
    <div class="col-md-4 fade-in" style="transition-delay: 1s;">
      <div class="project-card">
        <i class="bi bi-brush display-1 text-info mb-3"></i>
        <h3>Creative Projects</h3>
        <p>Artistic endeavors and experimental creations that blend technology with imagination.</p>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));
});
</script>