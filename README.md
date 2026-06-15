<div align="center">
  <img src="icons/icon-192.png" width="120" alt="Bilal logo" />
  <h1>Bilal · بلال</h1>
  <p><strong>Adhan · Prayer Times · Athkar · Qibla</strong> — bilingual (العربية / English)</p>
</div>

Bilal detects your location, shows the five daily prayer times, counts down to the
next prayer, and **plays the Adhan + sends a notification** when each prayer begins.
It also includes the **morning, evening and after‑prayer Athkar** (Arabic + English,
with tap counters) and a live **Qibla compass**. It runs as an installable PWA **and**
as a downloadable Android app.

> Named after **Bilāl ibn Rabāh (رضي الله عنه)**, the first muezzin of Islam.

## Features
- 📍 **Location-based prayer times** via the [Aladhan API](https://aladhan.com/prayer-times-api); city name resolved with OpenStreetMap.
- ⏰ **Next-prayer countdown**, live highlight, and the **Hijri date**.
- 🔊 **Real Adhan audio** at each prayer time (separate Fajr adhan) + **notifications**.
- 📿 **Athkar** — Morning, Evening, After-Prayer — fully bilingual, each with a tap counter.
- 🧭 **Qibla compass** — points to the Kaaba using your device's magnetometer, plus the exact bearing and distance to Makkah.
- 🌐 **Arabic (RTL) ⇄ English (LTR)** toggle, remembered between visits.
- 🌙 Multiple **calculation methods** (Umm al-Qura, ISNA, MWL, Egypt, …).
- 📲 **Installable PWA** (offline-capable) **and a native Android APK**.

## 📲 Get the phone app
A ready-to-install Android app is in **`dist/`**:

| File | Use |
|------|-----|
| `dist/Bilal-1.0.apk` | **Signed release** — share this with people to install. |
| `dist/Bilal-1.0-debug.apk` | Debug build for quick testing. |

**Install on a phone:** copy the APK to your Android device and open it (allow
"Install unknown apps" for your browser/file manager). Min Android 5.1 (API 22).

> The release APK is signed with `dist/bilal-release.keystore` (demo password
> `bilal12345`). For a real publication, generate your own keystore and keep it private.

### iPhone
iOS doesn't allow sideloading APKs — open the site in Safari and **Share → Add to
Home Screen**. It installs as a full-screen app with the Bilal icon.

## 🖥️ Run the web app
Geolocation, notifications, compass and service workers need HTTP(S), not `file://`:

```bash
cd Bilal
python3 -m http.server 8080      # then open http://localhost:8080
```

## 🔨 Rebuild the Android app
```bash
npm install
./tools/build-apk.sh             # debug  -> dist/Bilal-debug.apk
./tools/build-apk.sh release     # signed -> dist/Bilal-1.0.apk
```
Needs **JDK 17** and the **Android SDK** (platform-34, build-tools 34.0.0). Set
`JAVA_HOME` / `ANDROID_HOME`, or the script falls back to `~/.bilal-build`.
The app is a [Capacitor](https://capacitorjs.com) wrapper around the web app
(`capacitor.config.json`, native project in `android/`).

## 🎨 Regenerate the logo / icons
The Bilal mark (a minaret with an onion dome and crescent finial, the Adhan radiating
as soundwaves) is generated from code:
```bash
python3 tools/gen_icons.py       # writes icons/ and android launcher icons
```

## 🛒 Publish to Google Play
Bilal is Play-ready. A signed **App Bundle** is built at `dist/Bilal-1.0.aab`
(targetSdk 35, native background prayer notifications via Capacitor LocalNotifications).
The full listing kit — title, descriptions (AR + EN), data-safety answers, store
graphics and the step-by-step submission checklist — is in
[`store/STORE_LISTING.md`](store/STORE_LISTING.md). Privacy policy:
[`privacy.html`](privacy.html) (hosted at `/bilal/privacy.html` on Pages).

```bash
./tools/build-aab.sh             # rebuild dist/Bilal-<ver>.aab (signed)
python3 tools/gen_icons.py       # icons
node tools/gen_store.js          # screenshots + feature graphic -> store/
```
> Note: personal Play accounts must run a 14-day closed test with ≥12 testers before
> production. See the checklist for details.

## 🚀 Deploy
- **GitHub Pages (PWA):** push to `main` — `.github/workflows/deploy-pages.yml` publishes the site.
- **APK release:** push a tag like `v1.0` — `.github/workflows/android-apk.yml` builds the APK and attaches it to a GitHub Release so anyone can download it.

## Project structure
```
Bilal/
├── index.html              # markup & layout (inline SVG logo)
├── manifest.json           # PWA manifest (icons, shortcuts)
├── sw.js                   # service worker (offline + notification taps)
├── css/styles.css          # RTL/LTR-aware theme + compass
├── js/i18n.js              # Arabic/English UI strings
├── js/athkar.js            # Athkar content (AR + EN)
├── js/app.js               # location, times, notifications, qibla, counters
├── icons/                  # app icons + maskable + master
├── audio/                  # adhan.mp3, adhan_fajr.mp3
├── capacitor.config.json   # native app config
├── android/                # generated Capacitor Android project
├── tools/gen_icons.py      # logo / icon generator
├── tools/build-apk.sh      # local APK build
└── dist/                   # built APKs + keystore
```

## Notes & credits
- Athkar text: *Hisn al-Muslim* (Fortress of the Muslim). Prayer times: Aladhan. Geocoding: OpenStreetMap Nominatim.
- Adhan audio is fetched from a public source for convenience — replace `audio/adhan*.mp3` with your preferred reciter.
- Reliable background alerts need the app open/installed; true server-pushed scheduling is out of scope for this client-only app.
