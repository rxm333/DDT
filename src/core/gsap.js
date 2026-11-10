import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({ ease: 'power3.out', duration: 0.6 });

// Évite les recalculs quand la barre d'adresse mobile apparaît / disparaît
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText };
