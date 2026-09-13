# Nova — Just Connect

Custom messaging and video calling app.

## Stack
- HTML / CSS / vanilla JS (`www/`)
- Firebase (Auth, Firestore, Storage, Cloud Messaging)
- Capacitor (native Android wrapper — camera/mic permissions, background push)
- WebRTC for video calling

## Setup
```
npm install
npx cap add android
npm run sync
npm run android
```

Fill in your Firebase project keys in `www/js/firebase-config.js` before running.

## Structure
```
nova-app/
  www/                 → all web assets (this is what Capacitor wraps)
    index.html         → login screen
    signup.html        → sign-up screen
    css/style.css
    js/firebase-config.js
    js/auth.js
  capacitor.config.json
  package.json
```

## Status
- [x] Repo scaffold
- [x] Login + sign-up screens (UI only, Firebase Auth wired for email/password)
- [ ] Google sign-in
- [ ] Phone OTP login
- [ ] Profile / DP setup
- [ ] Chat, Status, Call tabs
- [ ] WebRTC video calling
- [ ] Push notifications
