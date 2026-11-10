import { gsap } from '../core/gsap.js';
import { $, $$, prefersReducedMotion } from '../core/env.js';
import { SELECTORS, NAVBAR } from '../config.js';

/**
 * Navbar : ouverture / fermeture animée du menu (vers le bas), burger → croix,
 * accessibilité (aria-expanded, Échap, clic extérieur, sortie du focus) et masquage au scroll.
 *
 * Contrat Webflow :
 *  - [data-navbar="component"] (nav), [data-navbar="toggle"] (button), [data-navbar="menu"]
 *  - combo .is-open sur le bouton, les deux .navbar_menu-line et le menu (display: block)
 */
export function initNavbar({ lenis } = {}) {
  const S = SELECTORS.navbar;
  const root = $(S.component);
  if (!root) return null;

  const toggle = $(S.toggle, root);
  const menu = $(S.menu, root);
  if (!toggle || !menu) return null;

  const wrapper = root.closest(S.wrapper) || root;
  const lines = $$(S.line, toggle);
  const items = $$(S.menuItems, menu);

  let isOpen = false;
  let tl = null;

  // Le menu peut dépasser la hauteur d'écran sur mobile : il défile seul, sans Lenis
  menu.setAttribute('data-lenis-prevent', '');

  const setAria = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  const setClasses = (open) => {
    [toggle, menu, ...lines].forEach((el) => el.classList.toggle('is-open', open));
    root.classList.toggle('is-menu-open', open);
  };

  function open() {
    if (isOpen) return;
    isOpen = true;
    setAria(true);
    tl?.kill();
    setClasses(true);
    showBar();
    addListeners();

    if (prefersReducedMotion()) return;

    tl = gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .set(menu, { overflow: 'hidden' })
      .fromTo(menu, { height: 0 }, { height: 'auto', duration: 0.75, clearProps: 'height,overflow' }, 0)
      .fromTo(lines[0], { y: 0, rotate: 0 }, { y: 3, rotate: 45, duration: 0.5, ease: 'power3.inOut' }, 0)
      .fromTo(lines[1], { y: 0, rotate: 0 }, { y: -3, rotate: -45, duration: 0.5, ease: 'power3.inOut' }, 0)
      .fromTo(
        items,
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.035, clearProps: 'transform,opacity,visibility' },
        0.14
      );
  }

  function close({ returnFocus = false } = {}) {
    if (!isOpen) return;
    isOpen = false;
    setAria(false);
    removeListeners();
    tl?.kill();
    if (returnFocus) toggle.focus();

    const finish = () => {
      setClasses(false);
      gsap.set([menu, ...items, ...lines], { clearProps: 'all' });
    };

    if (prefersReducedMotion()) return finish();

    toggle.classList.remove('is-open');
    root.classList.remove('is-menu-open');

    tl = gsap
      .timeline({ onComplete: finish })
      .set(menu, { overflow: 'hidden', height: menu.offsetHeight })
      .to(items, { y: -8, autoAlpha: 0, duration: 0.22, ease: 'power2.in', stagger: { each: 0.012, from: 'end' } }, 0)
      .to(lines, { y: 0, rotate: 0, duration: 0.45, ease: 'power3.inOut' }, 0)
      .to(menu, { height: 0, duration: 0.55, ease: 'expo.inOut' }, 0.06);
  }

  const toggleMenu = () => (isOpen ? close() : open());

  // --- Écouteurs actifs seulement quand le menu est ouvert ---
  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close({ returnFocus: true });
    }
  };
  const onPointerDown = (e) => {
    if (!root.contains(e.target)) close();
  };
  const onFocusOut = (e) => {
    if (e.relatedTarget && !root.contains(e.relatedTarget)) close();
  };
  const onMenuClick = (e) => {
    if (e.target.closest('a')) close();
  };

  function addListeners() {
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true });
    root.addEventListener('focusout', onFocusOut);
    menu.addEventListener('click', onMenuClick);
  }
  function removeListeners() {
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('pointerdown', onPointerDown, { capture: true });
    root.removeEventListener('focusout', onFocusOut);
    menu.removeEventListener('click', onMenuClick);
  }

  toggle.addEventListener('click', toggleMenu);
  setAria(false);

  // --- Masquage au scroll vers le bas, réapparition au scroll vers le haut ---
  let barHidden = false;
  function hideBar() {
    if (barHidden || isOpen || root.contains(document.activeElement)) return;
    barHidden = true;
    gsap.to(wrapper, { yPercent: -160, duration: prefersReducedMotion() ? 0 : 0.6, ease: 'power3.out', overwrite: true });
  }
  function showBar() {
    if (!barHidden) return;
    barHidden = false;
    gsap.to(wrapper, { yPercent: 0, duration: prefersReducedMotion() ? 0 : 0.6, ease: 'power3.out', overwrite: true });
  }

  if (NAVBAR.autoHide) {
    const onScroll = (y, direction) => {
      if (y < NAVBAR.autoHideThreshold || direction < 0) showBar();
      else if (direction > 0) hideBar();
    };

    if (lenis) {
      lenis.on('scroll', ({ scroll, direction }) => onScroll(scroll, direction));
    } else {
      let lastY = window.scrollY;
      let ticking = false;
      window.addEventListener(
        'scroll',
        () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            const y = window.scrollY;
            onScroll(y, Math.sign(y - lastY));
            lastY = y;
            ticking = false;
          });
        },
        { passive: true }
      );
    }
    // Navigation clavier : la barre réapparaît dès qu'elle reçoit le focus
    root.addEventListener('focusin', showBar);
  }


  return { open, close, toggle: toggleMenu, get isOpen() { return isOpen; } };
}
