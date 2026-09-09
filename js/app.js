/* ==========================================================================
   INDIAN LAW SCHOOL (ILS) - MASTER ES MODULE ENTRY POINT
   Theme: Pure Dark Black Base + Gold, Navy Blue & White Highlights
   ========================================================================== */

import { initParticleCanvas } from './modules/canvas.js';
import { initSeatTicker } from './modules/ticker.js';
import { initCourseTabs } from './modules/courses.js';
import { initAIWeakAreaWidget } from './modules/ai-widget.js';
import { initRefundChecklist } from './modules/refund-tracker.js';
import { initBlogHub } from './modules/blog-hub.js';
import { initEnrollmentModal, initNavbarScroll } from './modules/modal.js';
import { initScrollAnimations } from './modules/scroll-anim.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular components cleanly
  initParticleCanvas();
  initSeatTicker();
  initCourseTabs();
  initAIWeakAreaWidget();
  initRefundChecklist();
  initBlogHub();
  initNavbarScroll();
  initEnrollmentModal();
  initScrollAnimations();
});

