import { $, $$ } from '../core/env.js';

/**
 * Page article (modèle CMS « Actualités »).
 * - date en français et temps de lecture (champ CMS, sinon calculé sur le texte) ;
 * - ancres sur les titres H2 du contenu + sommaire « Dans cet article » avec section active ;
 * - photos consécutives présentées par paires, signature des citations ;
 * - liens de partage (Facebook, e-mail, copier le lien) ;
 * - blocs facultatifs (bouton d'action, jeu présenté) masqués s'ils sont vides ;
 * - « À lire ensuite » : retire l'article en cours, garde 3 articles au plus.
 */

const WORDS_PER_MINUTE = 200;

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'section';

function formatDate(el) {
  const raw = el.textContent.trim();
  const date = new Date(raw);
  if (!raw || Number.isNaN(date.getTime())) return;
  const pad = (n) => String(n).padStart(2, '0');
  // Date locale (et non UTC) : « July 30, 2026 » ne doit pas devenir le 29 selon le fuseau.
  el.setAttribute('datetime', `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`);
  el.textContent = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function readingTime(el, body) {
  const fromCms = parseInt(el.getAttribute('data-article-reading'), 10);
  const words = (body?.textContent || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = fromCms > 0 ? fromCms : Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  el.textContent = `Lecture ${minutes} min`;
}

function enhanceBody(body) {
  // Paires de photos : deux figures qui se suivent s'affichent côte à côte.
  $$(':scope > figure', body).forEach((fig) => {
    const next = fig.nextElementSibling;
    if (fig.parentElement !== body || !next || next.tagName !== 'FIGURE' || fig.closest('.article-figure-pair')) return;
    const pair = document.createElement('div');
    pair.className = 'article-figure-pair';
    fig.before(pair);
    pair.append(fig, next);
  });
  // Citation : un paragraphe entièrement en italique juste après sert de signature.
  $$(':scope > blockquote', body).forEach((quote) => {
    const next = quote.nextElementSibling;
    if (next?.tagName === 'P' && next.children.length === 1 && next.firstElementChild.tagName === 'EM' && next.textContent.trim() === next.firstElementChild.textContent.trim()) {
      next.classList.add('article-quote_cite');
      quote.classList.add('has-cite');
    }
  });
  // Liens externes du contenu : nouvel onglet annoncé aux lecteurs d'écran.
  $$('a[href^="http"]', body).forEach((a) => {
    if (a.host === location.host) return;
    a.target = '_blank';
    a.rel = 'noopener';
    if (!a.querySelector('.dds-sr')) a.insertAdjacentHTML('beforeend', '<span class="dds-sr"> (nouvel onglet)</span>');
  });
}

function buildToc(body, toc) {
  const headings = $$('h2', body);
  const list = $('ul', toc);
  if (!headings.length || !list) {
    toc.hidden = true;
    toc.previousElementSibling?.classList.contains('article-aside_divider') && (toc.previousElementSibling.hidden = true);
    return null;
  }
  const used = new Set();
  list.innerHTML = '';
  const links = headings.map((h) => {
    let id = h.id || slugify(h.textContent);
    while (used.has(id) || (document.getElementById(id) && document.getElementById(id) !== h)) id += '-2';
    used.add(id);
    h.id = id;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'article-aside_toc-link';
    a.href = `#${id}`;
    a.textContent = h.textContent.trim();
    li.append(a);
    list.append(li);
    return a;
  });

  // Section active : le dernier titre passé sous le haut de l'écran.
  const setActive = (i) => links.forEach((a, j) => (j === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.3;
    let current = 0;
    headings.forEach((h, i) => {
      if (h.getBoundingClientRect().top <= line) current = i;
    });
    setActive(current);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

function initShare(root) {
  const url = location.href.split('#')[0];
  const title = document.title;
  const fb = $('[data-share="facebook"]', root);
  if (fb) {
    fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    fb.setAttribute('aria-label', 'Partager sur Facebook (nouvel onglet)');
  }
  const mail = $('[data-share="email"]', root);
  if (mail) {
    mail.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
    mail.setAttribute('aria-label', 'Partager par e-mail');
  }
  const copy = $('[data-share="copy"]', root);
  if (!copy) return;
  const label = copy.textContent;
  let live = $('.article-aside_live', root);
  if (!live) {
    live = document.createElement('span');
    live.className = 'dds-sr article-aside_live';
    live.setAttribute('aria-live', 'polite');
    copy.after(live);
  }
  copy.addEventListener('click', async (e) => {
    e.preventDefault();
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      ok = false;
    }
    copy.textContent = ok ? 'Lien copié' : 'Copie impossible';
    live.textContent = ok ? 'Lien de l’article copié dans le presse-papiers.' : 'La copie du lien a échoué.';
    setTimeout(() => {
      copy.textContent = label;
      live.textContent = '';
    }, 2200);
  });
  copy.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      copy.click();
    }
  });
}

function hideEmpty(root) {
  const cta = $('[data-article-cta]', root);
  if (cta) {
    const href = cta.getAttribute('href') || '';
    if (!cta.textContent.trim() || !href || href === '#') cta.closest('.article-body_cta')?.setAttribute('hidden', '');
    else if (/^https?:/.test(href) && !href.includes(location.host)) {
      cta.target = '_blank';
      cta.rel = 'noopener';
      cta.insertAdjacentHTML('beforeend', '<span class="dds-sr"> (nouvel onglet)</span>');
    }
  }
  const product = $('.article-product_component', root);
  const name = product && $('.article-product_link', product);
  if (product && !name?.textContent.trim()) product.hidden = true;
}

function trimRelated(root) {
  const list = $('[data-article-related]', root);
  if (!list) return;
  const here = location.pathname.replace(/\/$/, '');
  const base = here.replace(/\/[^/]*$/, '') || '/actualites';
  // Filet de sécurité : si le lien ne mène pas à l'article, on le reconstruit depuis le slug.
  $$('[data-article-slug]', list).forEach((a) => {
    const slug = a.getAttribute('data-article-slug');
    if (slug && !new URL(a.href, location.href).pathname.endsWith(`/${slug}`)) a.setAttribute('href', `${base}/${slug}`);
  });
  $$('.news_item', list).forEach((item) => {
    const link = $('a[href]', item);
    if (link && new URL(link.href, location.href).pathname.replace(/\/$/, '') === here) item.remove();
  });
  $$('.news_item', list).slice(3).forEach((item) => item.remove());
  if (!$('.news_item', list)) list.closest('section')?.setAttribute('hidden', '');
}

export function initArticle() {
  // Pendant une transition Barba, l'ancienne page est encore dans le DOM (avant la nouvelle) :
  // on travaille toujours dans le conteneur le plus récent.
  const containers = $$('[data-barba="container"]');
  const root = containers[containers.length - 1] || document;
  const body = $('[data-article-body]', root);
  if (!body) return null;
  const cleanups = [];
  $$('[data-article-date]', root).forEach(formatDate);
  $$('[data-article-reading]', root).forEach((el) => readingTime(el, body));
  enhanceBody(body);
  const toc = $('[data-article-toc]', root);
  if (toc) {
    const off = buildToc(body, toc);
    if (off) cleanups.push(off);
  }
  initShare(root);
  hideEmpty(root);
  trimRelated(root);
  return { destroy: () => cleanups.forEach((fn) => fn()) };
}
