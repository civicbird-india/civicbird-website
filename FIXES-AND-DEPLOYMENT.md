# CivicBird fixes and deployment

## What was fixed
- Added a shared `auth-ui.js` module for the homepage and Services page.
- The account panel now observes Firebase Authentication state and hides Login/Sign Up for signed-in, email-verified customers.
- Added logout handling and visible status/error messages.
- Fixed the HTML `hidden` attribute being overridden by the site's `.btn { display: inline-flex; }` CSS by adding `[hidden]{display:none!important}`.
- Raised the mobile navigation menu stacking order so menu links remain clickable.
- Changed the account links to relative paths for static-hosting portability.

## Deploy
Upload/replace the files in the root of the existing GitHub repository with the contents of this ZIP, preserving `logo.png`, `founder.png`, and all existing pages. Commit the changes to the same branch used by Cloudflare Pages (currently `main`).

After deployment, test:
1. Open `https://civicbird.com/` and `https://civicbird.com/services.html`.
2. Sign in with an email-verified account.
3. Confirm Login and Sign Up disappear and the account email/logout option appears.
4. Log out and confirm Login/Sign Up return.
5. Open the mobile menu and tap Home.

## Important current limitations
- The Services form currently prepares an email (`mailto:`) for the customer to review and send; it does not create a booking record in Firestore or charge a payment.
- Bird applications, payment processing, secure document upload, and admin assignment are not implemented by this patch.
- Firebase configuration is a web client configuration, not a server secret. Continue protecting data with Firebase Security Rules.
