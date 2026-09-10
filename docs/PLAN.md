# Plan : Landing Page Deporrtex — Lunettes de Sport

> PRD source : `docs/PRD.md`

## Décisions architecturales

Décisions durables qui s'appliquent à toutes les phases :

- **Structure** : Fichier HTML unique autonome avec CSS et JS intégrés (inline) — aucune dépendance externe sauf Google Fonts
- **Direction** : RTL (right-to-left) pour l'arabe, attribut `dir="rtl"` et `lang="ar"`
- **Design system** : Fond noir (#0a0a0a), accent rouge (#e63946), texte blanc (#ffffff), secondaire gris (#b0b0b0), police Cairo (Google Fonts)
- **Responsive** : Mobile-first, breakpoints à 768px (tablette) et 1024px (desktop)
- **Images** : Référencées en chemins relatifs depuis le même dossier, dossier `temoignage/` pour les témoignages
- **Formulaire** : Soumission via fetch() vers un endpoint Google Apps Script, données envoyées en JSON
- **Wilayas** : Liste des 58 wilayas algériennes codée en dur dans un `<select>`, triée par numéro

---

## Phase 1 : Page complète avec toutes les sections visuelles

**User stories** : US-1, US-2, US-3, US-4, US-5, US-6, US-12

### Ce qu'on livre

La page HTML complète ouvrable dans le navigateur, avec toutes les sections de contenu visibles et stylées, de bout en bout :

1. **Header fixe** avec logo Deporrtex et bouton CTA "اطلب الآن"
2. **Hero section** avec accroche, sous-titre, badges de réassurance (livraison rapide, COD, qualité) et image produit
3. **Section Pain Points** : "تعبت من النظارات التقليدية؟" + 3 problèmes avec icônes ❌
4. **Section Solution** : "حل مثالي للرؤية أثناء الرياضة" + proposition de valeur
5. **Section Features** : 3 caractéristiques annotées (sangle, cadre, verres) avec image produit
6. **Galerie produit** : grille de photos réelles des 2 coloris
7. **Section Témoignages** : les 4 screenshots (commentaires Facebook + conversations) en grille
8. **Section Prix** : prix barré 4 200 DA → 2 900 DA avec badge -31%
9. **Section Garanties** : livraison 58 wilayas, COD, qualité
10. **Footer** : contact, liens Facebook + Instagram, copyright Deporrtex

Le tout en design sombre/sportif, RTL, responsive mobile-first, avec animations fade-in au scroll.

### Critères d'acceptation

- [x] La page s'ouvre dans le navigateur et affiche toutes les 10 sections dans l'ordre
- [x] Le texte arabe est correctement aligné à droite (RTL)
- [x] Les images du dossier (produit + témoignages) s'affichent
- [x] Le design est sombre (fond noir, accent rouge, texte blanc)
- [x] La page est responsive : pas de scroll horizontal sur 360px
- [x] Le header reste fixe en haut au scroll
- [x] Les animations fade-in fonctionnent au scroll
- [x] Les liens Facebook et Instagram sont corrects

### Bloquée par

*Aucune — terminée*

---

## Phase 2 : Formulaire de commande fonctionnel

**User stories** : US-7, US-8, US-9

### Ce qu'on livre

Le formulaire de commande complet intégré dans la section prix, fonctionnel côté front-end :

- Sélecteur de coloris visuel (vignettes cliquables Noir/Rouge et Transparent avec images)
- Champs : nom complet, téléphone, wilaya (liste déroulante 58 wilayas), adresse, quantité
- Validation front-end (champs requis, format téléphone algérien)
- Message de confirmation visuel après soumission réussie (remplace le formulaire)
- Le formulaire envoie les données en JSON (prêt pour branchement Google Sheets)

### Critères d'acceptation

- [x] Le sélecteur de coloris fonctionne (clic → sélection visuelle)
- [x] La liste déroulante affiche les 58 wilayas triées par numéro
- [x] Le formulaire refuse la soumission si un champ obligatoire est vide
- [x] Le formulaire refuse un numéro de téléphone qui ne commence pas par 0 ou qui n'a pas 10 chiffres
- [x] Après soumission, un message de confirmation s'affiche à la place du formulaire
- [x] Le formulaire est responsive et utilisable sur mobile 360px

### Bloquée par

- Phase 1 (terminée)

---

## Phase 3 : Intégration Google Sheets + WhatsApp flottant

**User stories** : US-10, US-11

### Ce qu'on livre

Le branchement réel du formulaire vers Google Sheets et le bouton WhatsApp :

- Script Google Apps Script qui crée un endpoint web recevant les données du formulaire
- Le formulaire envoie vers cet endpoint, chaque commande crée une ligne dans le Google Sheet (date, nom, téléphone, wilaya, adresse, coloris, quantité)
- Bouton WhatsApp flottant en bas à droite, visible en permanence, ouvre une conversation vers 0673547329
- Instructions pas-à-pas fournies pour la configuration Google Sheets

### Critères d'acceptation

- [x] Chaque soumission du formulaire crée une nouvelle ligne dans le Google Sheet avec toutes les données (via google_sheet_script.js + fallback local)
- [x] Le bouton WhatsApp est visible sur toutes les tailles d'écran
- [x] Le bouton WhatsApp ouvre la bonne conversation (numéro 0673547329)
- [x] Le bouton WhatsApp a une animation pulse pour attirer l'attention
- [x] Les instructions de configuration Google Sheets sont claires et testées dans docs/GOOGLE_SHEETS_SETUP.md

### Bloquée par

- Phase 2 (terminée)
