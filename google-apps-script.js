/**
 * Google Apps Script to save email submissions to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Replace 'YOUR_SHEET_NAME' with your actual sheet name
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Set Execute as: Me
 * 8. Set Who has access: Anyone
 * 9. Click Deploy
 * 10. Copy the Web App URL and use it in index.html
 */

// Test function - you can call this via GET to test
function doGet(e) {
  return ContentService.createTextOutput('Google Apps Script is working!').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    // Log for debugging - check Executions tab in Apps Script
    Logger.log('POST received');
    Logger.log('e.parameter: ' + JSON.stringify(e.parameter));
    Logger.log('e.postData: ' + (e.postData ? e.postData.contents : 'null'));
    
    // Get email from form data (most reliable method)
    let email = null;
    
    // Try parameter first (form data)
    if (e.parameter && e.parameter.email) {
      email = e.parameter.email;
      Logger.log('Got email from parameter: ' + email);
    }
    // Try postData if parameter doesn't work
    else if (e.postData && e.postData.contents) {
      try {
        // Try parsing as JSON
        const data = JSON.parse(e.postData.contents);
        email = data.email;
        Logger.log('Got email from JSON: ' + email);
      } catch (jsonError) {
        // Try parsing as URL-encoded
        const params = e.postData.contents.split('&');
        for (let i = 0; i < params.length; i++) {
          const pair = params[i].split('=');
          if (pair[0] === 'email') {
            email = decodeURIComponent(pair[1]);
            Logger.log('Got email from URL-encoded: ' + email);
            break;
          }
        }
      }
    }
    
    if (!email || email.trim() === '') {
      Logger.log('No email found!');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Email is required'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const emailTrimmed = email.trim();
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 3).setValues([['Email', 'Date', 'Time']]);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }
    
    // Check if email already exists (skip header row)
    if (sheet.getLastRow() > 1) {
      const emails = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();
      if (emails.includes(emailTrimmed)) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Email already registered!'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Add the email entry
    const timestamp = new Date();
    sheet.appendRow([emailTrimmed, timestamp.toLocaleDateString(), timestamp.toLocaleTimeString()]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Thank you! We\'ll notify you when we launch.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Something went wrong: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
