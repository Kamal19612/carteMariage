# Skill Cursor — Carte de mariage numérique animée

## Objectif
Générer une page web animée (type "save-the-date" / faire-part digital) à partir de ressources fournies par le client : noms des mariés, date, lieu, palette, photos, éventuellement musique. Le rendu doit être fluide, mobile-first, et partageable via un simple lien.

## Déclencheur pour l'agent
Utiliser ce skill dès qu'on te demande de créer un faire-part, une invitation ou une "carte de mariage" numérique/animée/interactive.

---

## 1. Ressources à demander AVANT de coder

Avant de lancer le développement, demande systématiquement au client (ou vérifie qu'elles sont déjà fournies) :

- **Texte** : prénoms des mariés, date, heure, lieu (nom + adresse), programme (cérémonie, cocktail, dîner...), message d'introduction, lien RSVP (formulaire Google Forms, WhatsApp, etc.)
- **Identité visuelle** : palette de couleurs (2-4 couleurs), typographies souhaitées (script pour les noms + serif/sans pour le corps), style (floral, minimaliste, doré/luxueux, tropical, traditionnel...)
- **Médias** : photos du couple (haute résolution), logo/monogramme si existant, motifs décoratifs en SVG/PNG (fleurs, feuillages, cadres), musique de fond (fichier mp3 léger, < 3 Mo, avec autorisation d'usage)
- **Format cible** : lien à partager (web) vs export vidéo/GIF pour réseaux sociaux — clarifier car ça change complètement la stack

Si une ressource manque, utiliser un placeholder clairement identifié (`/* PLACEHOLDER: photo mariés */`) plutôt que d'inventer du contenu définitif.

## 2. Stack recommandée

- **React + Vite** (cohérent avec le workflow existant) — ou HTML/CSS/JS pur si le projet est simple et à déployer vite
- **GSAP** (`gsap`, `ScrollTrigger`) pour les timelines d'ouverture et les animations au scroll
- **Howler.js** ou simple balise `<audio>` pour la musique de fond, avec bouton mute/unmute visible dès le premier écran (jamais d'autoplay sonore sans interaction utilisateur — bloqué par les navigateurs de toute façon)
- Déploiement : Vercel ou Netlify (lien immédiat, gratuit, pas de backend nécessaire)

## 3. Structure de page type

1. **Écran d'ouverture (hero)** : enveloppe ou monogramme animé, clic/tap pour "ouvrir" la carte (déclenche la timeline GSAP principale + démarre la musique)
2. **Reveal des noms** : apparition en fondu + léger décalage (stagger), typographie signature bien visible
3. **Bloc date & lieu** : mis en scène avec une animation d'entrée au scroll (`ScrollTrigger`)
4. **Programme / timeline de la journée** : liste animée élément par élément
5. **Galerie photo** (optionnelle) : quelques photos du couple avec effet parallax léger
6. **Décorations SVG animées** : motifs floraux dessinés au chargement via `stroke-dasharray` / `stroke-dashoffset`, ou éléments qui flottent en boucle douce
7. **RSVP** : bouton clair vers le formulaire/lien fourni
8. **Pied de page** : hashtag du mariage, remerciements

## 4. Patterns de code à réutiliser

### Timeline d'ouverture (GSAP)
```js
import { gsap } from "gsap";

function openInvitation() {
  const tl = gsap.timeline();
  tl.to(".envelope", { rotateX: -180, duration: 1, ease: "power2.inOut" })
    .from(".names", { opacity: 0, y: 30, stagger: 0.2, duration: 0.8 }, "-=0.3")
    .from(".date-block", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
}
```

### Reveal au scroll (ScrollTrigger)
```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.from(".programme-item", {
  scrollTrigger: { trigger: ".programme", start: "top 80%" },
  opacity: 0,
  y: 40,
  stagger: 0.15,
  duration: 0.7,
});
```

### Motif SVG dessiné
```css
.floral-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2.5s ease forwards;
}
@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

### Musique avec toggle
```jsx
const [playing, setPlaying] = useState(false);
const audioRef = useRef(null);

const toggleMusic = () => {
  playing ? audioRef.current.pause() : audioRef.current.play();
  setPlaying(!playing);
};
```

## 5. Checklist qualité avant livraison

- [ ] Responsive vérifié sur mobile (la majorité des invités ouvriront sur téléphone)
- [ ] Poids total de la page optimisé (photos compressées, musique < 3 Mo)
- [ ] Animation d'ouverture fonctionne au tap ET au clic
- [ ] Pas d'autoplay sonore forcé (respecter les policies navigateur)
- [ ] Contraste texte/fond suffisant malgré les décorations
- [ ] Lien RSVP testé et fonctionnel
- [ ] Fallback correct si JS désactivé ou animation qui bug (contenu quand même lisible)
- [ ] Titre de l'onglet + favicon personnalisés (ex: monogramme des mariés)

## 6. Instruction pour l'agent Cursor

> Quand je te fournis les ressources (textes, couleurs, polices, images, musique) pour un nouveau projet de carte de mariage, suis la structure de page ci-dessus, utilise GSAP pour les animations, respecte la checklist qualité, et propose-moi d'abord une version statique (sans animation) pour valider la mise en page avant d'ajouter les animations.
