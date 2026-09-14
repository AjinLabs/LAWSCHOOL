/* ==========================================================================
   MODULE: SPA Hash Router & Standalone Full Landing Page Renderer
   ========================================================================== */

import { COURSE_DATA } from '../course-data.js?v=5.0';
import { BLOG_POSTS } from '../blog-data.js?v=5.0';

export function initRouter() {
  const mainView = document.getElementById('main-landing-view');
  const courseView = document.getElementById('course-landing-view');
  const blogView = document.getElementById('blog-article-view');

  const handleRoute = () => {
    const hash = window.location.hash || '';

    // Course Page Routing (#course/klee, #course/mastery, etc.)
    if (hash.startsWith('#course/')) {
      const courseId = hash.replace('#course/', '').trim();
      const data = COURSE_DATA[courseId];
      if (data && courseView) {
        if (mainView) mainView.style.display = 'none';
        if (blogView) blogView.style.display = 'none';
        courseView.style.display = 'block';
        renderCourseLandingPage(data, courseView);
        window.scrollTo({ top: 0, behavior: 'instant' });
        updateNavbarState('course', data.title);
        return;
      }
    }

    // Blog Article Routing (#blog/post-id)
    if (hash.startsWith('#blog/')) {
      const blogId = hash.replace('#blog/', '').trim();
      const post = BLOG_POSTS.find(p => p.id === blogId);
      if (post && blogView) {
        if (mainView) mainView.style.display = 'none';
        if (courseView) courseView.style.display = 'none';
        blogView.style.display = 'block';
        renderBlogArticlePage(post, blogView);
        window.scrollTo({ top: 0, behavior: 'instant' });
        updateNavbarState('blog', post.title);
        return;
      }
    }

    // Default: Main Landing Page View
    if (courseView) courseView.style.display = 'none';
    if (blogView) blogView.style.display = 'none';
    if (mainView) mainView.style.display = 'block';
    updateNavbarState('home');

    // If anchor exists on main page (e.g. #courses, #commitment, #knowledge-hub), scroll smoothly to it
    if (hash && hash !== '#' && hash !== '#home') {
      const targetElem = document.querySelector(hash);
      if (targetElem) {
        setTimeout(() => {
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  };

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('DOMContentLoaded', handleRoute);
  
  // Expose global course navigator for easy inline triggers
  window.navigateToCourse = (courseId) => {
    window.location.hash = `#course/${courseId}`;
  };

  window.navigateToBlog = (blogId) => {
    window.location.hash = `#blog/${blogId}`;
  };

  // Run initial route check
  handleRoute();
}

function updateNavbarState(type, title = '') {
  const backNavBtn = document.getElementById('nav-back-button');

  if (!backNavBtn) return;

  if (type === 'course' || type === 'blog') {
    backNavBtn.style.display = 'inline-flex';
    backNavBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Main Platform`;
  } else {
    backNavBtn.style.display = 'none';
  }
}

function renderCourseLandingPage(data, container) {
  let html = `
    <div class="standalone-landing-wrapper">
      
      <!-- High Urgency Top Alert Banner Box -->
      <div class="container" style="padding-top: 0.5rem;">
        <div class="urgency-top-alert-banner" style="background: linear-gradient(90deg, rgba(185, 28, 28, 0.35) 0%, rgba(10, 18, 42, 0.95) 100%); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 14px; padding: 0.75rem 1.25rem; margin-bottom: 0.75rem; box-shadow: 0 5px 20px rgba(220, 38, 38, 0.2);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="pulse-dot-red"></span>
              <span style="font-weight: 800; color: #f87171; font-size: 0.9rem; letter-spacing: 0.5px;">
                🔥 LIMITED SPOTS ONLY • SEATS FILLING FAST!
              </span>
              <span style="color: #cbd5e1; font-size: 0.85rem;" class="desktop-only">
                Strict batch limit enforced — Contact admissions immediately to secure your seat.
              </span>
            </div>
            <button class="btn btn-gold btn-sm open-enroll-modal" data-course="${data.title}">
              <i class="fa-solid fa-phone"></i> Contact Admission Desk Now
            </button>
          </div>
        </div>
      </div>

      <!-- Sub-Header Breadcrumb & Top Bar -->
      <div class="landing-subhead-bar">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0;">
          <div class="breadcrumb-box">
            <a href="#home" class="breadcrumb-link"><i class="fa-solid fa-house"></i> Home</a>
            <span class="breadcrumb-sep">/</span>
            <a href="#courses" class="breadcrumb-link">Courses</a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-active">${data.title}</span>
          </div>
          <a href="#home" class="btn btn-glass btn-sm">
            <i class="fa-solid fa-arrow-left"></i> Back to Main Platform
          </a>
        </div>
      </div>

      <!-- Hero Header Banner Section -->
      <section class="standalone-hero">
        <div class="container">
          <div class="standalone-hero-grid">
            
            <div class="standalone-hero-main">
              <div class="ticker-badge pulse-badge-glow" style="margin-bottom: 1rem;">
                <span class="pulse-dot"></span>
                <span class="ticker-text">${data.statusBadge}</span>
              </div>

              <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <span class="course-badge">${data.badge}</span>
                ${data.collaboration && !data.badge.toLowerCase().includes('vakkeel') ? `<span class="course-badge" style="background: rgba(255,255,255,0.08); color: var(--gold-light); border-color: var(--white-border);">${data.collaboration}</span>` : ''}
              </div>

              <h1 class="standalone-hero-title">${data.title}</h1>
              <p class="standalone-hero-subtitle">${data.subtitle}</p>
              <p class="standalone-hero-tagline">${data.tagline}</p>

              <!-- Dynamic Urgency Pills Row -->
              <div class="hero-urgency-pills-row" style="display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap;">
                <span class="urgency-pill red-glow-pill">
                  <i class="fa-solid fa-fire"></i> Limited Spots Remaining
                </span>
                <span class="urgency-pill gold-glow-pill">
                  <i class="fa-solid fa-bolt"></i> Fast Filling Batch
                </span>
                <span class="urgency-pill green-glow-pill">
                  <i class="fa-solid fa-headset"></i> Immediate Counselor Callback
                </span>
              </div>

              ${data.languages ? `
                <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1.25rem;">
                  <span style="color: var(--white-muted); font-size: 0.85rem;">Available Languages:</span>
                  ${data.languages.map(l => `<span style="background: rgba(212, 175, 55, 0.15); color: var(--gold-light); padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--gold-border);">${l}</span>`).join('')}
                </div>
              ` : ''}

              <div class="standalone-cta-group" style="margin-top: 2rem;">
                <button class="btn btn-gold btn-lg open-enroll-modal" data-course="${data.title}">
                  <i class="fa-solid fa-bolt"></i> Secure Your Spot Now &rarr;
                </button>
              </div>
            </div>

            <!-- Hero Pricing Card Column -->
            <div class="standalone-hero-side">
              <div class="standalone-pricing-card tri-border-card">
                <div class="pricing-card-badge"><i class="fa-solid fa-shield-halved"></i> OFFICIAL INVESTMENT</div>
                <h3 class="pricing-summary-text">${data.investmentSummary}</h3>
                
                <!-- Fast Filling Batch Notice Box -->
                <div class="pricing-urgency-notice-box" style="background: rgba(220, 38, 38, 0.12); border: 1px dashed rgba(239, 68, 68, 0.4); border-radius: 12px; padding: 0.85rem; margin: 1rem 0; text-align: center;">
                  <div style="color: #f87171; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">
                    ⚡ FAST-FILLING BATCH NOTICE
                  </div>
                  <div style="color: #ffffff; font-size: 0.82rem; line-height: 1.4;">
                    Strict mentor capacity limit enforced. Contact admission desk immediately for priority seat reservation.
                  </div>
                </div>

                <div class="pricing-details-stack" style="margin: 1rem 0;">
                  ${data.investmentDetails.map(item => `
                    <div class="pricing-detail-item">
                      <div class="detail-item-title">${item.title}</div>
                      <div class="detail-item-price">${item.price}</div>
                      <div class="detail-item-note">${item.note}</div>
                    </div>
                  `).join('')}
                </div>

                <button class="btn btn-gold open-enroll-modal" data-course="${data.title}" style="width: 100%;">
                  <i class="fa-solid fa-user-plus"></i> Contact Immediately for Admission &rarr;
                </button>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.75rem;">
                  <a href="tel:+919876543210" class="btn btn-glass btn-sm" style="text-align: center; border-color: var(--gold-border); color: var(--gold-light);">
                    <i class="fa-solid fa-phone"></i> Call Desk
                  </a>
                  <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20immediate%20admission%20details%20for%20${encodeURIComponent(data.title)}" target="_blank" class="btn btn-glass btn-sm" style="text-align: center; border-color: #22c55e; color: #4ade80;">
                    <i class="fa-brands fa-whatsapp"></i> WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Main Course Body Container -->
      <div class="container" style="padding-top: 3rem; padding-bottom: 5rem;" id="curriculum-breakdown">
        
        <!-- Urgent Seat Alert Banner -->
        <div class="standalone-section-card tri-border-card" style="background: linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(10, 18, 42, 0.95) 100%); border-color: rgba(239, 68, 68, 0.5); margin-bottom: 2.5rem;">
          <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
            <div style="font-size: 2.5rem; color: #f87171; flex-shrink: 0;"><i class="fa-solid fa-bell-concierge"></i></div>
            <div style="flex: 1; min-width: 250px;">
              <div style="display: inline-block; background: #dc2626; color: #fff; font-weight: 800; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase; margin-bottom: 0.4rem;">
                Urgent Admission Alert
              </div>
              <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: #ffffff; margin-bottom: 0.4rem;">
                LIMITED SPOTS REMAINING FOR UPCOMING BATCH!
              </h3>
              <p style="color: var(--white-muted); font-size: 0.9rem; margin: 0; line-height: 1.6;">
                To guarantee 1-on-1 mentor access, weekly evaluations & personalized written feedback, batch sizes are strictly capped. Once capacity is reached, applications lock. Contact us immediately to secure your seat.
              </p>
            </div>
            <button class="btn btn-gold open-enroll-modal" data-course="${data.title}" style="flex-shrink: 0;">
              <i class="fa-solid fa-bolt"></i> Claim Immediate Seat Now
            </button>
          </div>
        </div>

        <!-- Section 1: Overview & Ecosystem -->
        <div class="standalone-section-card tri-border-card">
          <h2 class="standalone-section-heading"><i class="fa-solid fa-compass"></i> Ecosystem Overview & Purpose</h2>
          <p class="hero-lead-paragraph"><strong>${data.heroLead}</strong></p>
          <p class="ecosystem-description">${data.ecosystemDescription}</p>

          ${data.whyStruggle ? `
            <div class="struggle-warning-box">
              <h3 class="struggle-title">🎯 Why Do So Many Law Students Struggle?</h3>
              <ul class="struggle-list">
                ${data.whyStruggle.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${data.programPurpose ? `
            <div class="purpose-highlight-box">
              <h3>⚖️ This Program Has A Different Purpose</h3>
              <p>${data.programPurpose}</p>
            </div>
          ` : ''}
        </div>

        <!-- Section 2: Small Batch Scarcity (for KLEE) -->
        ${data.whySmallBatch ? `
          <div class="standalone-section-card tri-border-card" style="border-color: var(--gold-primary);">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-users-viewfinder"></i> Why Only 15 Students Per Batch?</h2>
            <p style="color: var(--gold-light); font-size: 1rem; margin-bottom: 1.25rem;">${data.scarcityDetails ? data.scarcityDetails.note : 'Because excellence cannot be mass-produced.'}</p>
            <div class="detail-grid-2">
              ${data.whySmallBatch.map(item => `
                <div class="small-batch-item">
                  <span style="color: var(--gold-primary); font-weight: 800;">✓</span>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 3: Faculty / Bench & Bar -->
        ${data.facultyBenchInfo ? `
          <div class="standalone-section-card tri-border-card">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-gavel"></i> Learn Directly from the Bench and the Bar</h2>
            <p style="color: var(--white-muted); margin-bottom: 1.5rem;">Instruction by Retired Judges, Senior Counsel, and Elite Currently Practicing Advocates.</p>
            <div class="detail-grid-3">
              ${data.facultyBenchInfo.map(f => `
                <div class="faculty-box glass-panel">
                  <h3 style="color: var(--gold-primary); font-size: 1.05rem; margin-bottom: 0.5rem; font-family: var(--font-serif);">⚖️ ${f.role}</h3>
                  <p style="color: var(--white-muted); font-size: 0.88rem; line-height: 1.6; margin: 0;">${f.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 4: KLEE Exam Pattern & Colleges -->
        ${data.examPattern ? `
          <div class="standalone-section-card tri-border-card">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-clipboard-list"></i> KLEE Exam Pattern & Subject Weightage</h2>
            <div class="klee-banner-stats">
              <div class="klee-stat-box"><span>Mode</span><strong>${data.examPattern.mode}</strong></div>
              <div class="klee-stat-box"><span>Duration</span><strong>${data.examPattern.duration}</strong></div>
              <div class="klee-stat-box"><span>Questions</span><strong>${data.examPattern.totalQuestions}</strong></div>
              <div class="klee-stat-box"><span>Max Marks</span><strong>${data.examPattern.maxMarks}</strong></div>
            </div>
            <div style="margin: 1rem 0 1.5rem 0; font-size: 0.9rem; color: var(--gold-light); background: rgba(212, 175, 55, 0.1); padding: 0.75rem 1rem; border-radius: 8px;">
              ${data.examPattern.markingScheme}
            </div>

            <div class="detail-grid-2">
              ${data.examPattern.subjects.map(s => `
                <div class="subject-card glass-panel">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <h4 style="color: var(--gold-primary); font-size: 1rem; margin: 0;">${s.name}</h4>
                    <span class="subject-badge">${s.marks}</span>
                  </div>
                  <p style="color: var(--white-muted); font-size: 0.88rem; margin: 0; line-height: 1.5;">${s.details}</p>
                </div>
              `).join('')}
            </div>

            ${data.govColleges ? `
              <div style="margin-top: 2rem;">
                <h3 style="color: var(--gold-light); font-size: 1.1rem; margin-bottom: 1rem;">🏛 Government Law Colleges in Kerala</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
                  ${data.govColleges.map(c => `
                    <div style="background: rgba(0,0,0,0.5); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--gold-border); font-size: 0.88rem; color: #fff;">📍 ${c}</div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${data.selfFinancingColleges ? `
              <div style="margin-top: 1.5rem;">
                <h3 style="color: var(--white-muted); font-size: 1rem; margin-bottom: 0.75rem;">🏫 Participating Self-Financing Law Colleges</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                  ${data.selfFinancingColleges.map(c => `
                    <span style="background: rgba(255,255,255,0.05); color: var(--white-muted); padding: 0.3rem 0.7rem; border-radius: 6px; font-size: 0.8rem; border: 1px solid var(--white-border);">${c}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Section 5: Why Enroll & Key Pillars -->
        <div class="standalone-section-card tri-border-card">
          <h2 class="standalone-section-heading"><i class="fa-solid fa-star"></i> Why Enroll in ${data.title}?</h2>
          ${data.whyEnroll ? `<p style="color: var(--gold-light); font-size: 1.05rem; margin-bottom: 1.5rem; font-weight: 600;">${data.whyEnroll}</p>` : ''}
          <div class="access-points-grid-2">
            ${data.accessPoints.map(pt => `
              <div class="access-point-card">
                <span style="color: var(--gold-primary); font-weight: 800; font-size: 1.1rem;">✓</span>
                <span style="color: #fff; font-size: 0.9rem; line-height: 1.5;">${pt}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 6: Full Subject Library (for Law Mastery) -->
        ${data.fullSubjectList ? `
          <div class="standalone-section-card tri-border-card">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-book-bookmark"></i> Complete LL.B. Subject Library (All Semesters)</h2>
            <p style="color: var(--white-muted); margin-bottom: 1.5rem;">Comprehensive coverage across all core, elective, and practical law subjects.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem;">
              ${data.fullSubjectList.map(subj => `
                <div style="background: rgba(0,0,0,0.5); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--white-border); color: #fff; font-weight: 500; font-size: 0.9rem;">
                  ${subj}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 7: Weekly Model -->
        ${data.weeklyModel ? `
          <div class="standalone-section-card tri-border-card">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-calendar-week"></i> Structured Weekly Online Learning Model</h2>
            <div class="detail-grid-2">
              ${data.weeklyModel.map(wm => `
                <div class="weekly-model-card glass-panel">
                  <div class="model-day-title">📅 ${wm.day}</div>
                  <div class="model-day-desc">${wm.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 8: Roadmaps / Strategy / Bootcamps -->
        ${(data.scenarioRoadmaps || data.hearingStrategy || data.examBootcamps) ? `
          <div class="standalone-section-card tri-border-card">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-shield-halved"></i> High-Stakes Strategy & Tactical Roadmaps</h2>
            <div class="detail-grid-2">
              ${(data.scenarioRoadmaps || data.hearingStrategy || data.examBootcamps).map(item => `
                <div class="roadmap-box glass-panel">
                  <h3 style="color: var(--gold-light); font-size: 1.05rem; margin-bottom: 0.4rem;">🎯 ${item.title}</h3>
                  <p style="color: var(--white-muted); font-size: 0.88rem; line-height: 1.6; margin: 0;">${item.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 9: Curriculum Vault -->
        ${data.curriculumVault ? `
          <div class="standalone-section-card tri-border-card">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-box-archive"></i> Comprehensive Vault & Practice Curriculum</h2>
            <div class="detail-grid-2">
              ${data.curriculumVault.map(cv => `
                <div class="vault-box glass-panel">
                  <h4 style="color: var(--gold-primary); font-size: 1rem; margin-bottom: 0.4rem;">📚 ${cv.title}</h4>
                  <p style="color: var(--white-muted); font-size: 0.88rem; line-height: 1.6; margin: 0;">${cv.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 10: 4K Visuals & Evaluations -->
        ${data.visualModules ? `
          <div class="standalone-section-card tri-border-card">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-film"></i> Cinema-Grade 4K Visual Modules</h2>
            <p style="color: #fff; font-size: 0.98rem; line-height: 1.7; margin-bottom: 1.25rem;">
              ${data.visualModules}
            </p>
            ${data.evaluations ? `
              <div style="padding: 1.25rem; background: rgba(212, 175, 55, 0.08); border-left: 4px solid var(--gold-primary); border-radius: 8px;">
                <h4 style="color: var(--gold-light); margin-bottom: 0.4rem; font-size: 1rem;">📝 Continuous Written Evaluations & Practitioner Feedback</h4>
                <p style="color: var(--white-muted); font-size: 0.9rem; margin: 0; line-height: 1.6;">${data.evaluations}</p>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Section 11: Founder's Quote -->
        ${data.founderMessage ? `
          <div class="standalone-section-card tri-border-card" style="border-color: var(--gold-primary); background: rgba(212, 175, 55, 0.05);">
            <h2 class="standalone-section-heading"><i class="fa-solid fa-quote-left"></i> Founder's Message</h2>
            <blockquote style="font-family: var(--font-serif); font-size: 1.15rem; color: #fff; line-height: 1.7; font-style: italic; margin-bottom: 1rem;">
              "${data.founderMessage.quote}"
            </blockquote>
            <div style="color: var(--gold-primary); font-weight: 700;">${data.founderMessage.author}</div>
            <div style="color: var(--white-muted); font-size: 0.85rem;">${data.founderMessage.role}</div>
          </div>
        ` : ''}

        <!-- Section 12: Performance Refund Policy -->
        ${data.commitment ? `
          <div class="standalone-section-card tri-border-card" style="border: 2px solid var(--gold-primary); background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(0,0,0,0.85) 100%);">
            <h2 style="font-family: var(--font-serif); color: var(--gold-light); font-size: 1.6rem; margin-bottom: 0.5rem;">
              ${data.commitment.title}
            </h2>
            <p style="color: var(--white-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; font-size: 0.85rem; margin-bottom: 1rem;">
              ${data.commitment.subtitle}
            </p>
            <p style="color: #fff; font-size: 0.98rem; line-height: 1.7; margin-bottom: 1.5rem;">
              ${data.commitment.text}
            </p>
            <h4 style="color: var(--gold-light); font-size: 0.95rem; margin-bottom: 0.75rem;">Mandatory Eligibility Criteria:</h4>
            <div class="detail-grid-2">
              ${data.commitment.criteria.map(c => `
                <div style="display: flex; align-items: center; gap: 0.5rem; color: #fff; font-size: 0.88rem; background: rgba(0,0,0,0.4); padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid var(--white-border);">
                  <span style="color: var(--gold-primary);">✓</span> ${c}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 13: Who Should Enroll -->
        <div class="standalone-section-card tri-border-card">
          <h2 class="standalone-section-heading"><i class="fa-solid fa-user-check"></i> Who Should Enroll?</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            ${data.whoShouldEnroll.map(w => `
              <div style="display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; border: 1px solid var(--white-border);">
                <span style="color: var(--gold-primary); font-size: 1.1rem;">🎯</span>
                <span style="color: #fff; font-size: 0.9rem; line-height: 1.5;">${w}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 14: Final Call To Action Card -->
        <div class="standalone-section-card tri-border-card" style="text-align: center; background: radial-gradient(circle at center, rgba(212, 175, 55, 0.18) 0%, rgba(0,0,0,0.95) 100%); padding: 4rem 2rem; border-color: var(--gold-primary);">
          <span style="color: #f87171; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.5rem;">
            🔥 ADMISSIONS FILLING FAST • CONTACT IMMEDIATELY
          </span>
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: #fff; margin-bottom: 0.75rem;">Master the Law. Master Your Future.</h2>
          <p style="color: var(--white-muted); max-width: 650px; margin: 0 auto 2rem auto; font-size: 1rem;">
            Strict batch limits active. Contact our senior academic desk immediately to lock in your priority admission.
          </p>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-gold btn-lg open-enroll-modal" data-course="${data.title}">
              <i class="fa-solid fa-bolt"></i> Claim Priority Seat in ${data.title} &rarr;
            </button>
            <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20immediate%20admission%20details%20for%20${encodeURIComponent(data.title)}" target="_blank" class="btn btn-glass btn-lg" style="border-color: #22c55e; color: #4ade80;">
              <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp Immediately
            </a>
            <a href="#home" class="btn btn-glass btn-lg">
              <i class="fa-solid fa-arrow-left"></i> Return to Main Platform
            </a>
          </div>
        </div>

      </div>

      <!-- Standalone Footer -->
      <footer style="background: #000; border-top: 1px solid var(--white-border); padding: 2.5rem 0; text-align: center; color: var(--white-muted); font-size: 0.88rem;">
        <div class="container">
          <p style="margin-bottom: 0.5rem;">© 2026 Indian Law School (ILS). ${data.title}. All Rights Reserved.</p>
          <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4);">In Association with Vakkeel & Associates. Premium Legal Learning & Practice Ecosystem.</p>
        </div>
      </footer>

    </div>
  `;

  container.innerHTML = html;

  // Re-bind enrollment triggers on the newly injected content
  const modalTriggers = container.querySelectorAll('.open-enroll-modal');
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseName = btn.getAttribute('data-course');
      const modal = document.getElementById('enroll-modal');
      const selectElem = document.getElementById('form-course-select');
      if (selectElem && courseName) {
        selectElem.value = courseName;
      }
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

function renderBlogArticlePage(post, container) {
  let html = `
    <div class="standalone-blog-wrapper">
      
      <!-- Sub-Header Bar -->
      <div class="landing-subhead-bar">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0;">
          <div class="breadcrumb-box">
            <a href="#home" class="breadcrumb-link"><i class="fa-solid fa-house"></i> Home</a>
            <span class="breadcrumb-sep">/</span>
            <a href="#knowledge-hub" class="breadcrumb-link">Protect Yourself Hub</a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-active">${post.title}</span>
          </div>
          <a href="#knowledge-hub" class="btn btn-glass btn-sm">
            <i class="fa-solid fa-arrow-left"></i> Back to Hub
          </a>
        </div>
      </div>

      <!-- Article Hero Container -->
      <div class="container" style="max-width: 900px; padding-top: 3rem; padding-bottom: 5rem;">
        
        <article class="standalone-article-card tri-border-card">
          <div class="article-header" style="margin-bottom: 2rem; border-bottom: 1px solid var(--white-border); padding-bottom: 1.5rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
              <span class="glass-badge glass-badge-gold">${post.category}</span>
              <span class="glass-badge">${post.tag}</span>
            </div>

            <h1 class="article-standalone-title">${post.title}</h1>
            
            <div class="article-meta-row" style="display: flex; gap: 1.5rem; align-items: center; margin-top: 1rem; color: var(--white-muted); font-size: 0.88rem;">
              <span><i class="fa-solid fa-scale-balanced" style="color: var(--gold-primary);"></i> Indian Law School & Vakkeel & Associates</span>
              <span><i class="fa-solid fa-clock" style="color: var(--gold-primary);"></i> ${post.readTime}</span>
            </div>
          </div>

          <div class="article-body-content">
            ${post.content}
          </div>

          <div class="article-bottom-cta">
            <h3>Ready to Build Doctrinal & Practical Legal Mastery?</h3>
            <p>Enroll in Indian Law School programs or request direct consultative guidance from senior legal educators.</p>
            <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;">
              <button class="btn btn-gold open-enroll-modal" data-course="General Consultation">
                <i class="fa-solid fa-graduation-cap"></i> Explore Flagship Programs
              </button>
              <a href="#home" class="btn btn-glass">Return to Main Platform</a>
            </div>
          </div>

        </article>

      </div>

      <!-- Article Footer -->
      <footer style="background: #000; border-top: 1px solid var(--white-border); padding: 2rem 0; text-align: center; color: var(--white-muted); font-size: 0.85rem;">
        <div class="container">
          <p>© 2026 Indian Law School (ILS). Legal Awareness & Guidance Hub.</p>
        </div>
      </footer>

    </div>
  `;

  container.innerHTML = html;

  // Re-bind modal triggers
  const modalTriggers = container.querySelectorAll('.open-enroll-modal');
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('enroll-modal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}
