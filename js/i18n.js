// ===== Bilal — UI translations (Arabic / English) =====
const I18N = {
  ar: {
    appName: "بلال",
    tagline: "مواقيت الصلاة والأذكار",
    detecting: "جارٍ تحديد الموقع…",
    refresh: "تحديث",
    nextPrayer: "الصلاة القادمة",
    enableNotifTitle: "تفعيل التنبيهات",
    enableNotifDesc: "احصل على تنبيه عند دخول وقت كل صلاة.",
    enable: "تفعيل",
    enabled: "مُفعّل ✓",
    tabTimes: "المواقيت",
    tabMorning: "أذكار الصباح",
    tabEvening: "أذكار المساء",
    tabAfter: "أذكار بعد الصلاة",
    tabQibla: "القبلة",
    qiblaFromNorth: "اتجاه القبلة من الشمال",
    qiblaHint: "وجّه أعلى الجهاز نحو علامة الكعبة",
    qiblaAligned: "أنت تواجه القبلة الآن ✓",
    enableCompass: "تفعيل البوصلة",
    compassUnsupported: "جهازك لا يدعم البوصلة — استخدم الاتجاه بالدرجات.",
    distanceToMakkah: "المسافة إلى مكة",
    km: "كم",
    calcMethod: "طريقة الحساب",
    adhanSound: "صوت الأذان عند التنبيه",
    testAdhan: "تجربة الأذان",
    footer: "بلال — صدقة جارية",
    // prayer names
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
    // notifications
    notifTitle: "حان وقت صلاة",
    notifBody: "حيّ على الصلاة، حيّ على الفلاح",
    locationDenied: "تم رفض إذن الموقع — استخدام موقع افتراضي (مكة المكرمة)",
    locationError: "تعذّر تحديد الموقع — استخدام مكة المكرمة",
    timesError: "تعذّر جلب المواقيت، حاول التحديث.",
    remaining: "المتبقّي",
    repeatLabel: "التكرار",
    times: "مرّات",
    // calc methods
    m2: "الجمعية الإسلامية لأمريكا الشمالية (ISNA)",
    m3: "رابطة العالم الإسلامي",
    m4: "أم القرى (مكة)",
    m5: "الهيئة المصرية العامة للمساحة",
    m1: "جامعة العلوم الإسلامية، كراتشي",
    m8: "منطقة الخليج",
    m12: "الاتحاد الإسلامي بفرنسا",
    m7: "معهد الجيوفيزياء، طهران",
    m0: "جامعة الإمام، طهران (شيعة)"
  },
  en: {
    appName: "Bilal",
    tagline: "Prayer Times & Athkar",
    detecting: "Detecting your location…",
    refresh: "Refresh",
    nextPrayer: "Next Prayer",
    enableNotifTitle: "Enable Notifications",
    enableNotifDesc: "Get an alert when each prayer time begins.",
    enable: "Enable",
    enabled: "Enabled ✓",
    tabTimes: "Times",
    tabMorning: "Morning Athkar",
    tabEvening: "Evening Athkar",
    tabAfter: "After-Prayer Athkar",
    tabQibla: "Qibla",
    qiblaFromNorth: "Qibla direction from North",
    qiblaHint: "Point the top of your device toward the Kaaba marker",
    qiblaAligned: "You are facing the Qibla ✓",
    enableCompass: "Enable compass",
    compassUnsupported: "Your device has no compass — use the degree bearing.",
    distanceToMakkah: "Distance to Makkah",
    km: "km",
    calcMethod: "Calculation method",
    adhanSound: "Play Adhan sound on alert",
    testAdhan: "Test Adhan",
    footer: "Bilal — an ongoing charity",
    Fajr: "Fajr",
    Sunrise: "Sunrise",
    Dhuhr: "Dhuhr",
    Asr: "Asr",
    Maghrib: "Maghrib",
    Isha: "Isha",
    notifTitle: "Time for prayer",
    notifBody: "Come to prayer, come to success",
    locationDenied: "Location denied — using default (Makkah)",
    locationError: "Could not detect location — using Makkah",
    timesError: "Could not load prayer times, try refreshing.",
    remaining: "Remaining",
    repeatLabel: "Repeat",
    times: "times",
    m2: "Islamic Society of North America (ISNA)",
    m3: "Muslim World League",
    m4: "Umm al-Qura, Makkah",
    m5: "Egyptian General Authority of Survey",
    m1: "University of Islamic Sciences, Karachi",
    m8: "Gulf Region",
    m12: "Union des Organisations Islamiques de France",
    m7: "Institute of Geophysics, Tehran",
    m0: "Shia Ithna-Ashari (Jafari)"
  }
};

let currentLang = localStorage.getItem("bilal_lang") || "ar";

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.textContent = currentLang === "ar" ? "EN" : "ع";
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("bilal_lang", lang);
  applyTranslations();
  document.dispatchEvent(new CustomEvent("langchange"));
}
