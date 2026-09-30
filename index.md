---
layout: default
title: "Home"
permalink: /
---

<section class="hero-section text-center" data-section-name="home">
  <div class="container">
    <h1 class="display-4 fw-bold mb-3 fade-in">Mir's site</h1>
  </div>
</section>

<section class="intro-section py-3" data-section-name="intro">
  <div class="container">
    <div class="intro-content mx-auto fade-in" style="max-width: 760px;">
      <p>
        Welcome to my site, this is a passion project and certainly work in progress!
      </p>
    </div>
  </div>
</section>

<section class="rps-section py-4" data-section-name="rps">
  <div class="container">
    <div class="rps-card fade-in mx-auto" style="max-width: 760px;">
      <h2 class="rps-title">Rock · Paper · Scissors</h2>

      <div class="rps-choices" role="group" aria-label="Choose your move">
        <button type="button" class="rps-choice" data-move="rock">
          <span class="rps-icon" aria-hidden="true">O</span>
          <span class="rps-move-name">Rock</span>
        </button>
        <button type="button" class="rps-choice" data-move="paper">
          <span class="rps-icon" aria-hidden="true">||</span>
          <span class="rps-move-name">Paper</span>
        </button>
        <button type="button" class="rps-choice" data-move="scissors">
          <span class="rps-icon" aria-hidden="true">-<</span>
          <span class="rps-move-name">Scissors</span>
        </button>
      </div>

      <div class="rps-arena">
        <div class="rps-hand">
          <span class="rps-hand-icon" id="rps-player-hand" aria-hidden="true">?</span>
          <span class="rps-hand-name">You</span>
        </div>
        <span class="rps-vs">vs</span>
        <div class="rps-hand">
          <span class="rps-hand-icon" id="rps-computer-hand" aria-hidden="true">?</span>
          <span class="rps-hand-name">Computer</span>
        </div>
      </div>

      <p class="rps-result" id="rps-result" aria-live="polite">Make your move!</p>

      <div class="rps-score" aria-label="Score">
        <span>You <strong id="rps-score-player">0</strong></span>
        <span>Draws <strong id="rps-score-draws">0</strong></span>
        <span>Losses <strong id="rps-score-computer">0</strong></span>
      </div>

      <div class="rps-footer">
        <button type="button" class="rps-reset" id="rps-reset" hidden>Reset score</button>
      </div>
    </div>
  </div>
</section>

{% assign gallery_images = site.static_files | where_exp: "file", "file.path contains '/pics/'" %}
{% if gallery_images.size > 0 %}
<section class="gallery-section py-4" data-section-name="gallery">
  <div class="container">
    <div class="photo-carousel fade-in" id="photo-carousel" aria-label="Photo Gallery">
      <div class="photo-carousel-track">
        {% for image in gallery_images %}
          <div class="photo-slide{% if forloop.first %} active{% endif %}" data-index="{{ forloop.index0 }}">
            <img src="{{ image.path | relative_url }}" alt="Gallery photo {{ forloop.index }}" loading="{% if forloop.first %}eager{% else %}lazy{% endif %}">
          </div>
        {% endfor %}
      </div>

      <button class="carousel-control prev" id="carousel-prev" aria-label="Previous photo">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button class="carousel-control next" id="carousel-next" aria-label="Next photo">
        <i class="bi bi-chevron-right"></i>
      </button>

      <div class="carousel-indicators">
        {% for image in gallery_images %}
          <button class="indicator-dot{% if forloop.first %} active{% endif %}" data-slide-to="{{ forloop.index0 }}" aria-label="Go to slide {{ forloop.index }}"></button>
        {% endfor %}
      </div>
    </div>
  </div>
</section>
{% endif %}
