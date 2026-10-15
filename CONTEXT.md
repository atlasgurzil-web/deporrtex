# 📌 DEPORRTEX — CONTEXT & FICHE TECHNIQUE DU PROJET

> **Dernière mise à jour :** 15 Octobre 2026  
> **Branche de production officielle :** `main`  
> **Site en ligne Vercel :** [https://deporrtex.vercel.app/](https://deporrtex.vercel.app/)  
> **Dépôt GitHub :** [https://github.com/atlasgurzil-web/deporrtex.git](https://github.com/atlasgurzil-web/deporrtex.git)  

---

## 🎯 1. Résumé Exécutif & Mission
**Deporrtex** est une marque algérienne d'e-commerce spécialisée dans les **lunettes de sport médicales de protection 2 en 1** (branches interchangeables avec sangle élastique, adaptées pour le football, basket, running et sports de contact).
* **Business Model :** Cash on Delivery (COD) / الدفع عند الاستلام en Algérie sur les 58 Wilayas.
* **Prix Produit :** 2 900 DZD (Prix promo barré à 4 200 DZD).
* **Partenaire Livraison :** **NOEST Delivery** (Livraison à Domicile et en Bureau Stop-Desk).

---

## 🏗️ 2. Architecture & Arborescence Propre du Projet

Après le grand nettoyage de mi-octobre 2026 (-8 500 lignes de code mort et clones éliminés), le projet est structuré comme suit :

```text
rami site/
├── CONTEXT.md                  # Ce fichier : référence absolue pour l'IA et l'équipe
├── index.html                  # L'UNIQUE landing page officielle de vente (2 104 lignes)
├── vercel.json                 # Configuration Vercel : rewrites d'API et cache images
├── .gitignore                  # Exclusion des fichiers temporaires
├── dev_server.js               # Petit serveur Node.js local de test (facultatif)
├── api_documentation_en_v2_3.pdf # Documentation officielle de l'API NOEST
├── api/                        # Fonctions Serverless Vercel (Node.js)
│   ├── capi-event.js           # Dispatch d'événements Meta CAPI serveur (PageView, etc.)
│   ├── order.js                # Prise de commande : NOEST + CAPI Meta + Pixel TikTok
│   └── noest/
│       ├── communes.js         # API cascade dynamique des baladiyats par wilaya
│       └── data.js             # API tarifs livraison et bureaux Stop-Desk (58 wilayas)
├── docs/                       # Rapports d'audit et protocoles de recette
│   ├── audit_pixel_report.json # Audit 64/64 tests des pixels
│   ├── audit_report.json       # Audit de performance et structure
│   ├── PLAN.md                 # Cahier des charges historique
│   ├── PRD.md                  # PRD d'origine
│   ├── PROTOCOLE_RECETTE.md    # Guide de recette pour tester une commande réelle
│   ├── RAPPORT_AUDIT_PIXELS.md # Rapport complet pixels Meta & TikTok
│   └── SESSION_SUMMARY.md      # Synthèse technique historique
└── images/
    └── deportex/               # Seul et unique dossier d'images servi en production
        ├── logo_deportex.png   # Logo officiel Deporrtex
        ├── shopify_*.jpg       # 4 bannières éditoriales d'origine
        ├── photo_*.jpg         # Photos du produit sous tous les angles
        └── 7982...jpg          # Témoignages et avis clients réels (social proof DZ)
```

---

## 📊 3. Écosystème Tracking, Pixels & Analytics (CRITIQUE)

Le tracking est harmonisé et audité pour assurer un suivi publicitaire optimal sans déperdition :

### A. Umami Analytics (Statistiques Trafic Légères & RGPD)
* **Script actif dans le `<head>` de `index.html` :**
  ```html
  <script defer src="https://cloud.umami.is/script.js" data-website-id="a2a6fbff-594e-433f-9c9a-7b8153414952"></script>
  ```
* **Statut :** En ligne sur `https://deporrtex.vercel.app/`.

### B. Meta Pixel & Conversions API (CAPI Server-Side)
* **Pixel ID :** `1422859033068055`
* **Token CAPI :** Graph API v21.0 actif dans `api/order.js` et `api/capi-event.js`.
* **Événements tracés :**
  * `PageView` (Client + Serveur CAPI dédupliqué via `pvId`)
  * `ViewContent` (2 900 DZD, catégorie `Glasses`)
  * `InitiateCheckout` (Dès la première interaction avec le formulaire)
  * `Purchase` (Client + Serveur CAPI dédupliqué via `purchaseEventId`)
* **Advanced Matching :** Hashing SHA-256 du numéro normalisé (+213), nom, prénom, commune et pays `dz`.

### C. TikTok Pixel
* **Pixel ID :** `DARV2UBC77U88MSO7R6G`
* **Événements tracés :** `page()`, `ViewContent`, `InitiateCheckout`, `PlaceAnOrder`, `CompletePayment`.
* **Advanced Matching :** Téléphone normalisé, nom complet, ville, pays `DZ`.

---

## 🚚 4. Logistique & Intégration NOEST Delivery

* **Authentification API :**
  * Token API : `JlLZKsPRF6eClTd4v2NaDfS60JZLbgxtWfd`
  * User GUID : `UHGCDOGE`
  * API Base : `https://app.noest-dz.com/api/public/`
* **Fonctionnement du Formulaire :**
  1. Le client choisit sa wilaya (1 à 58).
  2. Le site interroge `/api/boostili/noest/data` pour obtenir le tarif exact.
  3. Si mode **Domicile** : `/api/boostili/noest/communes?wilaya=XX` charge dynamiquement les communes officielles.
  4. Si mode **Stop-Desk** : Le site affiche la liste des agences NOEST avec adresse et horaires.
  5. À la validation, `/api/boostili/order` envoie le colis directement sur l'espace NOEST du client avec la référence `DPX-XXXXXX`.

---

## 🛑 5. RÈGLES STRICTES POUR LES FUTURES SESSIONS IA (À LIRE ABSOLUMENT)

Toute IA intervenant sur ce projet **DOIT STRICTEMENT RESPECTER** les règles suivantes :

1. **NE JAMAIS IMPOSER DE REFONTE GRAPHIQUE (NO AI SLOP / NO HALLMARK) :**
   * L'utilisateur valide expressément le design original d'`index.html` (style Shopify éprouvé, direct et vendeur).
   * Interdiction absolue de remplacer ce design par des maquettes génériques d'IA.
2. **SEULE LA BRANCHE `main` COMPTE :**
   * Les branches de test parasites ont été supprimées.
   * Tout changement doit être validé ou travaillé sur une branche propre préfixée `feat/` ou `fix/`, et validé avant fusion sur `main`.
3. **NE JAMAIS CASSER LA CHAÎNE DE COMMANDE NOEST NI LES PIXELS :**
   * Ne jamais modifier les sélecteurs `#custName`, `#custPhone`, `#custWilaya`, `#custCommune`, `#btnConfirmOrder`.
   * Ne jamais altérer les identifiants de pixel Meta (`1422859033068055`) ou TikTok (`DARV2UBC77U88MSO7R6G`).
4. **VÉRIFICATION GIT OBLIGATOIRE AVANT PUSH :**
   * Toujours exécuter `git diff` pour confirmer que seules les lignes demandées sont modifiées avant tout `git push`.
