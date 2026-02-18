# Quick Fix for Google Apps Script

## If the URL doesn't work, follow these steps:

### Step 1: Verify Deployment Settings

1. Open your Google Apps Script project
2. Click **Deploy > Manage deployments**
3. Click the **pencil icon** (edit) next to your deployment
4. Make sure:
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: **Anyone** (including anonymous) ← THIS IS CRITICAL
5. Click **Deploy**
6. **Copy the NEW URL** (it might have changed)

### Step 2: Update the URL

Replace the URL in both `index.html` and `test-script.html` with your new URL.

### Step 3: Test Again

Open `test-script.html` and try Test GET again.

---

## Alternative: Use Google Forms (Easier Method)

If Apps Script continues to have issues, you can use Google Forms:

1. Create a Google Form
2. Add a "Short answer" question for email
3. Link it to a Google Sheet
4. Use the form's action URL in your HTML

This method is simpler and more reliable!

---

## Common Issues:

- **"Failed to fetch"**: Script not deployed or wrong access settings
- **Authorization required**: "Who has access" is not set to "Anyone"
- **404 Error**: URL is incorrect or script was deleted
- **CORS Error**: Normal with Google Apps Script, but form submission still works
