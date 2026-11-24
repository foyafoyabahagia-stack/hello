/** Serves the app's page. Written by CodeStudio for a page imported without its server code. */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('WA-Nexus AI v2 — Multi-Account Customer Service Dashboard')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .addMetaTag('mobile-web-app-capable', 'yes')
    .addMetaTag('apple-mobile-web-app-capable', 'yes')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ===== CodeStudio: backup harian — dibuat otomatis, jangan diubah ===== */
/**
 * Backup harian: setiap malam semua sheet disalin ke spreadsheet "<nama> — Backup",
 * satu salinan per hari (Senin…Minggu), jadi 7 hari terakhir selalu tersimpan.
 * Aktifkan sekali: pilih aktifkanBackupHarian di editor Apps Script, lalu Jalankan.
 */
function csHanyaPemilik_() {
  var me = Session.getActiveUser().getEmail();
  if (!me || me !== Session.getEffectiveUser().getEmail()) {
    throw new Error('Hanya pemilik skrip yang boleh menjalankan backup.');
  }
}

function backupSekarang() {
  csHanyaPemilik_();
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID');
  var source = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  if (!source) throw new Error('Spreadsheet aplikasi belum ada. Jalankan setupDatabase dulu.');
  var backup = null;
  var backupId = props.getProperty('CS_BACKUP_ID');
  if (backupId) {
    try { backup = SpreadsheetApp.openById(backupId); } catch (e) { backup = null; }
  }
  var created = false;
  if (!backup) {
    backup = SpreadsheetApp.create(source.getName() + ' — Backup');
    props.setProperty('CS_BACKUP_ID', backup.getId());
    created = true;
  }
  var blank = created ? backup.getSheets()[0] : null;
  var day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][new Date().getDay()];
  source.getSheets().forEach(function (sheet) {
    var name = (sheet.getName() + ' · ' + day).slice(0, 99);
    var old = backup.getSheetByName(name);
    var copy = sheet.copyTo(backup);
    if (old) backup.deleteSheet(old);
    copy.setName(name);
  });
  if (blank && backup.getSheets().length > 1) backup.deleteSheet(blank);
  return { ok: true, url: backup.getUrl(), day: day };
}

function aktifkanBackupHarian() {
  csHanyaPemilik_();
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'backupSekarang') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('backupSekarang').timeBased().everyDays(1).atHour(1).create();
  return backupSekarang();
}
/* ===== /CodeStudio backup ===== */

/* ---- Added by CodeStudio: the app's own address -----------------------------
 * For a QR code or a link to share: the /exec address on Google (the page's
 * own address there is a sandbox that opens blank). The page calls
 * google.script.run.withSuccessHandler(function (url) { ... }).csAppUrl().
 */
function csAppUrl() {
  try { return ScriptApp.getService().getUrl() || ''; } catch (e) { return ''; }
}
