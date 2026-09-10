/* ==========================================================================
   MODULE: Course Tabs, Filter System & Course Exploration Detail Modal
   ========================================================================== */

import { COURSE_DATA } from '../course-data.js';

export function initCourseTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn[data-filter]');
  const courseCards = document.querySelectorAll('.course-card-wrapper');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  initCourseDetailModal();
}

function initCourseDetailModal() {
  const detailModal = document.getElementById('course-detail-modal');
  const detailBody = document.getElementById('course-detail-content-body');
  const closeBtn = document.getElementById('course-detail-close-btn');
  const exploreBtns = document.querySelectorAll('.explore-course-btn');

  if (!detailModal || !detailBody) return;

  const openCourseDetail = (courseId) => {
    const data = COURSE_DATA[courseId];
    if (!data) return;

    // Generate rich detailed modal HTML
    let html = `
      <div class="course-detail-header">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <span class="course-badge">${data.badge}</span>
            ${data.collaboration ? `<span class="course-badge" style="background: rgba(255,255,255,0.08); color: var(--gold-light); border-color: var(--white-border);">${data.collaboration}</span>` : ''}
          </div>
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--gold-light); background: rgba(212, 175, 55, 0.15); padding: 0.35rem 0.85rem; border-radius: 20px; border: 1px solid var(--gold-primary);">${data.statusBadge}</span>
        </div>

        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--white-pure); margin-bottom: 0.5rem; line-height: 1.2;">
          ${data.title}
        </h2>
        <p style="font-size: 1.05rem; color: var(--gold-light); margin-bottom: 0.75rem; font-weight: 600;">
          ${data.subtitle}
        </p>
        <p style="font-size: 0.95rem; color: var(--white-muted); font-style: italic;">
          ${data.tagline}
        </p>
      </div>

      <!-- Hero Lead & Ecosystem -->
      <div class="detail-section-card">
        <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 0.75rem;">
          <i class="fa-solid fa-compass"></i> Ecosystem Overview
        </h3>
        <p style="font-size: 1rem; color: #fff; line-height: 1.7; margin-bottom: 1rem;">
          <strong>${data.heroLead}</strong>
        </p>
        <p style="font-size: 0.92rem; color: var(--white-muted); line-height: 1.7;">
          ${data.ecosystemDescription}
        </p>
      </div>
    `;

    // Faculty / Bench Info (if available)
    if (data.facultyBenchInfo && data.facultyBenchInfo.length > 0) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 1.25rem;">
            <i class="fa-solid fa-gavel"></i> Learn Directly from the Bench & Bar
          </h3>
          <div class="detail-grid-2">
            ${data.facultyBenchInfo.map(f => `
              <div style="background: rgba(0,0,0,0.5); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--white-border);">
                <h4 style="color: var(--gold-primary); font-size: 1rem; margin-bottom: 0.5rem;">⚖️ ${f.role}</h4>
                <p style="font-size: 0.88rem; color: var(--white-muted); line-height: 1.6; margin: 0;">${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Why Enroll & Key Pillars
    if (data.accessPoints && data.accessPoints.length > 0) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-star"></i> Why Enroll in ${data.title}?
          </h3>
          <p style="font-size: 0.92rem; color: var(--white-muted); margin-bottom: 1.25rem;">${data.whyEnroll}</p>
          <div class="detail-grid-2">
            ${data.accessPoints.map(pt => `
              <div style="display: flex; align-items: flex-start; gap: 0.75rem; background: rgba(0,0,0,0.4); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--white-border);">
                <span style="color: var(--gold-primary); font-weight: 800; flex-shrink: 0; margin-top: 2px;">✓</span>
                <span style="font-size: 0.88rem; color: #fff; line-height: 1.5;">${pt}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Structured Weekly Model
    if (data.weeklyModel && data.weeklyModel.length > 0) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 1.25rem;">
            <i class="fa-solid fa-calendar-week"></i> Structured Weekly Online Learning Model
          </h3>
          <div class="detail-grid-2">
            ${data.weeklyModel.map(wm => `
              <div class="weekly-day-box">
                <div class="weekly-day-title">📅 ${wm.day}</div>
                <div style="font-size: 0.88rem; color: var(--white-muted); line-height: 1.6;">${wm.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Scenario Roadmaps OR Exam Bootcamps
    const roadmaps = data.scenarioRoadmaps || data.hearingStrategy || data.examBootcamps;
    if (roadmaps && roadmaps.length > 0) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 1.25rem;">
            <i class="fa-solid fa-shield-cat"></i> High-Stakes Tactical Roadmaps & Strategy
          </h3>
          <div class="detail-grid-2">
            ${roadmaps.map(rm => `
              <div style="background: rgba(0,0,0,0.5); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--gold-border);">
                <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 0.4rem; font-family: var(--font-sans);">🎯 ${rm.title}</h4>
                <p style="font-size: 0.85rem; color: var(--white-muted); line-height: 1.6; margin: 0;">${rm.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 4K Visual Modules & Evaluations
    if (data.visualModules) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 0.75rem;">
            <i class="fa-solid fa-film"></i> Cinema-Grade 4K Motion Visual Modules
          </h3>
          <p style="font-size: 0.92rem; color: var(--white-bright); line-height: 1.7; margin-bottom: 1rem;">
            ${data.visualModules}
          </p>
          ${data.evaluations ? `<p style="font-size: 0.88rem; color: var(--white-muted); line-height: 1.6; padding: 1rem; background: rgba(0,0,0,0.5); border-radius: 10px; border-left: 3px solid var(--gold-primary);">📝 <strong>Continuous Evaluations:</strong> ${data.evaluations}</p>` : ''}
        </div>
      `;
    }

    // Comprehensive Digital Vault / Curriculum
    if (data.curriculumVault && data.curriculumVault.length > 0) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 1.25rem;">
            <i class="fa-solid fa-box-archive"></i> Comprehensive Legal & Drafting Vault
          </h3>
          <div class="detail-grid-2">
            ${data.curriculumVault.map(cv => `
              <div style="background: rgba(0,0,0,0.5); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--white-border);">
                <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 0.4rem;">📚 ${cv.title}</h4>
                <p style="font-size: 0.85rem; color: var(--white-muted); line-height: 1.6; margin: 0;">${cv.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Commitment & Guarantees
    if (data.commitment) {
      html += `
        <div class="detail-section-card" style="border-color: var(--gold-primary); background: rgba(212, 175, 55, 0.08);">
          <h3 style="font-family: var(--font-serif); color: var(--gold-light); font-size: 1.3rem; margin-bottom: 0.25rem;">
            ${data.commitment.title}
          </h3>
          <p style="font-size: 0.85rem; color: var(--white-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.75rem;">
            ${data.commitment.subtitle}
          </p>
          <p style="font-size: 0.92rem; color: #fff; line-height: 1.7; margin-bottom: 1.25rem;">
            ${data.commitment.text}
          </p>

          <h4 style="color: var(--gold-light); font-size: 0.88rem; font-family: var(--font-sans); margin-bottom: 0.5rem;">
            Eligibility Verification Criteria:
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${data.commitment.criteria.map(c => `
              <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--white-muted);">
                <i class="fa-solid fa-circle-check" style="color: var(--gold-primary);"></i>
                <span>${c}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Investment & EMI Pricing Options
    if (data.investmentDetails && data.investmentDetails.length > 0) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 1.25rem;">
            <i class="fa-solid fa-coins"></i> Investment & Payment Plans
          </h3>
          <div class="detail-grid-2">
            ${data.investmentDetails.map(inv => `
              <div style="background: rgba(0,0,0,0.6); padding: 1.5rem; border-radius: 14px; border: 1px solid var(--gold-border); text-align: center;">
                <h4 style="color: #fff; font-size: 1rem; margin-bottom: 0.5rem;">${inv.title}</h4>
                <div style="font-family: var(--font-serif); font-size: 2rem; font-weight: 800; color: var(--gold-primary); margin-bottom: 0.5rem;">
                  ${inv.price}
                </div>
                <p style="font-size: 0.8rem; color: var(--white-muted); margin: 0;">${inv.note}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Target Audience ("Who Should Enroll")
    if (data.whoShouldEnroll && data.whoShouldEnroll.length > 0) {
      html += `
        <div class="detail-section-card">
          <h3 style="font-family: var(--font-sans); color: var(--gold-light); font-size: 1.2rem; margin-bottom: 1rem;">
            <i class="fa-solid fa-user-check"></i> Who Should Enroll?
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${data.whoShouldEnroll.map(wse => `
              <div style="display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.9rem; color: var(--white-bright);">
                <i class="fa-solid fa-arrow-right" style="color: var(--gold-primary); margin-top: 3px;"></i>
                <span style="line-height: 1.5;">${wse}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Sticky Bottom Action Bar with Enquiry Button
    html += `
      <div class="cta-sticky-bar">
        <div>
          <span style="font-size: 0.75rem; color: var(--white-muted); display: block;">SELECTED PROGRAM</span>
          <strong style="color: var(--gold-light); font-size: 1rem;">${data.title}</strong>
        </div>
        <button class="btn btn-gold open-enroll-modal" data-course="${data.title}">
          <i class="fa-solid fa-paper-plane"></i> Enquire & Register Now &rarr;
        </button>
      </div>
    `;

    detailBody.innerHTML = html;
    detailModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Re-attach listener to the newly generated "Enquire & Register Now" button inside detail modal
    const modalEnrollBtn = detailBody.querySelector('.open-enroll-modal');
    if (modalEnrollBtn) {
      modalEnrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetCourseName = modalEnrollBtn.getAttribute('data-course');
        
        // Close course detail modal
        detailModal.classList.remove('active');
        document.body.style.overflow = '';

        // Open primary enrollment form modal
        const enrollModal = document.getElementById('enroll-modal');
        const selectElem = document.getElementById('form-course-select');
        if (selectElem && targetCourseName) {
          let matched = false;
          for (let i = 0; i < selectElem.options.length; i++) {
            if (selectElem.options[i].text.includes(targetCourseName) || selectElem.options[i].value.includes(targetCourseName)) {
              selectElem.selectedIndex = i;
              matched = true;
              break;
            }
          }
          if (!matched) selectElem.value = targetCourseName;
        }

        if (enrollModal) {
          setTimeout(() => {
            enrollModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }, 150);
        }
      });
    }
  };

  const closeCourseDetail = () => {
    detailModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  exploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseId = btn.getAttribute('data-course-id');
      openCourseDetail(courseId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCourseDetail);
  }

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeCourseDetail();
  });
}
