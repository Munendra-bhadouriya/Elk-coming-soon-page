# How to Deploy Google Apps Script Correctly

## Step-by-Step Deployment Guide

### 1. Open Your Google Apps Script Project
- Go to your Google Sheet
- Click **Extensions > Apps Script**
- Make sure your code is saved (click the floppy disk icon or press Ctrl+S)

### 2. Deploy as Web App
- Click **Deploy** button (top right)
- Select **New deployment**
- Click the **gear icon** ⚙️ next to "Select type"
- Choose **Web app**

### 3. Configure Settings
- **Description**: (optional) "Email subscription handler"
- **Execute as**: Select **Me** (your email)
- **Who has access**: Select **Anyone** ← THIS IS CRITICAL!
- Click **Deploy**

### 4. Authorize the Script (First Time Only)
- A popup will appear asking for authorization
- Click **Review permissions**
- Select your Google account
- Click **Advanced** → **Go to [Your Project Name] (unsafe)**
- Click **Allow**

### 5. Copy the Web App URL
- After deployment, you'll see a **Web app URL**
- It should look like: `https://script.google.com/macros/s/AKfyc.../exec`
- **Copy this entire URL**
- **DO NOT** use the URL that has `/u/1/` in it - that's the editor URL, not the web app URL

### 6. Update Your Files
- Replace the URL in `index.html` (line 493)
- Replace the URL in `test-script.html` (line 42)

### 7. Test Again
- Open `test-script.html`
- Click "Test GET" - should show "Google Apps Script is working!"

---

## Common Mistakes:
❌ Using the editor URL (has `/u/1/` or `/dev/`)
❌ Setting "Who has access" to "Only myself"
❌ Not clicking "Deploy" after making changes
❌ Using an old/cached URL

## If Still Not Working:
The script might need to be redeployed. Each time you update the code, you need to:
1. Click **Deploy > Manage deployments**
2. Click the **pencil icon** (edit)
3. Click **Deploy** again (to create a new version)
