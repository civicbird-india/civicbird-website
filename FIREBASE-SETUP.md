# CivicBird Firebase setup pack

This update preserves the existing HTML pages and visual design and adds Firebase Email/Password authentication for:
- `signup.html` — creates a Firebase Authentication account, requests email verification, and writes a basic customer profile to Firestore.
- `login.html` — signs in verified email accounts.
- `forgot-password.html` — requests a Firebase password-reset email.
- `firebase-config.js` — contains placeholders for the Firebase web app config.
- `firestore.rules` — safe starting rules for customer profiles; other collections remain denied.

## Before uploading to the live site

1. Open Firebase Console → Project settings → General → Your apps → Web app.
2. Copy the web app config values into `firebase-config.js`. Replace every `PASTE_..._HERE` placeholder.
3. Firebase Console → Authentication → Sign-in method: ensure **Email/Password** is enabled.
4. Authentication → Settings → Authorized domains: ensure `civicbird.com` and `www.civicbird.com` are present.
5. Firebase Console → Firestore Database → Rules. Paste the contents of `firestore.rules` and click **Publish**.
6. Upload the changed files to the website and test signup with an email inbox you can access, then verify the email, sign in, and test password reset.

## Important scope and safety limits

- Do not add Firebase Admin SDK service-account credentials to website files. Only the web app config belongs in `firebase-config.js`.
- This pack does **not** connect booking requests, support tickets, Bird applications, payments, or Aadhaar/photo uploads to Firestore/Storage. Those collections remain denied by the rules. The current service form still creates an email draft, not a saved booking.
- Do not collect/upload Aadhaar documents until private Firebase Storage, restrictive Storage rules, access controls, retention/deletion policy, and an appropriate verification workflow are implemented.
- This does not implement phone OTP, admin assignment, booking dashboards, payment gateway, or role management.
- Firebase config is a client config, not a secret; Firestore rules and Authentication controls protect the data.
- Run the site on HTTPS (Cloudflare Pages custom domain is fine). Opening local HTML directly as `file://` may not work with module imports.

## Troubleshooting
- `auth/operation-not-allowed`: enable Email/Password in Authentication.
- `auth/unauthorized-domain`: add the current website hostname under Authentication → Settings → Authorized domains.
- `permission-denied`: publish the included Firestore rules and confirm the project config matches the project where Firestore was created.
