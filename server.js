/**
 * Node.js Backend Server for Google Sheets Integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install dependencies: npm install express googleapis
 * 2. Set up Google Cloud credentials (see README)
 * 3. Update GOOGLE_SHEET_ID and SHEET_NAME below
 * 4. Run: node server.js
 */

const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Replace these with your Google Sheet details
const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Subscribers';

// Google Sheets API setup
// You'll need to create a service account and download the credentials JSON
// See README for detailed instructions
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Path to your service account credentials
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Initialize sheet headers if needed
async function initializeSheet() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A1:C1`,
    });

    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A1:C1`,
        valueInputOption: 'RAW',
        resource: {
          values: [['Email', 'Date', 'Time']],
        },
      });
    }
  } catch (error) {
    console.error('Error initializing sheet:', error);
  }
}

// API endpoint to save email
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address',
      });
    }

    // Check if email already exists
    const existingEmails = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const emails = existingEmails.data.values
      ? existingEmails.data.values.flat().slice(1) // Skip header
      : [];

    if (emails.includes(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered!',
      });
    }

    // Add new email entry
    const timestamp = new Date();
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:C`,
      valueInputOption: 'RAW',
      resource: {
        values: [[
          email,
          timestamp.toLocaleDateString(),
          timestamp.toLocaleTimeString(),
        ]],
      },
    });

    res.json({
      success: true,
      message: 'Thank you! We\'ll notify you when we launch.',
    });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again.',
    });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await initializeSheet();
  console.log('Google Sheets integration ready!');
});
