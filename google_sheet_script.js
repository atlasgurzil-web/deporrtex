/**
 * ===================================================================
 * DEPORRTEX — SCRIPT GOOGLE APPS SCRIPT POUR CAPTURE DES COMMANDES
 * ===================================================================
 * 
 * Ce script permet de recevoir automatiquement les commandes passées
 * sur votre landing page et de les enregistrer dans un Google Sheet.
 *
 * Suivez les instructions dans docs/GOOGLE_SHEETS_SETUP.md pour l'installer.
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Si la feuille est vide, créer les en-têtes avec style
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "التاريخ والوقت", 
        "الاسم الكامل", 
        "رقم الهاتف", 
        "الولاية", 
        "العنوان (البلدية/الحي)", 
        "اللون", 
        "الكمية", 
        "السعر الإجمالي (د.ج)", 
        "حالة الطلب"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1a1a1a");
      headerRange.setFontColor("#ffffff");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    
    // Parser les données JSON reçues
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    var unitPrice = 2900;
    var qty = parseInt(data.quantity) || 1;
    var totalPrice = qty * unitPrice;
    
    // Ajouter la ligne de commande
    sheet.appendRow([
      data.date || Utilities.formatDate(new Date(), "Africa/Algiers", "yyyy-MM-dd HH:mm:ss"),
      data.name,
      "'" + data.phone, // Le préfixe ' force le format texte pour garder le 0 initial
      data.wilaya,
      data.address,
      data.color,
      qty,
      totalPrice + " DA",
      "جديد (قيد التأكيد)"
    ]);
    
    // Formater la dernière ligne
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 9).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 9).setBackground("#fff3cd").setFontColor("#856404"); // Badge jaune "جديد"
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "row": lastRow }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("✅ خادم طلبات Deporrtex يعمل بنجاح! السيرفر نشط.")
    .setMimeType(ContentService.MimeType.TEXT);
}
