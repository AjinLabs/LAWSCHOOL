/* ==========================================================================
   MODULE: Protect Yourself Knowledge Hub & Article Reader
   ========================================================================== */

import { BLOG_POSTS } from '../blog-data.js';

export function initBlogHub() {
  const blogGrid = document.getElementById('blog-posts-grid');
  const searchInput = document.getElementById('blog-search-input');
  const tagBtns = document.querySelectorAll('.blog-filter-tag');

  const modalOverlay = document.getElementById('article-modal');
  const modalBody = document.getElementById('modal-article-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!blogGrid || !BLOG_POSTS) return;

  function renderPosts(posts) {
    blogGrid.innerHTML = '';
    if (posts.length === 0) {
      blogGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--white-muted); padding: 3rem;">No legal articles matching your query.</div>`;
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'glass-panel blog-card tri-border-card';
      card.innerHTML = `
        <div>
          <div class="blog-tag">${post.tag} • ${post.category}</div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <span style="font-size: 0.78rem; color: var(--white-muted);">${post.readTime}</span>
          <span class="read-more-link">Read Full Guide &rarr;</span>
        </div>
      `;

      card.addEventListener('click', () => openArticleModal(post));
      blogGrid.appendChild(card);
    });
  }

  function openArticleModal(post) {
    if (!modalOverlay || !modalBody) return;
    modalBody.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <span class="glass-badge glass-badge-gold" style="font-size: 0.8rem;">${post.category} • ${post.tag}</span>
        <h1 style="font-family: var(--font-serif); font-size: 2.2rem; color: #fff; margin-top: 0.8rem; line-height: 1.25;">${post.title}</h1>
        <div style="font-size: 0.85rem; color: var(--white-muted); margin-top: 0.5rem;">Indian Law School Knowledge Hub • ${post.readTime}</div>
      </div>
      <div class="article-content">${post.content}</div>
      <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--white-border); text-align: center;">
        <h4 style="font-family: var(--font-serif); color: var(--gold-light); margin-bottom: 0.5rem;">Ready to Master the Law with ILS?</h4>
        <p style="color: var(--white-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Enroll in our flagship courses or speak directly with academic mentors.</p>
        <button class="btn btn-gold modal-enroll-trigger">Explore KLEE 2027 Super Batch</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const innerEnrollBtn = modalBody.querySelector('.modal-enroll-trigger');
    if (innerEnrollBtn) {
      innerEnrollBtn.addEventListener('click', () => {
        closeArticleModal();
        const modal = document.getElementById('enroll-modal');
        if (modal) modal.classList.add('active');
      });
    }
  }

  function closeArticleModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeArticleModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeArticleModal();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = BLOG_POSTS.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
      renderPosts(filtered);
    });
  }

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tag = btn.getAttribute('data-tag');
      if (tag === 'all') {
        renderPosts(BLOG_POSTS);
      } else {
        renderPosts(BLOG_POSTS.filter(p => p.category.toLowerCase() === tag.toLowerCase() || p.tag.toLowerCase() === tag.toLowerCase()));
      }
    });
  });

  renderPosts(BLOG_POSTS);
}
