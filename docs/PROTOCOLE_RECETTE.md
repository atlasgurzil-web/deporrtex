# 📋 Protocole de Recette & Test Officiel — DEPORTEX (نظارات رياضية طبية)

> **Date :** 26 Septembre 2026  
> **Participants :** Fondateur / Boss Deporrtex & Responsable Technique  
> **Site en Production :** [https://deporrtex.vercel.app/](https://deporrtex.vercel.app/)  
> **API Partenaires :** NOEST Delivery (Algérie 58 Wilayas) & Meta Conversions API (Graph v21.0)

---

## 🎯 Objectif du Protocole
Valider à 100 % le bon fonctionnement de la landing page et de la chaîne de commande de Deporrtex avant l'activation des campagnes publicitaires à fort trafic (Meta Ads Facebook / Instagram).

---

## 🧭 PHASE 1 : Expérience Visuelle & Ergonomie Mobile (Ce que voit l'acheteur)

| # | Point de Contrôle | Action à Réaliser | Résultat Attendu | Statut |
|---|---|---|---|:---:|
| **1.1** | **Affichage Mobile First** | Ouvrir [https://deporrtex.vercel.app/](https://deporrtex.vercel.app/) sur le smartphone du boss (navigateur Chrome ou Safari). | Chargement immédiat (< 2s), aucun décalage horizontal, typographie arabe (Cairo) nette et lisible en RTL. | [ ] |
| **1.2** | **Accroche & Clarté du Produit** | Regarder l'en-tête et la première section. | La proposition de valeur est comprise en 5 secondes : lunettes de sport incassables avec branches interchangeables et sangle élastique. | [ ] |
| **1.3** | **Photos & Coloris HD** | Faire défiler la galerie de photos et le visuel comparatif. | Les 2 coloris (**أسود وأحمر** / Noir-Rouge et **شفاف** / Transparent) sont visibles sous tous les angles avec les détails techniques (TR90, ventilation anti-buée). | [ ] |
| **1.4** | **Transparence du Prix** | Vérifier l'affichage du prix promotionnel. | Prix barré **4 200 د.ج** → Nouveau prix promo **2 900 د.ج** avec badge remise visible. | [ ] |
| **1.5** | **Preuves Sociales (Témoignages DZ)** | Vérifier la section des avis clients réels. | Screenshots de messages et commentaires Facebook/Instagram bien lisibles, rassurants pour le client algérien. | [ ] |
| **1.6** | **Bouton WhatsApp Flottant** | Cliquer sur l'icône verte WhatsApp en bas à droite de l'écran. | Ouvre WhatsApp avec une discussion dirigée vers le **0673547329** et un message pré-rempli en arabe. | [ ] |

---

## ⚙️ PHASE 2 : Dynamique du Formulaire de Commande (Sécurité & Calculs)

| # | Point de Contrôle | Action à Réaliser | Résultat Attendu | Statut |
|---|---|---|---|:---:|
| **2.1** | **Sélection du Coloris** | Cliquer alternativement sur "Noir et Rouge" puis "Transparent". | La carte sélectionnée s'active avec une bordure nette et une coche de validation visible. | [ ] |
| **2.2** | **Sélecteur de Quantité** | Tester les boutons `+` et `−`. | La quantité s'ajuste (1, 2, 3...) et le sous-total s'actualise instantanément (2 900 DA par pièce). | [ ] |
| **2.3** | **Validation Anti-Erreur (Nom)** | Laisser le nom vide et tenter de valider. | Le formulaire bloque et affiche un message d'alerte en rouge : *"الرجاء إدخال الاسم"*. | [ ] |
| **2.4** | **Validation Anti-Erreur (Téléphone DZ)** | Saisir un faux numéro (ex: `12345` ou `051234`). | Le formulaire bloque. Il n'accepte qu'un numéro algérien valide à 10 chiffres commençant par 0 (05, 06, 07). | [ ] |
| **2.5** | **Test Wilaya & Tarifs Dynamiques** | Sélectionner une wilaya (ex: **16 - Alger**, puis **31 - Oran**, puis **47 - Ghardaïa**). | Le frais de livraison s'actualise automatiquement en temps réel pour le domicile et le bureau stop-desk. | [ ] |
| **2.6** | **Cascade des Communes (Domicile)** | En mode "توصيل لباب المنزل", choisir une wilaya. | La liste déroulante des baladiyats se déverrouille et affiche toutes les communes officielles de la wilaya via l'API NOEST. | [ ] |
| **2.7** | **Option Stop-Desk (Bureau NOEST)** | Cocher "استلام من مكتب التوصيل". | Le champ commune se remplace par la liste des bureaux NOEST disponibles, avec l'adresse physique complète et les horaires affichés. | [ ] |
| **2.8** | **Récapitulatif Financier** | Vérifier le bloc de synthèse avant validation. | Calcul exact : `(Prix Produit × Quantité) + Frais de Livraison = Total à Payer (د.ج)`. | [ ] |

---

## 🚀 PHASE 3 : Test de Commande Réelle End-to-End (Le nerf de la guerre)

> **Objectif :** Valider toute la chaîne : de la soumission sur le site jusqu'à l'apparition du colis dans l'espace NOEST du boss.

### Étapes du test :
1. Remplir le formulaire avec les coordonnées de test :
   - **Nom :** `TEST BOSS DEPORTEX`
   - **Téléphone :** `Le numéro du boss`
   - **Wilaya :** `16 - Alger` (ou la wilaya de votre choix)
   - **Mode :** `توصيل لباب المنزل` (Domicile)
   - **Commune :** `الجزائر الوسطى / Alger Centre`
   - **Adresse :** `Commande Test de Recette - Ne pas expédier`
2. Cliquer sur le bouton de commande : **"تأكيد الطلب الآن"**.

| # | Point de Contrôle | Résultat Attendu | Statut |
|---|---|---|:---:|
| **3.1** | **Feedback Immédiat** | Le bouton affiche un loader *"جاري معالجة طلبك..."* sans blocage ni freeze. | [ ] |
| **3.2** | **Écran de Confirmation** | Affichage d'un modal/écran de succès avec le numéro de référence unique (ex: **DPX-841923**) et instructions d'appel. | [ ] |
| **3.3** | **Transmission NOEST Delivery** | Se connecter sur l'espace marchand NOEST (`https://app.noest-dz.com/`). | [ ] |
| **3.4** | **Vérification du Colis NOEST** | Le colis apparaît immédiatement avec :<br>• Client : *TEST BOSS DEPORTEX*<br>• Numéro : *DPX-XXXXXX*<br>• Montant exact avec livraison<br>• Remarque : couleur et quantité exactes | [ ] |
| **3.5** | **Nettoyage Test** | Annuler/supprimer le colis test en 1 clic dans l'interface NOEST pour éviter tout ramassage par le livreur. | [ ] |

---

## 📊 PHASE 4 : Vérification du Tracking Publicitaire (Meta Ads)

> Assure que chaque dinar investi en pub est bien comptabilisé par l'algorithme Facebook/Instagram.

| # | Point de Contrôle | Outil / Méthode | Résultat Attendu | Statut |
|---|---|---|---|:---:|
| **4.1** | **Meta Pixel (Navigateur)** | Extension Chrome *Meta Pixel Helper* | Détecte le Pixel ID `1422859033068055` avec l'événement `PageView` vert. | [ ] |
| **4.2** | **Événement Achat (Purchase)** | Déclenché à la soumission du formulaire | Le Pixel Helper affiche l'événement `Purchase` avec valeur monétaire (DZD) et nom du produit. | [ ] |
| **4.3** | **Meta CAPI (Serveur Graph v21.0)** | Meta Events Manager (Événements récents) | L'événement `Purchase` arrive aussi par le serveur (Serverless Vercel) avec le même `eventId` (déduplication 100% propre, aucune double dépense). | [ ] |

---

## 🎨 PHASE 5 : Test des 4 Variantes A/B Testing

Vérifier que chacune des pages d'atterrissage dédiées aux campagnes publicitaires est opérationnelle :

1. **Variante 01 (Crimson Red - Design Standard) :** [https://deporrtex.vercel.app/deportex01](https://deporrtex.vercel.app/deportex01)
2. **Variante 02 (Electric Cyan - Style High-Tech) :** [https://deporrtex.vercel.app/deportex02](https://deporrtex.vercel.app/deportex02)
3. **Variante 03 (Cyber Neon Lime - Style Sport Intense) :** [https://deporrtex.vercel.app/deportex03](https://deporrtex.vercel.app/deportex03)
4. **Variante 04 (Turbo Blaze Orange - Style Dynamique) :** [https://deporrtex.vercel.app/deportex04](https://deporrtex.vercel.app/deportex04)

*Critère : Chaque variante doit avoir son identité visuelle distincte, avec le même formulaire connecté à l'API NOEST.*

---

## ✍️ Fiche de Validation Finale

- **Statut Global :** `[  ] APPROUVÉ POUR DIFFUSION ADS` / `[  ] AJUSTEMENTS REQUIS`
- **Observations du Boss :** _________________________________________________
- **Signature / Accord :** ____________________________________________________
