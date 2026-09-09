/* ==========================================================================
   MODULE: Course Tabs & Filter System
   ========================================================================== */

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
}
