// Bouton « Voir sur le site » : ouvre l'article publié (le site se met à jour ~1 min après publication).
const SITE = 'https://preprod.damedetours.com';
export function PreviewAction({ published }) {
  const slug = published?.slug?.current;
  return {
    label: 'Voir sur le site',
    disabled: !slug,
    title: slug ? 'Ouvre la page publiée (mise à jour environ 1 minute après la publication)' : 'Publiez d’abord l’article',
    onHandle: () => window.open(`${SITE}/actualites/${slug}`, '_blank', 'noopener'),
  };
}
