// Bundle 3D (Three.js) chargé à la demande : héros de l'accueil + visualiseur de la page collection.
import './index.js'; // démarre seul s'il trouve [data-hero-viewer]
import { bootViewers } from './viewer.js';

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootViewers, { once: true });
else bootViewers();
