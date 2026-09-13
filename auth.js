import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function showFieldError(fieldId, isInvalid) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.toggle("invalid", isInvalid);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^[0-9+\-\s]{7,15}$/.test(value);
}

/* ---------- Login screen ---------- */
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const status = document.getElementById("login-status");
    const btn = document.getElementById("login-btn");

    const emailValid = isValidEmail(email);
    const passwordValid = password.length > 0;
    showFieldError("field-email", !emailValid);
    showFieldError("field-password", !passwordValid);
    if (!emailValid || !passwordValid) return;

    btn.disabled = true;
    status.textContent = "Logging in…";
    try {
      await signInWithEmailAndPassword(auth, email, password);
      status.textContent = "Welcome back.";
      // TODO: navigate to chat.html once that screen exists
    } catch (err) {
      status.textContent = "Couldn't log in — check your email and password.";
    } finally {
      btn.disabled = false;
    }
  });

  document.getElementById("google-btn").addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    const status = document.getElementById("login-status");
    try {
      await signInWithPopup(auth, provider);
      status.textContent = "Welcome back.";
    } catch (err) {
      status.textContent = "Google sign-in failed.";
    }
  });

  document.getElementById("phone-btn").addEventListener("click", () => {
    // TODO: build phone.html with Firebase phone-auth + reCAPTCHA verifier
    document.getElementById("login-status").textContent =
      "Phone login is coming soon.";
  });
}

/* ---------- Sign-up screen ---------- */
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const status = document.getElementById("signup-status");
    const btn = document.getElementById("signup-btn");

    const nameValid = name.length > 0;
    const emailValid = isValidEmail(email);
    const phoneValid = isValidPhone(phone);
    const passwordValid = password.length >= 8;
    const confirmValid = confirm === password && passwordValid;

    showFieldError("field-name", !nameValid);
    showFieldError("field-email", !emailValid);
    showFieldError("field-phone", !phoneValid);
    showFieldError("field-password", !passwordValid);
    showFieldError("field-confirm", !confirmValid);

    if (!nameValid || !emailValid || !phoneValid || !passwordValid || !confirmValid) return;

    btn.disabled = true;
    status.textContent = "Creating your account…";
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // TODO: write name + phone to Firestore/Supabase user profile using cred.user.uid
      status.textContent = "Account created. Redirecting to profile setup…";
      // TODO: navigate to profile-setup.html
    } catch (err) {
      status.textContent = "Couldn't create account — that email may already be in use.";
    } finally {
      btn.disabled = false;
    }
  });
}
