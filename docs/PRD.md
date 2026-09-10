# PRD : Landing Page Deporrtex — Lunettes de Sport

> Source : Questionnement structuré /interroge + screenshots produit et témoignages

## Problème

Les sportifs algériens qui portent des lunettes de vue font face à trois frustrations majeures pendant leurs activités physiques : leurs lunettes classiques glissent avec la sueur et les mouvements, ils ont peur de les casser (un remplacement coûte cher), et la vision manque de clarté dans l'effort. Ils doivent choisir entre voir correctement et pratiquer librement leur sport. Aucune solution abordable, accessible en Algérie avec paiement à la livraison, ne résout ce trilemme aujourd'hui.

## Solution

Des lunettes de sport conçues pour être portées pendant l'activité physique, avec des verres correcteurs interchangeables (le client les fait monter chez son opticien). Deux modes de port : branches classiques pour un usage quotidien, ou sangle élastique ajustable pour les sports intenses. Le client commande en ligne via une landing page dédiée, choisit son coloris parmi deux options (Noir/Rouge ou Transparent), et reçoit le produit chez lui partout en Algérie (58 wilayas), paiement à la réception. Prix : 2 900 DA au lieu de 4 200 DA.

## Utilisateur cible

Homme algérien, 18-40 ans, porteur de lunettes de vue, sportif actif ou amateur (football, basket, running, musculation, sports de combat). Il utilise Facebook et Instagram depuis son smartphone. Il commande en ligne en cash on delivery. Il cherche un produit abordable (~3 000 DA) livré rapidement à sa wilaya. Il parle arabe (darija algérienne / arabe standard).

## User Stories

- **US-1** : En tant que visiteur, je veux comprendre en moins de 5 secondes ce que le produit résout, afin de décider si je continue à lire.
- **US-2** : En tant que visiteur, je veux voir les problèmes que j'ai avec mes lunettes actuelles listés clairement, afin de me sentir compris.
- **US-3** : En tant que visiteur, je veux voir les caractéristiques du produit (sangle ajustable, cadre solide, verres interchangeables), afin de comprendre comment il résout mes problèmes.
- **US-4** : En tant que visiteur, je veux voir des photos réelles du produit sous plusieurs angles et dans les 2 coloris, afin de savoir exactement ce que je vais recevoir.
- **US-5** : En tant que visiteur, je veux voir des témoignages réels de clients (screenshots de conversations et commentaires Facebook), afin d'être rassuré avant de laisser mes coordonnées.
- **US-6** : En tant que visiteur, je veux voir le prix clairement avec la réduction (ancien prix barré → nouveau prix), afin de sentir que c'est une bonne affaire.
- **US-7** : En tant que client, je veux choisir mon coloris (Noir/Rouge ou Transparent) visuellement, afin de commander exactement ce que je veux.
- **US-8** : En tant que client, je veux remplir un formulaire simple (nom, téléphone, wilaya, adresse, quantité) et soumettre ma commande, afin de commander sans quitter la page.
- **US-9** : En tant que client, je veux recevoir une confirmation visuelle après soumission, afin de savoir que ma commande a bien été enregistrée.
- **US-10** : En tant que visiteur hésitant, je veux pouvoir contacter le vendeur par WhatsApp, afin de poser mes questions avant de commander.
- **US-11** : En tant que propriétaire, je veux recevoir chaque commande automatiquement dans un tableau Google Sheets, afin de traiter les commandes sans ressaisie manuelle.
- **US-12** : En tant que visiteur, je veux que la page s'affiche correctement sur mon smartphone, afin de commander facilement depuis mobile.

## Critères de succès

- La page se charge en moins de 3 secondes sur mobile 4G.
- Le texte arabe s'affiche correctement en RTL sur tous les navigateurs mobiles courants.
- Le formulaire refuse la soumission si un champ obligatoire est vide.
- Le formulaire refuse un numéro de téléphone au format invalide (doit commencer par 0, 10 chiffres).
- Chaque soumission de formulaire crée une nouvelle ligne dans le Google Sheet avec toutes les données.
- Le bouton WhatsApp ouvre une conversation vers le bon numéro (0673547329).
- Les liens Facebook et Instagram pointent vers les bons comptes Deporrtex.
- La page est utilisable sans scroll horizontal sur un écran de 360px de large.
- Les 4 screenshots de témoignages sont visibles et lisibles sur mobile.

## Hors périmètre

- Paiement en ligne (Stripe, CIB, etc.) — tout est COD.
- Compte client / inscription / connexion.
- Panier multi-produits — c'est une landing page one-product.
- Gestion de stock / tracking des livraisons.
- Version multilingue (français ou anglais) — arabe uniquement.
- Dashboard admin pour les commandes — Google Sheets suffit.
- Notifications email/SMS automatiques au client après commande.
- SEO avancé / blog / pages additionnelles.

## Décisions d'implémentation

- Page unique sans navigation multi-pages — tout le parcours est en scroll vertical.
- Le formulaire affiche les 58 wilayas dans une liste déroulante triée par numéro.
- Le sélecteur de coloris est visuel (vignettes cliquables) et non une simple liste déroulante.
- Le prix s'affiche : ancien prix barré 4 200 DA suivi du nouveau prix 2 900 DA avec un badge pourcentage (-31%).
- Après soumission réussie, un message de confirmation remplace le formulaire (pas de redirection).
- Le bouton WhatsApp est visible en permanence (flottant en bas à droite) sur toutes les tailles d'écran.
- La section témoignages affiche les 4 screenshots réels (commentaires Facebook + conversations Instagram/Messenger).
- Le header reste fixe en haut lors du scroll avec un bouton d'action visible.
- Design sombre/sportif : fond noir (#0a0a0a), accent rouge (#e63946), texte blanc, typographie arabe bold (Cairo ou Tajawal).
- Direction RTL (right-to-left) pour l'arabe.
- Mobile-first responsive (la majorité du trafic COD Algérie est mobile).

## Notes complémentaires

- Témoignages disponibles : 4 screenshots dans le dossier `temoignage/` (2 commentaires Facebook, 1 conversation Instagram, 1 message Messenger).
- L'intégration Google Sheets nécessite une configuration manuelle (Google Apps Script) — des instructions pas-à-pas seront fournies.
- Les images du dossier sont lourdes (100-240 Ko) — une compression pourra être nécessaire pour le temps de chargement mobile.
- Marque : Deporrtex. Téléphone/WhatsApp : 0673547329. Facebook : https://www.facebook.com/share/19UMhUMsKD/. Instagram : @deporrtex.
