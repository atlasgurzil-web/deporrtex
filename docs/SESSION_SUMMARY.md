# Résumé Exécutif & Historique des Sessions — Projet Deporrtex

> **Dernière mise à jour :** 24 septembre 2026  
> **Workspace :** `rami site` (`atlasgurzil-web/deporrtex`)  
> **Branche active :** `feat/shopify-design-fidelity`  

---

## 1. Fiche d'Identité du Projet

Le projet **Deporrtex** est un écosystème de **Landing Pages e-commerce en Cash on Delivery (COD)**, conçu sur mesure pour le marché algérien (58 wilayas) et optimisé pour la conversion via des campagnes publicitaires ciblées **Meta Ads** (Facebook & Instagram).

| Paramètre | Détail |
| :--- | :--- |
| **Produit** | Lunettes de sport de protection 2-en-1 (branches classiques interchangeables + sangle élastique de maintien pour sports intenses, cadre antichoc, verres correcteurs adaptables chez l'opticien). |
| **Marque** | **Deporrtex** |
| **Cible** | Hommes algériens (18–40 ans), porteurs de lunettes de vue et sportifs (football, running, musculation, sports collectifs). |
| **Tarification** | **2 900 DZD** (prix d'origine barré à 4 200 DZD, réduction promotionnelle de -31%). |
| **Logistique & Paiement** | Paiement à la livraison (**Cash on Delivery / COD**), expédition sur **58 wilayas** algériennes via **NOEST Delivery**. |
| **Canaux de contact** | WhatsApp direct (`0673547329`), [Page Facebook officielle](https://www.facebook.com/share/19UMhUMsKD/), compte Instagram `@deporrtex`. |
| **Dépôt Git** | [`atlasgurzil-web/deporrtex`](https://github.com/atlasgurzil-web/deporrtex.git) |
| **Hébergement & Déploiements** | • Vercel : `https://deporrtex.vercel.app/`<br>• VPS Traefik / Autonnel : `https://maktabi.space/deportex01` à `04` |

---

## 2. Cartographie des Fichiers et Architecture Technique

Le projet repose sur une approche **ultra-rapide, sans framework lourd**, avec un balisage HTML sémantique, du CSS optimisé, du JavaScript pur (Vanilla) et un rendu **RTL natif** pour la langue arabe (police Cairo).

```
rami site/
├── index.html                  # Landing page de base (Hero + Formulaire haut de page)
├── deportex01.html             # Variante Ads 1 : Crimson Red & Stealth Carbon
├── deportex02.html             # Variante Ads 2 : Electric Cyan & Tech Obsidian
├── deportex03.html             # Variante Ads 3 : Cyber Neon Lime & Deep Onyx
├── deportex04.html             # Variante Ads 4 : Turbo Blaze Orange & Slate Black
├── google_sheet_script.js      # Script Google Apps Script pour ingestion des leads
├── logo deportex.jpg           # Logo officiel haute fidélité
├── api_documentation_en_v2_3.pdf # Documentation API logistique NOEST Delivery
├── docs/
│   ├── PRD.md                  # Cahier des charges produit complet (US-1 à US-12)
│   ├── PLAN.md                 # Découpage architectural en phases tracer bullets
│   ├── GOOGLE_SHEETS_SETUP.md  # Guide de configuration Google Apps Script & Webhook
│   └── SESSION_SUMMARY.md      # Le présent document de synthèse et d'historique
├── Assets/                     # Pack de photos produit HD (angles, coloris, accessoires)
├── temoignage/                 # Preuves sociales réelles (captures avis et retours clients)
└── SSH KEY/                    # Clés d'accès et certificats d'administration VPS
```

---

## 3. Dispositif de Tracking Meta Ads (Pixel & CAPI)

Afin de maximiser la délivrabilité des données et d'optimiser l'algorithme Meta face aux bloqueurs de pub et restrictions iOS :

* **Pixel Meta ID :** `1422859033068055`
* **Architecture Hybride :**
  1. **Côté Client (Navigateur) :** `fbq('track', ...)` avec correspondance avancée manuelle (`country: 'dz'`).
  2. **Côté Serveur (Conversions API - CAPI) :** Requêtes `POST /api/boostili/capi-event` relayées par conteneur serveur.
* **Déduplication stricte :** Émission systématique d'un `eventId` unique partagé entre l'événement navigateur et l'événement serveur (ex: `pv_<timestamp>_<random>`, `lead_<timestamp>_<random>`, `pur_<timestamp>_<random>`).
* **Advanced Matching dynamique :** Hachage et transmission du numéro de téléphone (`ph`) et des données de localisation lors de la saisie utilisateur.

---

## 4. Chronologie Complète des Sessions de Développement

### Session 1 : Cadrage Produit & Première Implémentation
* **Date :** 9 septembre 2026 (16h19 – 20h35)
* **ID Antigravity :** `264f62ed-b5c6-4b21-9428-c3579b461091`
* **Méthodologie & Compétences :** `/interroge`, `/cadre`, `/planifie`
* **Réalisations :**
  1. Interview approfondie pour formaliser le problème cible, la solution, le persona et le modèle économique COD.
  2. Rédaction du document de spécification [`docs/PRD.md`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/docs/PRD.md) avec 12 User Stories et critères de validation.
  3. Élaboration du plan d'exécution technique par tranches verticales [`docs/PLAN.md`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/docs/PLAN.md).
  4. Création de [`index.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/index.html) (10 sections complètes, design dark/sportif, police Cairo, layout RTL).
  5. Développement du connecteur Google Sheets [`google_sheet_script.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/google_sheet_script.js) pour enregistrer automatiquement chaque soumission de commande.
  6. Rédaction du guide de déploiement Google Apps Script [`docs/GOOGLE_SHEETS_SETUP.md`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/docs/GOOGLE_SHEETS_SETUP.md).

---

### Session 2 : Alignement Shopify, Optimisation Mobile & Export Git / Vercel
* **Date :** 10 septembre 2026 (13h51 – 16h58)
* **ID Antigravity :** `5793ba05-b71b-49fb-a9de-dd3452e7cce1`
* **Méthodologie & Compétences :** `/investigue`, `/design`, `/ui-ux-pro-max`, `/branche`, `/livre`
* **Réalisations :**
  1. Recentrage strict sur l'expérience mono-produit sans dispersion d'offres.
  2. Refonte du design pour reproduire fidèlement l'ergonomie d'une boutique Shopify à haut taux de conversion (bannières, typographie, hiérarchie).
  3. Rehaussement stratégique du formulaire de commande : positionné juste sous le hero (« above the fold ») pour permettre au mobinaute algérien de commander immédiatement sans scroller l'intégralité de la page.
  4. Création de la branche Git `feat/shopify-design-fidelity`.
  5. Initialisation du dépôt GitHub distant [`atlasgurzil-web/deporrtex`](https://github.com/atlasgurzil-web/deporrtex.git) et push des versions de code.
  6. Déploiement et tests de performance sur Vercel (`https://deporrtex.vercel.app/`).

---

### Session 3 : 4 Variantes Landing Pages, VPS & Intégration Meta Tracking
* **Date :** 10 septembre 2026 (18h08 – 21h16)
* **ID Antigravity :** `dd2bd1db-da57-4fe2-ac95-113947deda3e`
* **Méthodologie & Compétences :** `/grill-me`, architecture VPS, tracking Meta CAPI
* **Réalisations :**
  1. Stress-test du plan de déploiement publicitaire via `/grill-me`.
  2. Création de 4 variantes indépendantes pour l'A/B testing des campagnes Meta Ads :
     * [`deportex01.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex01.html) : Thème Crimson Red & Stealth Carbon
     * [`deportex02.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex02.html) : Thème Electric Cyan & Tech Obsidian
     * [`deportex03.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex03.html) : Thème Cyber Neon Lime & Deep Onyx
     * [`deportex04.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex04.html) : Thème Turbo Blaze Orange & Slate Black
  3. Intégration du logo officiel [`logo deportex.jpg`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/logo%20deportex.jpg).
  4. Déploiement sur le serveur VPS sous domaine `maktabi.space` (orchestré par Traefik et conteneur Autonnel).
  5. Implémentation du moteur de tracking Meta hybride (Pixel `1422859033068055` + CAPI avec déduplication et `eventID`).
  6. Correction de la navigation : suppression des boutons flottants encombrants et fluidification du sélecteur des wilayas/communes.

---

### Session 4 : Audit & Diagnostic Tracking Ads (Événement Purchase CAPI)
* **Date :** 12 septembre 2026 (18h01 – 19h16)
* **ID Antigravity :** `dd2bd1db-da57-4fe2-ac95-113947deda3e` (suite)
* **Sujet & Diagnostic :**
  * Constat après premières diffusions publicitaires sur `maktabi.space/deportex03` : les commandes arrivaient bien dans l'interface logistique Noest, mais l'événement d'optimisation publicitaire `Purchase` ne remontait pas convenablement dans Meta Events Manager via CAPI.
  * Analyse des signaux réseau et plan de fiabilisation du pipeline serveur CAPI.

---

### Session 5 : Cadrage d'Automatisation Éditoriale (Projet Médical)
* **Date :** 24 septembre 2026 (21h12)
* **ID Antigravity :** `6738f0b0-312a-4109-82ee-2cd445af0387`
* **Méthodologie :** `/interroge` (Mode interview de conception)
* **Sujet :** Conception d'un système d'automatisation éditoriale IA haute crédibilité pour la page Facebook d'un cabinet de gynécologie (priorité Qualité > Quantité > Fréquence, ton sobre et médical, zéro contenu générique IA).

---

### Session 6 : Audit Global & Reconstitution de l'Historique
* **Date :** 24 septembre 2026 (22h56 – 23h15)
* **ID Antigravity :** `1792dd4f-5925-4325-a72d-9be5b5ea786d`
* **Objectif :** Analyse complète du projet Deporrtex, recherche et reconstitution chronologique de toutes les sessions de travail antérieures dans la mémoire Antigravity.

---

### Session 7 : Consolidation & Génération du Rapport Markdown
* **Date :** 24 septembre 2026 (23h25)
* **ID Antigravity :** `95e4e9ec-34c7-432b-9c46-c42a113cc052` (Session active)
* **Objectif :** Formalisation de l'ensemble des connaissances, architectures et historiques dans un document Markdown dédié et pérenne.

---

## 5. État des Lieux Actuel & Actions Recommandées

### État du Dépôt Git
- Branche actuelle : `feat/shopify-design-fidelity`.
- Fichiers non suivis (untracked) prêts à être commités : les 4 landing pages [`deportex01.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex01.html) à [`04.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex04.html), le logo, la documentation logistique et les clés.
- Anciennes images supprimées en local dans l'arborescence racine à synchroniser (`git add -u` ou nettoyage propre).

### Prochaines Étapes Recommandées
1. **Validation du Tracking CAPI Meta :** Effectuer une commande de test en mode Test Events sur Meta Events Manager pour vérifier la bonne réception simultanée du Pixel et du CAPI avec le score de qualité de correspondance (> 7/10).
2. **A/B Testing des Variantes :** Comparer les performances d'engagement et de coût par acquisition (CPA) entre les 4 variantes de landing pages sur les audiences sportives Meta en Algérie.
3. **Commit & Push de Clôture :** Réaliser un commit propre intégrant les 4 landing pages, les documentations et ce fichier récapitulatif pour figer l'état stable du projet.
