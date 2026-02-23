/**
 * Google Apps Script to save enquiry form submissions to Google Sheets
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet (or use an existing one)
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code and save
 * 4. Click Deploy > New deployment
 * 5. Select type: Web app
 * 6. Set Execute as: Me
 * 7. Set Who has access: Anyone
 * 8. Click Deploy, then copy the Web App URL
 * 9. In index.html, set SCRIPT_URL (in the script section) to that URL
 */

function doGet(e) {
  return ContentService.createTextOutput('Google Apps Script is working!').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var params = e.parameter;
    var postData = null;

    if (e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (err) {
        postData = {};
        e.postData.contents.split('&').forEach(function(pair) {
          var parts = pair.split('=');
          if (parts[0] && parts[1]) {
            postData[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1].replace(/\+/g, ' '));
          }
        });
      }
    }

    var name = (params && params.name) || (postData && postData.name) || '';
    var number = (params && params.number) || (postData && postData.number) || '';
    var address = (params && params.address) || (postData && postData.address) || '';

    name = String(name).trim();
    number = String(number).trim();
    address = String(address).trim();

    if (!name) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Name is required'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([['Name', 'Number', 'Address', 'Date', 'Time']]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    var timestamp = new Date();
    sheet.appendRow([name, number, address, timestamp.toLocaleDateString(), timestamp.toLocaleTimeString()]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Thank you! We\'ll get back to you soon.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Something went wrong: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
