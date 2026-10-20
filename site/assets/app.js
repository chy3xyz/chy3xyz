(() => {
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('details.menu');

  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 6);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (menu && header) {
    menu.addEventListener('toggle', () => {
      header.classList.toggle('is-open', menu.open);
      document.body.style.overflow = menu.open ? 'hidden' : '';
    });

    menu.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) {
        menu.open = false;
        header.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        header.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('noanim');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    const targets = document.querySelectorAll(
      '.section > .container, .collection-body .project-grid, .project-card, .insight-row, .journal-row, .timeline-item, .feature .container, .cta .container, .article-head .container, .article-grid, .page-head .container, .highlights-grid, .page-body-grid'
    );

    targets.forEach((element, index) => {
      if (element.closest('.hero')) return;
      element.classList.add('reveal');
      element.style.transitionDelay = Math.min(index % 4, 3) * 60 + 'ms';
      observer.observe(element);
    });
  }

  const article = document.querySelector('.article');
  if (article) {
    const bar = document.createElement('div');
    bar.className = 'read-progress';
    document.body.appendChild(bar);

    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      bar.style.transform = 'scaleX(' + progress + ')';
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }
})();
