# P6

[![forthebadge](https://forthebadge.com/images/badges/validated-html5.svg)](https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=https%3A%2F%2Farthurblanc.github.io%2FArthurBlanc_6_25082021%2F)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/ArthurBlanc)

Lien du projet : https://arthurblanc.github.io/ArthurBlanc_6_25082021/

## Description :

> Créez un site accessible pour une plateforme de photographes
>
> #### Compétences évaluées
>
> -   Développer une application web modulaire avec des design patterns
> -   Assurer l'accessibilité d'un site web
> -   Ecrire du code JavaScript maintenable
> -   Gérer les évènements d'un site avec JavaScript

### Situation (fictive) du projet :

Développeur junior dans une société de conseil spécialisée dans le développement de sites web et d’applications mobiles.

L’entreprise souhaite se lancer sur un nouveau projet avec un nouveau client : FishEye, un site web permettant à des photographes indépendants de présenter leurs travaux, ayant comme priorité l’accessibilité pour permettre l’utilisation du site à un maximum de personnes.

Mon rôle a été de développer tout l’aspect Front-end du site à partir de maquettes approuvées par le designer et de mettre un point d’honneur sur l’accessibilité.

### Cahier des charges :

#### Page d'accueil :

-   Liste de tous les photographes avec leur nom, leur slogan, leur localisation, leur prix/heure, leurs tags et une image miniature de leur choix.

-   Au clic sur un tag, la liste des photographes est filtrée.

-   Lorsque l'utilisateur clique sur la vignette d'un photographe, il est amené à sa page.

#### Pages des photographes :

-   Affiche une galerie des travaux du photographe.
-   Les photographes peuvent montrer à la fois des photos et des vidéos.
    -   Dans le cas des vidéos, montrer une image miniature dans la galerie.
-   Chaque média comprend un titre et un nombre de likes.
    -   Lorsque l'utilisateur clique sur l'icône "Like", le nombre de likes affiché est incrémenté.
    -   Le nombre de likes total d’un photographe doit correspondre à la somme des likes de chacun de ses médias.
-   Les médias peuvent être triés par popularité, date ou par titre.
-   Lorsque l'utilisateur clique sur un média, celui-ci doit s’ouvrir dans une lightbox :
    -   Lorsque la lightbox est affichée, il y a une croix dans le coin pour fermer la fenêtre.
    -   Des boutons de navigation permettent de passer d'un élément média à l'autre.
-   Afficher un bouton pour contacter le photographe.
    -   Le formulaire de contact est une modale qui s'affiche par-dessus le reste.
    -   Il comprend des champs pour les noms, l'adresse électronique et le message.
    -   Plus tard, le bouton de contact enverra un message au photographe.
        Pour l'instant, afficher le contenu des trois champs dans les logs de la console.

#### Exigences supplémentaires :

-   Le site doit être responsive
-   Le site doit être le plus accessible possible :
    -   Utilisez des éléments HTML "sémantiques" qui décrivent leur intention autant que possible.
    -   Lors de l’utilisation d’un élément personnalisé, utilisez des attributs ARIA si nécessaire.
    -   Le code doit passer les tests AChecker sans “known issue”.
    -   Toute la gestion des événements doit être configurée.

## Installation

-   **Executez Git bash**
-   **git clone https://github.com/ArthurBlanc/ArthurBlanc_6_25082021**

## Développé avec

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte et son intégration de GitHub
-   [Bootstrap](https://getbootstrap.com/) - Collection d'outils utiles à la création du design de sites et d'applications web
-   [JQuery](https://jquery.com/) - Bibliothèque JavaScript libre et multiplateforme
-   [Isotope by Metafizzy](https://isotope.metafizzy.co/) - Javascript Filter & sort magical layouts
-   [Google Fonts](https://fonts.google.com/) - Service d’hébergement de polices d’écritures pour le Web
-   [GitHub](https://github.com/) - Outil de gestion de versions
-   [GitHub Pages](https://pages.github.com/) - Outil d’hébergement
-   [Validateur W3C](https://validator.w3.org/) - Outils de détection des erreurs dans le code HTML et CSS
-   [AChecker](https://achecker.achecks.ca/) - Outil d'évaluation des erreurs, performances et bonnes pratiques d'accessibilité
-   [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/) - Outil d'évaluation des bonnes pratiques d'accessibilité

## Auteur

**Arthur Blanc** : [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/)

## Maquettes

Lien des maquettes : https://www.figma.com/file/pt8xJxC1QffW4HX16QhGZJ/UI-Design-FishEye-FR-OLD
