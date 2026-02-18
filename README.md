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

## Deployment

Simply upload `index.html` to your web hosting service. The page is self-contained with all CSS and JavaScript embedded.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Enjoy your premium coming soon page! 🚀
