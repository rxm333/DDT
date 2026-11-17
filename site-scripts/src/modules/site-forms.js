/**
 * Formulaires du site (newsletter, contact) envoyés au serveur de l'atelier (même serveur que le
 * personnaliseur), qui prévient l'atelier par e-mail et inscrit les abonnés dans Shopify.
 * Remplace l'envoi Webflow, qui ne fonctionne plus hors de Webflow.
 *  - <form data-site-form="newsletter|contact"> dans un bloc .w-form (messages .w-form-done / .w-form-fail) ;
 *  - champ piège « website » caché : rempli = robot ;
 *  - erreurs annoncées (role="alert"), focus sur le premier champ en défaut.
 */
import { $, $$ } from '../core/env.js';

const API = 'https://personnalisation-jeu-echecs.damedetours.com/api/';
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const field = (form, ...names) => names.map((n) => form.elements.namedItem(n)).find(Boolean);

function payload(form, kind) {
  const val = (...names) => (field(form, ...names)?.value || '').trim();
  const base = { email: val('email', 'E-mail'), website: val('website'), page: location.pathname };
  if (kind === 'newsletter') return { ...base, consent: !!field(form, 'consent')?.checked };
  return { ...base, name: val('name', 'Nom'), phone: val('phone', 'Telephone'), order: val('order', 'Commande'), message: val('message', 'Commentaire'), topic: val('topic', 'Sujet') };
}

function check(form, kind, data) {
  const email = field(form, 'email', 'E-mail');
  if (!EMAIL.test(data.email)) return [email, 'Indiquez une adresse e-mail valide.'];
  if (kind === 'newsletter' && !data.consent) return [field(form, 'consent'), 'Cochez la case pour accepter de recevoir la newsletter.'];
  if (kind === 'contact' && data.message.length < 2) return [field(form, 'message', 'Commentaire'), 'Écrivez votre message.'];
  return null;
}

function notice(form) {
  let el = $('.site-form_error', form);
  if (!el) {
    el = document.createElement('p');
    el.className = 'site-form_error';
    el.setAttribute('role', 'alert');
    form.append(el);
  }
  return el;
}

function initForm(form) {
  if (form.dataset.siteFormReady) return;
  form.dataset.siteFormReady = '';
  const kind = form.dataset.siteForm;
  const wrap = form.closest('.w-form') || form.parentElement;
  const done = $('.w-form-done', wrap);
  const failBox = $('.w-form-fail', wrap);
  const submit = $('[type="submit"]', form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // pas d'envoi Webflow
    const data = payload(form, kind);
    const err = notice(form);
    err.textContent = '';
    $$('[aria-invalid]', form).forEach((el) => el.removeAttribute('aria-invalid'));
    const problem = check(form, kind, data);
    if (problem) {
      const [el, msg] = problem;
      err.textContent = msg;
      el?.setAttribute('aria-invalid', 'true');
      el?.focus();
      return;
    }
    // Le texte du bouton n'est pas remplacé (il porte l'animation des boutons) : état « en cours » par attribut
    if (submit) {
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
    }
    if (failBox) failBox.style.display = 'none';
    try {
      const res = await fetch(API + kind, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), mode: 'cors' });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || '');
      form.style.display = 'none';
      if (done) {
        done.style.display = 'block';
        done.setAttribute('tabindex', '-1');
        done.focus({ preventScroll: true });
      }
      form.dispatchEvent(new CustomEvent('dds:form-sent', { bubbles: true, detail: { kind } }));
    } catch (error) {
      if (error.message) err.textContent = error.message;
      if (failBox) failBox.style.display = 'block';
      else if (!error.message) err.textContent = 'L’envoi n’a pas abouti. Réessayez dans un instant.';
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
    }
  }, true);
}

export function initSiteForms(root = document) {
  $$('form[data-site-form]', root).forEach(initForm);
}
