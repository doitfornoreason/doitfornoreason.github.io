---
layout: default
title: "About"
permalink: /about/
---

<section class="about-section" data-section-name="about">
  <div class="container">
    <div class="row align-items-center mb-5">
      <div class="col-lg-4 mb-4 mb-lg-0 fade-in">
        <div class="profile-placeholder text-center">
          <div class="display-1 mb-3">
            <i class="bi bi-person-circle text-primary"></i>
          </div>
          <h2 class="h3 fw-bold">Doitforonoreason</h2>
          <p class="text-muted">Mathematics & Actuarial Student</p>
          <p class="text-muted small">University of Melbourne</p>
        </div>
      </div>
      <div class="col-lg-8 fade-in">
        <h1 class="display-4 fw-bold mb-4">About Me</h1>
        <p class="lead">Hi, I'm a mathematics and actuarial student at Melbourne University. This is my personal site where I share my projects, puzzles, and creative experiments.</p>
        <p>I'm passionate about the intersection of mathematics, logic, and technology. Whether it's building interactive web applications, solving complex puzzles, or exploring new programming paradigms, I enjoy challenges that push me to think differently.</p>
        <div class="mt-4">
          <a href="/projects/" class="btn btn-primary me-2">View My Work</a>
          <a href="/puzzles/" class="btn btn-outline-primary">Try a Puzzle</a>
        </div>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="row mt-5 fade-in">
      <div class="col-12">
        <h2 class="h3 fw-bold mb-4">Skills & Tools</h2>
      </div>
      <div class="col-md-6 mb-4">
        <div class="project-card">
          <h4 class="h5 fw-bold"><i class="bi bi-code-slash text-primary me-2"></i>Programming</h4>
          <div class="mb-2"><span>Python</span><div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div></div>
          <div class="mb-2"><span>JavaScript</span><div class="skill-bar"><div class="skill-fill" style="width:75%"></div></div></div>
          <div class="mb-2"><span>TypeScript</span><div class="skill-bar"><div class="skill-fill" style="width:65%"></div></div></div>
          <div><span>R</span><div class="skill-bar"><div class="skill-fill" style="width:70%"></div></div></div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="project-card">
          <h4 class="h5 fw-bold"><i class="bi bi-calculator text-success me-2"></i>Mathematics</h4>
          <div class="mb-2"><span>Statistics</span><div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div></div>
          <div class="mb-2"><span>Probability</span><div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div></div>
          <div class="mb-2"><span>Actuarial Science</span><div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div></div>
          <div><span>Linear Algebra</span><div class="skill-bar"><div class="skill-fill" style="width:75%"></div></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
.skill-bar {
  background: #e2e8f0;
  border-radius: 999px;
  height: 8px;
  overflow: hidden;
  margin-top: 4px;
}
.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 999px;
  width: 0;
  animation: fillBar 1.5s ease forwards;
}
@keyframes fillBar {
  from { width: 0; }
}
</style>