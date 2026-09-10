# 📊 دليل ربط استمارة الطلبات مع Google Sheets
# Guide de configuration Google Sheets pour Deporrtex

Ce guide vous explique étape par étape comment recevoir automatiquement toutes les commandes de votre site directement dans un tableau Google Sheets sur votre compte Google.

---

## الخطوة 1 : إنشاء جدول Google Sheets جديد
1. افتح متصفحك وادخل إلى [Google Sheets](https://sheets.google.com).
2. أنشئ جدولاً جديداً فارغاً (Blank spreadsheet).
3. سمّ الجدول في الأعلى : **"طلبات Deporrtex"**.

---

## الخطوة 2 : فتح محرر التطبيقات (Apps Script)
1. في القائمة العلوية للجدول، اضغط على **Extensions** (أو **الإضافات** / **Extensions**).
2. اختر **Apps Script**.
3. ستفتح نافذة جديدة بها محرر أكواد.
4. احذف أي كود موجود في الصفحة بالكامل.
5. افتح الملف `google_sheet_script.js` الموجود في مجلد الموقع، وانسخ كل محتواه والصقه داخل المحرر.
6. اضغط على أيقونة الحفظ 💾 (**Save project**).

---

## الخطوة 3 : نشر السكربت كتطبيق ويب (Deploy Web App)
1. في أعلى يمين نافذة Apps Script، اضغط على الزر الأزرق **Deploy** (نشر) ثم اختر **New deployment** (نشر جديد).
2. اضغط على علامة الترس ⚙️ بجانب **Select type** واختر **Web app** (تطبيق ويب).
3. املأ البيانات كالتالي :
   - **Description** : `Deporrtex Orders API`
   - **Execute as** : اختر **Me** (حسابك الشخصي)
   - **Who has access** : ⚠️ **هام جداً** : اختر **Anyone** (الجميع) — لكي تستطيع صفحة الويب إرسال البيانات دون طلب تسجيل الدخول.
4. اضغط على **Deploy** (نشر).
5. سيطلب منك جوجل منح الصلاحيات (**Authorize access**) :
   - اختر حسابك في جوجل.
   - إذا ظهرت رسالة تحذيرية "Google hasn't verified this app"، اضغط على **Advanced** في الأسفل ثم اضغط على **Go to Deporrtex Orders API (unsafe)**.
   - اضغط على **Allow** (سماح).
6. بعد اكتمال النشر، سيظهر لك رابط **Web App URL** ينتهي بـ `/exec`.
7. **انسخ هذا الرابط (Copy)**.

---

## الخطوة 4 : لصق الرابط في صفحة الموقع (`index.html`)
1. افتح الملف `index.html` في محرر النصوص.
2. ابحث عن السطر الذي يحتوي على :
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
```
3. استبدل `'YOUR_GOOGLE_SCRIPT_URL_HERE'` بالرابط الذي نسخته، ليصبح مثل هذا :
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
```
4. احفظ الملف (`Ctrl + S`).

---

## الخطوة 5 : التجربة والتأكد ✅
1. افتح `index.html` في متصفحك.
2. انزل إلى أسفل الصفحة حتى استمارة الطلب.
3. املأ بيانات تجريبية واضغط على **"أكّد طلبك الآن"**.
4. افتح جدول Google Sheets الخاص بك، ستجد سطراً جديداً تم إضافته تلقائياً يحتوي على:
   - التاريخ والوقت
   - الاسم
   - رقم الهاتف
   - الولاية
   - العنوان
   - اللون المختار
   - الكمية
   - السعر الإجمالي (مثال: 2900 DA)
   - حالة الطلب: جديد (قيد التأكيد)

مبروك! الآن كل زبون يطلب من موقعك ستصله بياناته مباشرة إلى هاتفك عبر تطبيق Google Sheets! 🚀
