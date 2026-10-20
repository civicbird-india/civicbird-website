CIVICBIRD WEBSITE — REQUIRED SETUP BEFORE LIVE USE

IMPORTANT
This folder's HTML pages require style.css, app.js, logo.svg and firebase-config.js.
The Firebase configuration is deliberately a placeholder. Do not claim login, registration,
password reset, booking storage, or settings work until Firebase is configured and tested.

1. Firebase configuration
- Open https://console.firebase.google.com/ and create/select the CivicBird project.
- Project settings > General > Your apps > Add app > Web app.
- Copy the web app config into firebase-config.js, replacing every REPLACE_WITH... placeholder.
- Authentication > Sign-in method: enable Email/Password.
- Authentication > Settings > Authorized domains: add civicbird.com and www.civicbird.com if used.
- Firestore Database: create the database, then publish the supplied firestore.rules.
- Never paste a Firebase service-account key or private admin credentials into this public website.

2. Deploy
- Upload all HTML files, style.css, app.js, firebase-config.js, logo.svg, firestore.rules,
  robots.txt and sitemap.xml to the same root directory of the static website.
- Firebase rules are deployed in Firebase Console; uploading firestore.rules to the website
  does not publish them automatically.
- Use HTTPS. Geolocation works only in a secure context such as HTTPS or localhost.

3. Test before public launch
- Open every page on desktop and mobile.
- Create a test account, confirm the verification email, log in, log out, reset password.
- Update profile, save notification preferences, update password, create a test service request,
  and confirm it appears in My Bookings.
- Test Firestore rules while signed out and as a different user to ensure users cannot see
  each other's data.
- Confirm email change works with Firebase's recent-login restrictions.
- Test all menu links, password eye buttons, required fields and mobile menu.

4. Current limitations / important product decisions
- Contact form opens the visitor's email app; it does not create a support ticket.
- Standard service fee is shown as ₹300 + 18% GST = ₹354. No payment gateway is connected.
- SMS/WhatsApp notifications are preference-only; no delivery provider is connected.
- Bird application form does not collect Aadhaar photos or process the ₹149 fee.
- No admin dashboard, Bird assignment, status-update workflow, live tracking, or payment
  collection is included in this static front-end.
- Do not claim all Birds are police verified until you have a real verification process and
  completed checks for each active Bird.
- Review privacy/terms text with a qualified professional before production use.
- The supplied Firestore rules are a starter baseline, not a complete admin/production ruleset.
