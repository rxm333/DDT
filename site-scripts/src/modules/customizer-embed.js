import { $$ } from '../core/env.js';

/**
 * Pont avec le personnaliseur intégré (iframe, dépôt privé rxm333/DDT-customizer).
 *
 * Reprend le protocole de son script hôte officiel (public/embed-fullscreen.js), adapté au site :
 * - hauteur : protocole de son embed-layout-host.js, réimplémenté pour retirer l'espace réservé
 *   sous la navbar (le cadre finit pile en bas de l'écran) ;
 * - plein écran de la vue (« ddt:viewer ») : le cadre passe en position fixe, la page est figée ;
 * - panier (« ddt:cart-ping » / « ddt:cart-add ») : au lieu de l'API panier de la boutique en ligne
 *   Shopify (/cart/add.js, absente ici), la création est ajoutée au panier Storefront du site.
 *
 * Seuls les messages de l'origine du personnaliseur, envoyés par un de ses cadres, sont acceptés.
 */

export const CUSTOMIZER_ORIGIN = 'https://personnalisation-jeu-echecs.damedetours.com';
const UUID = /^[a-f0-9-]{36}$/;
const PROJECT_KEY = '_ddt_project';

export function initCustomizerEmbed({ lenis, cart } = {}) {
  const frames = () =>
    $$('iframe').filter((f) => {
      try {
        return new URL(f.src, location.href).origin === CUSTOMIZER_ORIGIN;
      } catch {
        return false;
      }
    });
  const frameOf = (source) => frames().find((f) => f.contentWindow === source);
  const send = (target, message) => target?.postMessage(message, CUSTOMIZER_ORIGIN);

  // ---------- Hauteur (protocole de embed-layout-host.js du personnaliseur) ----------
  // Le cadre occupe la hauteur de l'écran MOINS l'espace réservé sous la navbar (padding-top de
  // .section_cfg-app) : il finit pile en bas de l'écran, bouton « Passer ma commande » visible.
  // Le personnaliseur peut ensuite demander plus de hauteur (tiroirs ouverts) : « ddt:layout-size ».
  let probe = null;
  let pending = 0;
  const viewportHeight = () => {
    if (!probe) {
      probe = document.createElement('div');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;width:0;height:100vh;height:100svh';
      document.body.append(probe);
    }
    return probe.getBoundingClientRect().height || window.innerHeight;
  };
  const offsetOf = (frame) => {
    const section = frame.closest('.section_cfg-app');
    return section ? parseFloat(getComputedStyle(section).paddingTop) || 0 : 0;
  };
  const fitHeight = (frame) => Math.max(320, Math.round(viewportHeight() - offsetOf(frame)));

  function measure() {
    pending = 0;
    if (session) return;
    frames().forEach((frame) => {
      if (!frame.closest('.ddt-personnaliseur-fullscreen')) return;
      const rect = frame.getBoundingClientRect();
      send(frame.contentWindow, { type: 'ddt:layout-viewport', height: fitHeight(frame), width: rect.width, top: rect.top });
    });
  }
  const schedule = () => {
    if (!pending) pending = requestAnimationFrame(measure);
  };

  function mount() {
    frames().forEach((frame) => {
      if (frame.dataset.ddtMounted) return;
      frame.dataset.ddtMounted = 'true';
      // Hauteur posée avant la première réponse du personnaliseur : pas de saut au chargement
      frame.style.height = `${fitHeight(frame)}px`;
      frame.addEventListener('load', schedule);
    });
    schedule();
  }
  window.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('fullscreenchange', schedule);

  // ---------- Plein écran de la vue (repris de embed-fullscreen.js) ----------
  let session = null;
  function close(inform = false) {
    if (!session) return;
    const saved = session;
    session = null;
    saved.undo.reverse().forEach((undo) => undo());
    window.scrollTo(saved.x, saved.y);
    saved.frame.removeEventListener('load', saved.onLoad);
    lenis?.start?.();
    if (inform) send(saved.frame.contentWindow, { type: 'ddt:viewer-exit' });
  }
  function open(frame) {
    if (session?.frame === frame) return;
    if (session) close(true);
    const saved = { frame, x: window.scrollX, y: window.scrollY, undo: [] };
    session = saved;
    const patch = (el, styles) => {
      for (const [key, value] of Object.entries(styles)) {
        const old = el.style.getPropertyValue(key);
        const priority = el.style.getPropertyPriority(key);
        saved.undo.push(() => (old ? el.style.setProperty(key, old, priority) : el.style.removeProperty(key)));
        el.style.setProperty(key, value, 'important');
      }
    };
    // Le cadre reste à sa place dans le DOM : le déplacer rechargerait la création
    for (let node = frame; node?.parentElement; node = node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling === node) continue;
        const inert = sibling.inert;
        saved.undo.push(() => (sibling.inert = inert));
        sibling.inert = true;
      }
      if (node !== frame) {
        patch(node, { transform: 'none', filter: 'none', perspective: 'none', contain: 'none', 'content-visibility': 'visible', 'will-change': 'auto', overflow: 'visible', 'clip-path': 'none', opacity: '1', isolation: 'auto', 'z-index': 'auto' });
      }
    }
    lenis?.stop?.();
    patch(document.documentElement, { overflow: 'hidden', 'overscroll-behavior': 'none', 'touch-action': 'none' });
    patch(document.body, { position: 'fixed', top: `${-saved.y}px`, left: `${-saved.x}px`, width: '100%', height: '100%', overflow: 'hidden', 'overscroll-behavior': 'none', 'touch-action': 'none' });
    patch(frame, { position: 'fixed', inset: '0', top: '0', left: '0', right: '0', bottom: '0', width: '100vw', height: '100dvh', 'min-width': '0', 'min-height': '0', 'max-width': 'none', 'max-height': 'none', margin: '0', padding: '0', border: '0', 'z-index': '2147483647', display: 'block', 'touch-action': 'none' });
    saved.onLoad = () => close();
    frame.addEventListener('load', saved.onLoad);
    send(frame.contentWindow, { type: 'ddt:viewer-host-ready' });
  }

  // ---------- Panier ----------
  const projectLines = (id) =>
    (cart?.cart?.lines?.nodes || []).filter((line) => line.attributes?.some((a) => a.key === PROJECT_KEY && a.value === id));
  const missingVariant = (error) => /merchandise|variant|variante|not exist|introuvable|not found/i.test(String(error?.message || ''));
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function addCreation({ item, replaceProjectId }) {
    const id = Number(item?.id);
    const project = item?.properties?.[PROJECT_KEY];
    if (!item || !Number.isSafeInteger(id) || id <= 0 || item.quantity !== 1 || !UUID.test(project || '')) {
      throw new Error('Référence de création invalide.');
    }
    const editing = replaceProjectId != null;
    if (editing && (!UUID.test(replaceProjectId) || replaceProjectId === project)) throw new Error('Référence de modification invalide.');
    if (!cart?.configured) throw new Error('Le panier est momentanément indisponible. Votre création reste enregistrée.');

    await cart.refresh();
    if (!projectLines(project).length) {
      const line = {
        merchandiseId: `gid://shopify/ProductVariant/${id}`,
        quantity: 1,
        attributes: Object.entries(item.properties || {}).map(([key, value]) => ({ key, value: String(value) })),
      };
      // Une variante tout juste créée peut mettre un instant à être visible côté vitrine :
      // on ne réessaie que ce refus précis (jamais une erreur réseau ambiguë : risque de doublon).
      const waits = [0, 550, 1100, 1800, 3000];
      for (let attempt = 0; attempt < waits.length; attempt += 1) {
        if (waits[attempt]) await wait(waits[attempt]);
        try {
          await cart.add(line);
          break;
        } catch (error) {
          console.warn('[DDS] Personnaliseur : ajout refusé', { attempt: attempt + 1, error });
          if (!missingVariant(error) || attempt === waits.length - 1) {
            throw new Error('Le jeu n’est pas encore disponible dans le panier. Votre création reste enregistrée ; réessayez dans un instant.');
          }
        }
      }
    }
    // Modification : l'ancienne version est retirée une fois la nouvelle ajoutée
    if (editing) {
      const old = projectLines(replaceProjectId);
      if (old.length) await cart.removeLines(old.map((l) => l.id));
    }
  }

  // ---------- Messages ----------
  window.addEventListener('message', async (event) => {
    if (event.origin !== CUSTOMIZER_ORIGIN) return;
    const frame = frameOf(event.source);
    if (!frame) return;
    const data = event.data || {};

    if (data.type === 'ddt:layout-ready') {
      mount();
      return;
    }
    if (data.type === 'ddt:layout-size') {
      if (session || document.fullscreenElement) return;
      if (Number.isFinite(data.height) && data.height >= 200 && data.height <= 50000) {
        const height = `${Math.ceil(data.height)}px`;
        if (frame.style.height !== height) frame.style.height = height;
      }
      return;
    }
    if (data.type === 'ddt:layout-reveal') {
      // Le personnaliseur demande à montrer un point précis de son contenu (tiroir ouvert…)
      if (session || !Number.isFinite(data.top) || data.top < 0) return;
      const y = window.scrollY + frame.getBoundingClientRect().top + data.top;
      if (lenis) lenis.scrollTo(y, { immediate: !data.smooth });
      else window.scrollTo({ top: y, behavior: data.smooth ? 'smooth' : 'instant' });
      return;
    }

    if (data.type === 'ddt:viewer' && typeof data.active === 'boolean') {
      if (data.active) open(frame);
      else if (session?.frame === frame) close();
      return;
    }
    if (data.type === 'ddt:cart-ping') {
      send(event.source, { type: 'ddt:cart-ready', requestId: data.requestId });
      return;
    }
    if (data.type === 'ddt:cart-add') {
      try {
        await addCreation({ item: data.item, replaceProjectId: data.replaceProjectId });
        send(event.source, { type: 'ddt:cart-result', requestId: data.requestId, ok: true });
        close();
        cart?.open?.();
      } catch (error) {
        console.error('[DDS] Personnaliseur : ajout au panier non finalisé', error);
        send(event.source, { type: 'ddt:cart-result', requestId: data.requestId, ok: false, error: error.message });
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (session && event.key === 'Escape') close(true);
  });
  for (const type of ['touchmove', 'wheel']) {
    document.addEventListener(type, (event) => session && event.cancelable && event.preventDefault(), { passive: false });
  }
  window.addEventListener('pagehide', () => close());

  mount();
  return { mount, close };
}
