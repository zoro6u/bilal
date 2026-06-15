# Bilal — Google Play listing kit

Everything needed to publish Bilal on the Google Play Console. Technical artifacts are
already built; the items marked **(you)** require your Google account.

## Upload artifact
- **App Bundle:** `dist/Bilal-1.0.aab` (signed with the upload key, targetSdk 35, versionCode 2)
- Upload key: `dist/bilal-upload.keystore` (alias `upload`, password `bilalupload`) — **keep private; back it up.** You'll need it for every future update unless you enroll in Play App Signing key rotation.

## Store listing fields

**App name** (≤30): `Bilal: Prayer Times & Athkar`

**Short description** (≤80):
`Adhan, prayer times, Athkar & Qibla — in Arabic and English.`

**Full description (English):**
```
Bilal is a simple, beautiful prayer companion in both Arabic and English.

• Accurate prayer times for your exact location (with multiple calculation methods:
  Umm al-Qura, ISNA, Muslim World League, Egypt and more).
• A live countdown to the next prayer and the Hijri date.
• Adhan audio and a notification at every prayer time — with a dedicated Fajr adhan.
• Morning, evening and after-prayer Athkar (from Hisn al-Muslim), each with the
  Arabic text, an English translation and a tap counter.
• A Qibla compass that points to the Kaaba using your device's sensors, plus the
  exact bearing and distance to Makkah.
• Full Arabic (right-to-left) and English interface — switch with one tap.

No ads. No accounts. No tracking. Your location is used only to calculate prayer
times and the Qibla direction.

Named after Bilāl ibn Rabāh (may Allah be pleased with him), the first muezzin of Islam.
```

**Full description (Arabic):**
```
«بلال» رفيقك للصلاة بواجهة عربية وإنجليزية، بسيط وأنيق.

• مواقيت صلاة دقيقة حسب موقعك، مع عدّة طرق للحساب (أم القرى، رابطة العالم الإسلامي،
  الهيئة المصرية، ISNA وغيرها).
• عدّاد تنازلي للصلاة القادمة مع التاريخ الهجري.
• صوت الأذان وتنبيه عند دخول كل صلاة، مع أذان خاص للفجر.
• أذكار الصباح والمساء وأذكار بعد الصلاة (من حصن المسلم) بالعربية مع الترجمة الإنجليزية
  وعدّاد للتكرار.
• بوصلة القبلة تشير إلى الكعبة باستخدام حسّاسات جهازك، مع زاوية الاتجاه والمسافة إلى مكة.
• واجهة عربية كاملة (من اليمين لليسار) وإنجليزية، بنقرة واحدة.

بدون إعلانات، بدون حسابات، بدون تتبّع. يُستخدم موقعك فقط لحساب المواقيت واتجاه القبلة.

سُمّي التطبيق تيمّنًا ببلال بن رباح رضي الله عنه، أول مؤذّن في الإسلام.
```

## Graphics (in this folder)
| Asset | File | Required size |
|-------|------|---------------|
| App icon (hi-res) | `play-icon-512.png` | 512×512 |
| Feature graphic | `feature-graphic-1024x500.png` | 1024×500 |
| Phone screenshots | `01-times.png` … `05-evening-en.png` | 1080×1920 (≥2 needed) |

## Categorization & content
- **Category:** Lifestyle (Tools is also acceptable)
- **Tags:** prayer times, adhan, athkar, qibla, islam
- **Content rating:** Everyone (answer the questionnaire honestly — no objectionable content)
- **Contains ads:** No · **In-app purchases:** No
- **Target audience:** 13+ (or all ages; no data collected from children)

## Data safety form (answers)
- **Does your app collect or share user data?** Yes — *Location (approximate & precise)*.
- **Collected or shared?** **Shared** (sent to the Aladhan and OpenStreetMap APIs to return times/place name). Not stored by the developer.
- **Purpose:** App functionality only. **Not** for advertising, analytics, or tracking.
- **Is data encrypted in transit?** Yes (HTTPS).
- **Can users request deletion?** No data is retained by us, so there is nothing to delete.

## Privacy policy URL **(you — after the next Pages deploy)**
`https://zoro6u.github.io/bilal/privacy.html`

## Contact email
`raghadnzoro@gmail.com`

---

## Submission steps **(you)**
1. Create a **Google Play Developer account** ($25 one-time) and verify your identity.
2. **Create app** → name *Bilal: Prayer Times & Athkar*, language, type *App*, *Free*.
3. Fill **Store listing** (text + graphics above), **Privacy policy** URL, **Data safety**,
   **Content rating**, **Target audience**.
4. **Production → Create release** → upload `dist/Bilal-1.0.aab`. Accept **Play App Signing**
   (Google holds the signing key; your upload key signs uploads).
5. New personal accounts: run **Closed testing** with **≥12 testers for 14 days** before
   you can promote to Production. Add testers by email or a Google Group.
6. Submit for review. First review typically takes a few days.

## Updating later
Bump `versionCode` (and `versionName`) in `android/app/build.gradle`, then:
```
./tools/build-aab.sh        # produces a new signed dist/Bilal-<ver>.aab
```
