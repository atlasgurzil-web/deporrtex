# Guide Opérationnel & Résumé des Sessions — Projet Deporrtex

> **Dernière mise à jour :** 25 septembre 2026  
> **Workspace :** `rami site`  
> **Dépôt GitHub :** [`https://github.com/atlasgurzil-web/deporrtex.git`](https://github.com/atlasgurzil-web/deporrtex.git)  
> **Site en Production (Vercel) :** [https://deporrtex.vercel.app/](https://deporrtex.vercel.app/)  
> **Branches actives :** `main` (Production Vercel) & `feat/shopify-design-fidelity`  

---

## 📑 Sommaire
1. [Coffre-fort des Identifiants, Tokens & APIs](#1-coffre-fort-des-identifiants-tokens--apis)
2. [Architecture Vercel Serverless & Tracking](#2-architecture-vercel-serverless--tracking)
3. [Guide Pas-à-Pas des Modifications Futures (How-To)](#3-guide-pas-à-pas-des-modifications-futures-how-to)
4. [Cartographie des Fichiers du Projet](#4-cartographie-des-fichiers-du-projet)
5. [Historique Complet des Sessions de Développement](#5-historique-complet-des-sessions-de-développement)

---

## 1. Coffre-fort des Identifiants, Tokens & APIs

Ce tableau regroupe l'intégralité des clés, jetons et points d'accès utilisés par l'écosystème Deporrtex :

### 🎯 Meta Ads (Pixel & Conversions API - CAPI)

| Paramètre | Valeur Configurée | Emplacement dans le code |
| :--- | :--- | :--- |
| **Pixel Meta ID** | `1422859033068055` | `index.html`, `deportex01.html` à `04.html`, `api/order.js`, `api/capi-event.js` |
| **Meta Access Token (CAPI)** | `EAANMcvfs0pMBSdirhWIvrsGm4vGYw0eCsRRrlKMEswd4ccPxYNKtAcUxyHbZBAwJdJJhLIWP5c4HMEGmV7Im3ZADcNiLUlFfRGhhRLNr6FsoAtRFXNjZCDs5ZAOTV0BwG2SMZCnZBzlZATuJaSEXTZCmqMQDZBFrwN6r4CFEGp32kOa2rlSSQ6GHWukZCchx07uwZDZD` | `api/order.js`, `api/capi-event.js` |
| **Version API Graph Meta** | `v21.0` | `api/order.js`, `api/capi-event.js` |
| **Endpoint CAPI Graph** | `https://graph.facebook.com/v21.0/1422859033068055/events` | Appelé côté serveur à chaque vente |
| **Événements Trackés** | • `PageView` (Chargement page)<br>• `Purchase` (Validation commande) | Navigateur (Pixel) + Serveur (CAPI dédupliqué via `eventId`) |
| **Pays & Devise** | `country: 'dz'`, `currency: 'DZD'` | Format monétaire dinar algérien |

---

### 🚚 Société de Livraison : NOEST Delivery (Nord & Ouest - Algérie)

| Paramètre | Valeur Configurée | Utilisation |
| :--- | :--- | :--- |
| **Base URL NOEST** | `https://app.noest-dz.com/api/public/` | Base de l'API REST NOEST |
| **Token d'Autorisation** | `Bearer JlLZKsPRF6eClTd4v2NaDfS60JZLbgxtWfd` | `api/noest/data.js`, `api/noest/communes.js`, `api/order.js` |
| **User GUID** | `UHGCDOGE` | Identifiant marchand NOEST pour la création de commande |
| **Tarifs (58 wilayas)** | `GET https://app.noest-dz.com/api/public/fees` | Relayé via `/api/noest/data` (en cache 1 heure) |
| **Bureaux Stop-Desk** | `GET https://app.noest-dz.com/api/public/desks` | Relayé via `/api/noest/data` (adresses des centres de retrait) |
| **Communes par Wilaya** | `GET https://app.noest-dz.com/api/public/get/communes/{wilayaId}` | Relayé via `/api/noest/communes?wilaya=XX` |
| **Création de Colis** | `POST https://app.noest-dz.com/api/public/create/order` | Déclenché à chaque soumission valide sur le site |
| **PDF Documentation** | [`api_documentation_en_v2_3.pdf`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api_documentation_en_v2_3.pdf) | Guide officiel des statuts et endpoints NOEST v2.3 |

#### Exemple de Payload transmis à NOEST :
```json
{
  "user_guid": "UHGCDOGE",
  "reference": "DPX-841923",
  "client": "Karim Benali",
  "phone": "0550123456",
  "adresse": "Centre-ville ou adresse complète",
  "wilaya_id": 16,
  "commune": "Alger Centre",
  "montant": 3200,
  "remarque": "Couleur: أسود وأحمر | Qte: 1",
  "produit": "نظارات رياضية طبية Deporrtex",
  "type_id": 1,
  "stop_desk": 0,
  "station_code": ""
}
```

---

### ☁️ Hébergement & Déploiement Vercel

| Paramètre | Détail |
| :--- | :--- |
| **URL Production** | **`https://deporrtex.vercel.app/`** |
| **Variantes A/B Testing** | • `https://deporrtex.vercel.app/deportex01` (Rouge Crimson)<br>• `https://deporrtex.vercel.app/deportex02` (Bleu Cyan)<br>• `https://deporrtex.vercel.app/deportex03` (Vert Neon)<br>• `https://deporrtex.vercel.app/deportex04` (Orange Blaze) |
| **Configuration Vercel** | [`vercel.json`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/vercel.json) (active `cleanUrls: true`, met en cache les images CDN et redirige `/api/boostili/*` vers `/api/*`) |
| **Déclencheur de build** | Tout `git push origin main` déclenche un déploiement automatique en ~20 secondes sur Vercel |

---

## 2. Architecture Vercel Serverless & Tracking

```
                    ┌──────────────────────────────┐
                    │      Visiteur (Client)       │
                    │  https://deporrtex.vercel.app│
                    └──────────────┬───────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │ (1) Chargement          │ (2) Saisie wilaya       │ (3) Validation Commande
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Pixel Navigateur│      │ GET /api/noest/  │      │ POST /api/order  │
│  fbq('PageView') │      │ communes?wilaya= │      │ (Serverless Fn)  │
└──────────────────┘      └──────────────────┘      └────────┬─────────┘
                                                             │
                                   ┌─────────────────────────┴─────────────────────────┐
                                   ▼                                                   ▼
                        ┌──────────────────────┐                            ┌──────────────────────┐
                        │   NOEST API Delivery │                            │ Meta Conversions API │
                        │  POST /create/order  │                            │  (Graph API v21.0)   │
                        │                      │                            │  eventId dédupliqué  │
                        │ ➔ Retourne Tracking  │                            │  Hachage SHA256 (ph) │
                        └──────────────────────┘                            └──────────────────────┘
```

---

## 3. Guide Pas-à-Pas des Modifications Futures (How-To)

### ❓ A. Comment changer le Pixel Meta ?
1. Ouvrez [`index.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/index.html) et les variantes [`deportex01.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex01.html) à `04.html`.
2. Remplacez la valeur :
   ```javascript
   window.META_PIXEL_ID = "NOUVEAU_PIXEL_ID";
   ```
3. Ouvrez [`api/order.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/order.js) et [`api/capi-event.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/capi-event.js) et mettez à jour la constante :
   ```javascript
   const META_PIXEL_ID = process.env.META_PIXEL_ID || "NOUVEAU_PIXEL_ID";
   ```

### ❓ B. Comment renouveler le Token Meta CAPI ?
1. Rendez-vous sur votre **Meta Events Manager** > Paramètres > Conversions API > *Générer un jeton d'accès*.
2. Ouvrez [`api/order.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/order.js) et [`api/capi-event.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/capi-event.js).
3. Remplacez la valeur de `META_ACCESS_TOKEN`.
4. *Optionnel :* Vous pouvez également renseigner cette variable directement dans le tableau de bord Vercel (*Project Settings > Environment Variables > META_ACCESS_TOKEN*).

### ❓ C. Comment changer le compte ou token NOEST Delivery ?
1. Ouvrez [`api/noest/data.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/noest/data.js), [`api/noest/communes.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/noest/communes.js) et [`api/order.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/order.js).
2. Modifiez le token :
   ```javascript
   const NOEST_TOKEN = process.env.NOEST_TOKEN || "NOUVEAU_TOKEN_BEARER";
   ```
3. Dans [`api/order.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/order.js), modifiez le GUID utilisateur :
   ```javascript
   const NOEST_GUID = process.env.NOEST_GUID || "NOUVEAU_USER_GUID";
   ```

### ❓ D. Comment modifier le prix du produit ?
1. Ouvrez [`index.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/index.html) (vers la ligne 1580) :
   ```javascript
   const UNIT_PRICE = 2900; // Mettre le nouveau prix unitaire en DZD
   ```
2. Modifiez le texte d'affichage du prix dans le HTML (recherchez `2 900` ou `2900`).
3. Dans [`api/order.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/api/order.js), ajustez la valeur de repli si nécessaire.

### ❓ E. Comment ajouter ou remplacer une photo ?
1. Placez votre nouvelle image dans [`images/deportex/`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/images/deportex/) (ex: `nouvelle_photo.jpg`).
2. Dans [`index.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/index.html), référencez-la via :
   ```html
   <img src="/images/deportex/nouvelle_photo.jpg" alt="Description">
   ```

### ❓ F. Comment déployer vos modifications sur Vercel et GitHub ?
Depuis votre terminal ou invite de commande dans le dossier `rami site`, exécutez simplement :
```bash
git add -A
git commit -m "Description de vos modifications"
git push origin main
```
> Vercel détecte le push et met en ligne votre mise à jour en direct en moins de 30 secondes.

---

## 4. Cartographie des Fichiers du Projet

```
rami site/
├── .gitignore                     # Sécurisation des clés privées et fichiers d'environnement
├── vercel.json                    # Routage Serverless, Clean URLs et règles de cache CDN
├── index.html                     # Landing page principale en production (Crimson & Carbon)
├── deportex01.html                # Variante Ads 01 : Crimson Red & Stealth Carbon
├── deportex02.html                # Variante Ads 02 : Electric Cyan & Tech Obsidian
├── deportex03.html                # Variante Ads 03 : Cyber Neon Lime & Deep Onyx
├── deportex04.html                # Variante Ads 04 : Turbo Blaze Orange & Slate Black
├── api/                           # Fonctions Serverless Vercel
│   ├── noest/
│   │   ├── data.js                # API Proxy : Tarifs wilayas & Bureaux Stop-Desk en cache
│   │   └── communes.js            # API Proxy : Communes par Wilaya
│   ├── order.js                   # API Commande : Création colis NOEST + CAPI Purchase
│   └── capi-event.js              # API Proxy : Relais PageView Meta CAPI
├── images/
│   └── deportex/                  # 27 images produits HD, bannières et avis clients
├── Assets/                        # Dossier source des photographies originales
├── temoignage/                    # Preuves sociales et retours clients algériens réels
├── api_documentation_en_v2_3.pdf  # Spécification officielle API NOEST Delivery v2.3
├── google_sheet_script.js         # Connecteur de secours Google Apps Script
├── docs/
│   ├── SESSION_SUMMARY.md         # Ce document complet de synthèse et de référence
│   ├── PRD.md                     # Cahier des charges produit et User Stories
│   ├── PLAN.md                    # Plan d'implémentation
│   └── GOOGLE_SHEETS_SETUP.md     # Configuration optionnelle Google Sheets
└── SSH KEY/                       # Clés SSH d'administration VPS (exclues du Git par .gitignore)
```

---

## 5. Historique Complet des Sessions de Développement

### Session 1 : Cadrage Produit & Spécifications COD (9 sept. 2026)
* Rédaction du PRD ([`docs/PRD.md`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/docs/PRD.md)), modélisation du persona sportif algérien porteur de lunettes et modèle économique COD à 2 900 DZD.
* Écriture du connecteur Google Sheets ([`google_sheet_script.js`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/google_sheet_script.js)).

### Session 2 : Ergonomie Shopify & Rehaussement du Formulaire (10 sept. 2026)
* Optimisation du design mono-produit inspiré de Shopify.
* Rehaussement du formulaire de commande juste sous le hero pour booster la conversion sur smartphone sans scroll inutile.

### Session 3 : Création des 4 Variantes Graphiques (10 sept. 2026)
* Création des 4 identités visuelles pour l'A/B testing Meta Ads ([`deportex01.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex01.html) à [`04.html`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/deportex04.html)).
* Intégration du logo officiel et configuration du Pixel Meta `1422859033068055`.

### Session 4 : Diagnostic CAPI & Pipeline Réseau (12 sept. 2026)
* Analyse des signaux de conversion sur les premières campagnes publicitaires.
* Rétro-ingénierie et envoi rétroactif des événements d'achat réels avec score de correspondance élevé.

### Session 5 à 7 : Consolidation & Archivage (24 sept. 2026)
* Organisation de la mémoire conversationnelle et création de la documentation de synthèse.

### Session 8 : Déploiement Autonome Vercel & Intégration Complète NOEST (25 sept. 2026)
* **Objectif utilisateur :** Avoir une landing page 100 % autonome et fonctionnelle sur Vercel avec Pixel Meta et API NOEST directement connectés sans dépendre d'un serveur VPS tiers.
* **Réalisations :**
  1. Développement de 4 fonctions Serverless Vercel Node.js (`api/noest/data.js`, `api/noest/communes.js`, `api/order.js`, `api/capi-event.js`).
  2. Configuration du fichier de routage et d'en-têtes de cache [`vercel.json`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/vercel.json).
  3. Déploiement de toutes les images statiques sous [`images/deportex/`](file:///c:/Users/TOSHIBA/Desktop/rami%20site/images/deportex/) pour un chargement CDN mondial instantané.
  4. Création de `.gitignore` pour sécuriser strictement les clés privées et certificats VPS (`SSH KEY/`).
  5. Remplacement de `index.html` par la version optimisée et connectée.
  6. Commit `3080f4f` et push synchronisé sur `main` et `feat/shopify-design-fidelity`.
  7. Tests en conditions réelles : validation du retour HTTP 200, test réussi de l'API de communes (57 communes pour Alger), test réussi de l'API de commande avec réponse directe des serveurs NOEST et confirmation de réception par l'API Graph de Meta (`events_received: 1`).
