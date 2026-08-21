---
layout: default
title: "Projects"
permalink: /projects/
---

<section class="projects-section" data-section-name="projects">
  <div class="container">
    <h1 class="display-4 fw-bold mb-4 fade-in">Projects</h1>

    <div class="row stagger">
      {% for project in site.projects %}
        <div class="col-md-6 col-lg-4 mb-4 fade-in">
          <a href="{{ project.url | relative_url }}" class="text-decoration-none">
            <div class="project-card h-100 position-relative">
              {% if project.ongoing or project.status == 'ongoing' %}
                <span class="ongoing-badge">ongoing work</span>
              {% endif %}
              <div class="card-icon mb-3">
                <i class="bi {{ project.icon | default: 'bi-folder' }} display-4 text-primary"></i>
              </div>
              <h3 class="h5 fw-bold">{{ project.title }}</h3>
              {% if project.description %}
                <p class="text-muted">{{ project.description }}</p>
              {% endif %}
              {% if project.tags %}
                <div class="card-tags">
                  {% for tag in project.tags %}
                    <span class="badge bg-light text-dark me-1">{{ tag }}</span>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
          </a>
        </div>
      {% else %}
        <div class="col-12 text-center py-5">
          <p class="lead text-muted">Projects coming soon!</p>
        </div>
      {% endfor %}
    </div>
  </div>
</section>
