// Carrousel « swipe » sur mobile, sans bibliothèque : défilement natif + scroll-snap (CSS),
// le JS ajoute seulement la pagination (points cliquables) et les annonces d'accessibilité.
// Au-delà du point de rupture, la liste reprend sa grille d'origine et la pagination disparaît.

const SWIPERS = [{ list: '.news_list', item: '.news_item', label: 'Actualités', query: '(max-width: 767px)' }];

export function initSwipers() {
  const instances = [];
  SWIPERS.forEach((cfg) => {
    document.querySelectorAll(cfg.list).forEach((list, n) => {
      const items = [...list.querySelectorAll(`:scope > ${cfg.item}`)];
      if (items.length < 2) return;
      instances.push(create(list, items, cfg, n));
    });
  });
  return instances;
}

function create(list, items, cfg, n) {
  const mq = window.matchMedia(cfg.query);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const id = list.id || `dds-swiper-${n + 1}`;
  list.id = id;
  list.classList.add('dds-swiper');

  const dots = document.createElement('div');
  dots.className = 'dds-swiper__dots';
  dots.setAttribute('role', 'group');
  dots.setAttribute('aria-label', `${cfg.label} : choisir un élément`);
  const buttons = items.map((item, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dds-swiper__dot';
    b.setAttribute('aria-controls', id);
    const title = item.querySelector('h2, h3, h4')?.textContent.trim();
    b.setAttribute('aria-label', `${i + 1} sur ${items.length}${title ? ` : ${title}` : ''}`);
    b.addEventListener('click', () => go(i));
    dots.append(b);
    return b;
  });
  list.after(dots);

  let current = -1;
  const setCurrent = (i) => {
    if (i === current) return;
    current = i;
    buttons.forEach((b, k) => (k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
  };

  const go = (i) => {
    const item = items[i];
    const pad = parseFloat(getComputedStyle(list).scrollPaddingInlineStart) || 0;
    list.scrollTo({ left: item.offsetLeft - list.offsetLeft - pad, behavior: reduce.matches ? 'auto' : 'smooth' });
    setCurrent(i);
  };

  // Élément « actif » = le plus visible dans la zone de défilement
  const ratios = new Map();
  let io = null;
  const watch = () => {
    io?.disconnect();
    if (!mq.matches) return;
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
        let best = 0;
        items.forEach((it, k) => (ratios.get(it) || 0) > (ratios.get(items[best]) || 0) && (best = k));
        setCurrent(best);
      },
      { root: list, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    items.forEach((it) => io.observe(it));
  };

  // Clavier : flèches gauche/droite quand le focus est dans la liste
  list.addEventListener('keydown', (e) => {
    if (!mq.matches || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    const next = Math.min(Math.max(current + (e.key === 'ArrowRight' ? 1 : -1), 0), items.length - 1);
    if (next === current) return;
    e.preventDefault();
    go(next);
    items[next].querySelector('a, button')?.focus({ preventScroll: true });
  });

  const apply = () => {
    const on = mq.matches;
    list.classList.toggle('is-swiper', on);
    dots.hidden = !on;
    if (on) {
      list.setAttribute('aria-roledescription', 'carrousel');
      list.setAttribute('aria-label', cfg.label);
      if (current < 0) setCurrent(0);
    } else {
      list.removeAttribute('aria-roledescription');
      list.removeAttribute('aria-label');
      list.scrollLeft = 0;
    }
    watch();
  };
  mq.addEventListener('change', apply);
  apply();
  // Le focus clavier sur une carte hors champ la ramène dans le cadre (comportement natif) : on suit
  list.addEventListener('focusin', (e) => {
    const i = items.findIndex((it) => it.contains(e.target));
    if (i >= 0) setCurrent(i);
  });

  return { list, go, get index() { return current; } };
}
