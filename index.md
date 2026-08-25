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
