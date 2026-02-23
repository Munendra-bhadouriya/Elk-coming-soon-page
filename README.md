# Coming Soon Page

A beautiful, premium, and classy "Coming Soon" page for your domain.

## Features

✨ **Premium Design**
- Elegant typography with Playfair Display and Inter fonts
- Smooth gradient animations
- Glassmorphism effects
- Modern, sophisticated color scheme

⏱️ **Countdown Timer**
- Real-time countdown to your launch date
- Responsive design that works on all devices

📧 **Email Subscription**
- Beautiful email input form
- Form validation
- Success/error messaging

🔗 **Social Media Links**
- Ready-to-customize social media icons
- Hover effects and smooth transitions

📱 **Fully Responsive**
- Looks great on desktop, tablet, and mobile
- Optimized for all screen sizes

## Customization

### 1. Change Launch Date
Edit the countdown timer date in `index.html`:
```javascript
const launchDate = new Date('2024-12-31T23:59:59').getTime();
```

### 2. Update Brand Name
Replace "LALA" with your brand name:
```html
<div class="logo">YOUR BRAND NAME</div>
```

### 3. Customize Colors
Edit the CSS variables in the `:root` section:
```css
:root {
    --primary-color: #1a1a2e;
    --accent-color: #d4af37;
    /* ... */
}
```

### 4. Update Social Media Links
Replace the `#` hrefs in the social links section with your actual social media URLs:
```html
<a href="https://twitter.com/yourhandle" class="social-link">
```

### 5. Connect Email Form to Backend
Uncomment and configure the fetch API call in the form submit handler to connect to your email service (e.g., Mailchimp, SendGrid, etc.)

## Store enquiry form in Google Sheets

The enquiry form (Name, Number, Address) can be saved to a Google Sheet using **Google Apps Script** and the included Node server as a proxy (browsers cannot POST directly to Apps Script due to CORS).

### Step 1: Create the sheet and script

1. Create a new [Google Sheet](https://sheets.google.com) (or use an existing one).
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete any sample code and paste in the contents of **`google-apps-script.js`** from this project.
4. Save the project (e.g. name it “Enquiry to Sheet”).

### Step 2: Deploy as a Web App

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon next to “Select type” and choose **Web app**.
3. Set **Execute as**: “Me”.
4. Set **Who has access**: “Anyone”.
5. Click **Deploy**, then copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

### Step 3: Run the site with the proxy

1. In the project folder run: `npm install` then `node server.js`.
2. Set the Apps Script URL when starting the server:
   - **Windows (PowerShell):** `$env:GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_ID/exec"; node server.js`
   - **Mac/Linux:** `GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_ID/exec" node server.js`  
   Replace `YOUR_ID` with your actual Web app URL.
3. Open **http://localhost:3000** and submit the enquiry form. Entries will appear in the first sheet as **Name | Number | Address | Date | Time**.

The form in `index.html` posts to `/api/enquiry`; the server forwards that to your Apps Script URL so submissions are saved to the sheet without CORS issues.

## Deployment

The enquiry form posts to **`/api/enquiry`** on the same origin, so you need to deploy the **Node.js app** (not just the HTML) for submissions to reach Google Sheets.

### Option 1: Render (recommended, free tier)

1. Push your project to **GitHub** (if not already).
2. Go to [render.com](https://render.com) and sign up / log in.
3. Click **New → Web Service**.
4. Connect your GitHub repo and select this project.
5. Configure:
   - **Name:** e.g. `elk-coming-soon`
   - **Runtime:** Node
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Instance type:** Free
6. Under **Environment**, add a variable (optional if you hardcoded the URL in `server.js`):
   - **Key:** `GOOGLE_SCRIPT_URL`
   - **Value:** your Apps Script Web app URL (e.g. `https://script.google.com/macros/s/.../exec`)
7. Click **Create Web Service**. Render will build and deploy. Your site will be at `https://your-service-name.onrender.com`.

### Option 2: Railway

1. Push to GitHub, then go to [railway.app](https://railway.app).
2. **New Project → Deploy from GitHub** and select the repo.
3. Railway will detect Node and use `npm start`. Add env var **GOOGLE_SCRIPT_URL** in the project **Variables** tab if you prefer not to hardcode it.
4. Under **Settings**, add a **Public Domain** to get a live URL.

### Option 3: Vercel (static + serverless form)

The project includes a Vercel serverless function so the form works on Vercel.

1. Push the full project (including the **`api`** folder and **`vercel.json`**) to GitHub.
2. In [vercel.com](https://vercel.com), **Add New → Project** and import the repo.
3. Deploy (no build command needed). Vercel will serve `index.html` and static files, and **`/api/enquiry`** will run the serverless function in **`api/enquiry.js`**.
4. In the Vercel project go to **Settings → Environment Variables** and add:
   - **Name:** `GOOGLE_SCRIPT_URL`
   - **Value:** your Google Apps Script Web app URL  
   (Optional if the URL is already set in `api/enquiry.js`.)
5. Redeploy so the env var is applied. The enquiry form will then save to your sheet.

### Static-only (no form backend)

If you deploy **only** `index.html` and assets (no `api/` folder) to Netlify, GitHub Pages, or Vercel without the API, the page will load but the form will **not** save to Sheets.

### Checklist before going live

- [ ] Google Apps Script is deployed as a Web app (“Anyone” access) and the URL is set in `server.js` or in `GOOGLE_SCRIPT_URL`.
- [ ] Enquiry submissions are appearing in your Google Sheet.
- [ ] If you use a custom domain, point its DNS to your host (Render/Railway/etc.) as per their docs.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Enjoy your premium coming soon page! 🚀
