---
layout: default
title: "Puzzles"
permalink: /puzzles/
---

<section class="puzzles-section" data-section-name="puzzles">
  <div class="container">
    <h1 class="display-4 fw-bold mb-4 fade-in">Puzzles</h1>

    <div class="row stagger">
      {% for puzzle in site.puzzles %}
        <div class="col-md-6 col-lg-4 mb-4 fade-in">
          <a href="{{ puzzle.url | relative_url }}" class="text-decoration-none">
            <div class="project-card h-100 position-relative">
              {% if puzzle.ongoing or puzzle.status == 'ongoing' %}
                <span class="ongoing-badge">ongoing work</span>
              {% endif %}
              <div class="card-icon mb-3">
                <i class="bi {{ puzzle.icon | default: 'bi-puzzle' }} display-4 text-success"></i>
              </div>
              <h3 class="h5 fw-bold">{{ puzzle.title }}</h3>
              {% if puzzle.description %}
                <p class="text-muted">{{ puzzle.description }}</p>
              {% endif %}
              {% if puzzle.tags %}
                <div class="card-tags">
                  {% for tag in puzzle.tags %}
                    <span class="badge bg-light text-dark me-1">{{ tag }}</span>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
          </a>
        </div>
      {% else %}
        <div class="col-12 text-center py-5">
          <p class="lead text-muted">Puzzles coming soon!</p>
        </div>
      {% endfor %}
    </div>
  </div>
</section>
