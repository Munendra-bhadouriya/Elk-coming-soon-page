# Step-by-Step Fix - Follow Exactly

## ⚠️ IMPORTANT: The script code must be IN Google Apps Script, not just in your local file!

### Step 1: Open Google Apps Script Editor
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. You should see a code editor with a file called "Code.gs" or similar

### Step 2: Clear and Paste Code
1. **Select ALL** the code in the editor (Ctrl+A)
2. **Delete it** (Delete key)
3. **Copy ALL** the code from `google-apps-script.js` file
4. **Paste it** into the Google Apps Script editor
5. You should see TWO functions: `doGet` and `doPost`

### Step 3: SAVE the Script
1. Click the **Save icon** (floppy disk) or press **Ctrl+S**
2. You should see "All changes saved" message
3. **VERIFY**: Look at the top - does it say "Untitled project" or your project name? If "Untitled", click it and name it.

### Step 4: Deploy as Web App
1. Click **Deploy** button (top right, blue button)
2. Click **New deployment**
3. Click the **gear icon** ⚙️ (settings) next to "Select type"
4. Choose **Web app**
5. Fill in:
   - **Description**: Email subscription (optional)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** ← MUST BE THIS!
6. Click **Deploy**

### Step 5: Authorize (First Time Only)
- If you see "Authorization required":
  - Click **Authorize access**
  - Choose your Google account
  - Click **Advanced** → **Go to [project name] (unsafe)**
  - Click **Allow**

### Step 6: Copy the Web App URL
- After deployment, you'll see a popup with **Web app URL**
- It should look like: `https://script.google.com/macros/s/AKfyc.../exec`
- **Copy this URL** (click the copy icon)

### Step 7: Test the URL
- Open the URL in a new browser tab
- You should see: **"Google Apps Script is working!"**
- If you see "Script function not found", go back to Step 2

### Step 8: Update Your Files
- Replace the URL in `index.html` (around line 493)
- Replace the URL in `test-script.html` (around line 42)

---

## 🔍 Troubleshooting

**Still seeing "Script function not found"?**
- Make sure you clicked **SAVE** in Apps Script editor
- Make sure you see `function doGet` and `function doPost` in the code
- Try creating a **NEW deployment** instead of editing the old one

**Still seeing "Failed to fetch"?**
- Make sure "Who has access" is set to **"Anyone"**
- Make sure you're using the **Web app URL**, not the editor URL
- Try opening the URL in an incognito/private window
