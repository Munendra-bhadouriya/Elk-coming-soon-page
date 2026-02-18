# Google Sheets Integration Setup Guide

There are two ways to integrate Google Sheets with your coming soon page:

## Option 1: Google Apps Script (Recommended - No Backend Server)

This is the simplest method and doesn't require running a server.

### Steps:

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Name it (e.g., "Email Subscribers")

2. **Set up Apps Script**
   - In your Google Sheet, go to **Extensions > Apps Script**
   - Delete any default code
   - Copy and paste the code from `google-apps-script.js`
   - Replace `'YOUR_SHEET_NAME'` with your actual sheet name (the tab name, usually "Sheet1")

3. **Deploy as Web App**
   - Click **Deploy > New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **Web app**
   - Set **Execute as**: Me
   - Set **Who has access**: Anyone
   - Click **Deploy**
   - Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/...`)

4. **Update index.html**
   - Open `index.html`
   - Find the email form submission code
   - Replace the fetch URL with your Web App URL
   - Uncomment the fetch code

---

## Option 2: Node.js Backend Server

This method gives you more control but requires running a server.

### Steps:

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or use existing)
   - Enable **Google Sheets API**
   - Go to **IAM & Admin > Service Accounts**
   - Click **Create Service Account**
   - Give it a name (e.g., "sheets-api")
   - Grant it **Editor** role
   - Click **Create Key** > Choose **JSON**
   - Download the JSON file and save it as `credentials.json` in your project folder

4. **Share Google Sheet with Service Account**
   - Open the `credentials.json` file
   - Copy the `client_email` value (looks like: `xxx@xxx.iam.gserviceaccount.com`)
   - Open your Google Sheet
   - Click **Share** button
   - Paste the email address
   - Give it **Editor** access
   - Click **Send**

5. **Configure Server**
   - Open `server.js`
   - Replace `YOUR_GOOGLE_SHEET_ID` with your sheet ID
     - Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Replace `SHEET_NAME` if your sheet tab has a different name (default: "Subscribers")

6. **Run the Server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Update index.html**
   - The frontend is already configured to work with the backend
   - Make sure the server is running on `http://localhost:3000`
   - Or update the fetch URL if using a different port

---

## Testing

1. Open `index.html` in your browser (or visit `http://localhost:3000` if using Node.js)
2. Enter an email address
3. Click "Notify Me"
4. Check your Google Sheet - the email should appear with date and time

---

## Troubleshooting

### Google Apps Script:
- Make sure you deployed as "Web app" not "API executable"
- Check that "Who has access" is set to "Anyone"
- Verify the sheet name matches exactly (case-sensitive)

### Node.js Backend:
- Make sure `credentials.json` is in the project root
- Verify the service account email has access to the sheet
- Check that Google Sheets API is enabled in your Google Cloud project
- Ensure the sheet ID and sheet name are correct

---

## Security Notes

- **Google Apps Script**: The web app URL is public, but you can add email validation
- **Node.js Backend**: Consider adding rate limiting and CORS restrictions for production
- Never commit `credentials.json` to version control (add it to `.gitignore`)
