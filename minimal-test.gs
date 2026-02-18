// MINIMAL TEST SCRIPT - Copy this EXACTLY into Google Apps Script
// This is the simplest possible script to test if deployment works

function doGet(e) {
  return ContentService.createTextOutput('Google Apps Script is working!').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    // Get email from form data
    const email = e.parameter.email;
    
    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Email is required'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if needed
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 3).setValues([['Email', 'Date', 'Time']]);
    }
    
    // Add the email
    const timestamp = new Date();
    sheet.appendRow([email, timestamp.toLocaleDateString(), timestamp.toLocaleTimeString()]);
    
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
