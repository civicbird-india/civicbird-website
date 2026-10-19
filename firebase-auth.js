
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  firebaseConfig,
  firebaseConfigIsReady
} from "./firebase-config.js";

const status = document.getElementById("status");
const showStatus = (message) => {
  if (status) {
    status.textContent = message;
    status.style.display = "block";
  }
};

if (!firebaseConfigIsReady) {
  showStatus("Firebase configuration is not ready.");
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword =
        document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        showStatus("Passwords do not match.");
        return;
      }

      const button = signupForm.querySelector('button[type="submit"]');
      if (button) button.disabled = true;

      try {
        const credential = await createUserWithEmailAndPassword(
          auth, email, password
        );

        await sendEmailVerification(credential.user);

        try {
          await setDoc(doc(db, "customers", credential.user.uid), {
            uid: credential.user.uid,
            name,
            mobile,
            email,
            createdAt: serverTimestamp()
          });
        } catch (profileError) {
          console.error("Customer profile save failed:", profileError);
          showStatus(
            "Account created, but the profile could not be saved. " +
            "Secure Firestore rules must be configured before profile storage."
          );
          return;
        }

        showStatus(
          "Account created. Check your email and verify your address before logging in."
        );

        await signOut(auth);
        signupForm.reset();
      } catch (error) {
        console.error(error);
        const messages = {
          "auth/email-already-in-use": "This email already has an account.",
          "auth/invalid-email": "Enter a valid email address.",
          "auth/weak-password": "Choose a stronger password.",
          "auth/operation-not-allowed":
            "Enable Email/Password in Firebase Authentication."
        };

        showStatus(
          messages[error.code] ||
          "Signup failed. Please check your details and try again."
        );
      } finally {
        if (button) button.disabled = false;
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const button = loginForm.querySelector('button[type="submit"]');

      if (button) button.disabled = true;

      try {
        const credential = await signInWithEmailAndPassword(
          auth, email, password
        );

        if (!credential.user.emailVerified) {
          await signOut(auth);
          showStatus(
            "Please verify your email using the link we sent before logging in."
          );
          return;
        }

        showStatus("Login successful. Opening CivicBird home page...");
        window.location.href = "index.html";
      } catch (error) {
        console.error(error);
        const messages = {
          "auth/invalid-credential": "Email or password is incorrect.",
          "auth/user-not-found": "No account found for this email.",
          "auth/wrong-password": "Email or password is incorrect.",
          "auth/invalid-email": "Enter a valid email address."
        };

        showStatus(
          messages[error.code] ||
          "Login failed. Please check your details and try again."
        );
      } finally {
        if (button) button.disabled = false;
      }
    });
  }

  const resetForm = document.getElementById("resetForm");
  if (resetForm) {
    resetForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const button = resetForm.querySelector('button[type="submit"]');

      if (button) button.disabled = true;

      try {
        await sendPasswordResetEmail(auth, email);
        showStatus(
          "If an eligible account exists, password reset instructions will be sent to its email address."
        );
        resetForm.reset();
      } catch (error) {
        console.error(error);
        showStatus(
          "Could not request a reset email. Check the email address and Firebase settings, then try again."
        );
      } finally {
        if (button) button.disabled = false;
      }
    });
  }
}
