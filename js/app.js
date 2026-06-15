// ===== Bilal — main application logic =====

const PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const NOTIFY_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]; // Sunrise shown, not notified
const CALC_METHODS = [4, 3, 2, 5, 1, 8, 12, 7, 0]; // Aladhan method IDs
const KAABA = { lat: 21.4225, lon: 39.8262 };

const state = {
  coords: null,
  locationName: "",
  timings: null,       // { Fajr: Date, ... } as Date objects (today)
  rawTimes: null,      // { Fajr: "05:01", ... }
  hijri: "",
  method: parseInt(localStorage.getItem("bilal_method") || "4", 10),
  adhanSound: localStorage.getItem("bilal_adhan_sound") !== "false",
  notifiedToday: {},   // { Fajr: "2026-06-15", ... }
  timerHandle: null,
  qiblaBearing: null,
  compassOn: false
};

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);
const pad = (n) => String(n).padStart(2, "0");

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function timeStrToDate(str) {
  // str "HH:MM" -> Date today
  const [h, m] = str.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function fmtTime(date) {
  let h = date.getHours();
  const m = pad(date.getMinutes());
  if (currentLang === "en") {
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }
  return `${pad(h)}:${m}`;
}

// ---------- location ----------
function getLocation() {
  $("#locationName").textContent = t("detecting");
  if (!navigator.geolocation) {
    fallbackLocation(t("locationError"));
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      state.coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      reverseGeocode();
      fetchTimes();
      computeQibla();
    },
    (err) => {
      const msg = err.code === 1 ? t("locationDenied") : t("locationError");
      fallbackLocation(msg);
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 3600000 }
  );
}

function fallbackLocation(msg) {
  state.coords = { lat: 21.4225, lon: 39.8262 }; // Makkah
  state.locationName = currentLang === "ar" ? "مكة المكرمة" : "Makkah";
  $("#locationName").textContent = msg;
  setTimeout(() => { $("#locationName").textContent = state.locationName; }, 4000);
  fetchTimes();
  computeQibla();
}

async function reverseGeocode() {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${state.coords.lat}&lon=${state.coords.lon}&zoom=10&accept-language=${currentLang}`;
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    const data = await res.json();
    const a = data.address || {};
    const city = a.city || a.town || a.village || a.county || a.state || "";
    const country = a.country || "";
    state.locationName = [city, country].filter(Boolean).join("، ") || `${state.coords.lat.toFixed(2)}, ${state.coords.lon.toFixed(2)}`;
  } catch (e) {
    state.locationName = `${state.coords.lat.toFixed(2)}, ${state.coords.lon.toFixed(2)}`;
  }
  $("#locationName").textContent = state.locationName;
}

// ---------- prayer times ----------
async function fetchTimes() {
  if (!state.coords) return;
  try {
    const ts = Math.floor(Date.now() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${ts}?latitude=${state.coords.lat}&longitude=${state.coords.lon}&method=${state.method}`;
    const res = await fetch(url);
    const data = await res.json();
    const tm = data.data.timings;
    state.rawTimes = {};
    state.timings = {};
    PRAYER_ORDER.forEach((p) => {
      const clean = tm[p].split(" ")[0];
      state.rawTimes[p] = clean;
      state.timings[p] = timeStrToDate(clean);
    });
    const h = data.data.date.hijri;
    state.hijri = currentLang === "ar"
      ? `${h.day} ${h.month.ar} ${h.year} هـ`
      : `${h.day} ${h.month.en} ${h.year} AH`;
    renderTimes();
    tick();
  } catch (e) {
    $("#timesList").innerHTML = `<li class="error">${t("timesError")}</li>`;
  }
}

function renderTimes() {
  const list = $("#timesList");
  list.innerHTML = "";
  PRAYER_ORDER.forEach((p) => {
    const li = document.createElement("li");
    li.className = "time-row";
    li.dataset.prayer = p;
    li.innerHTML = `
      <span class="time-name">${t(p)}</span>
      <span class="time-val">${fmtTime(state.timings[p])}</span>`;
    list.appendChild(li);
  });
  $("#hijriDate").textContent = state.hijri;
}

// next upcoming prayer (handles wrap to tomorrow's Fajr)
function getNextPrayer() {
  const now = new Date();
  for (const p of NOTIFY_PRAYERS) {
    if (state.timings[p] > now) return { name: p, time: state.timings[p] };
  }
  // all passed -> tomorrow Fajr
  const fajr = new Date(state.timings.Fajr);
  fajr.setDate(fajr.getDate() + 1);
  return { name: "Fajr", time: fajr };
}

function tick() {
  if (!state.timings) return;
  const next = getNextPrayer();
  $("#nextPrayerName").textContent = t(next.name);
  $("#nextPrayerTime").textContent = fmtTime(next.time);

  const diff = next.time - new Date();
  const hrs = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  $("#countdown").textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;

  // highlight active row
  document.querySelectorAll(".time-row").forEach((row) => {
    row.classList.toggle("next", row.dataset.prayer === next.name && diff < 24 * 3600000);
  });

  checkPrayerEntry();
}

// fire notification when a prayer time arrives
function checkPrayerEntry() {
  const now = new Date();
  const tk = todayKey();
  NOTIFY_PRAYERS.forEach((p) => {
    const t0 = state.timings[p];
    const delta = now - t0; // ms since prayer start
    if (delta >= 0 && delta < 60000 && state.notifiedToday[p] !== tk) {
      state.notifiedToday[p] = tk;
      fireNotification(p);
    }
  });
}

function fireNotification(prayer) {
  const title = `${t("notifTitle")} ${t(prayer)}`;
  const body = t("notifBody");
  if ("Notification" in window && Notification.permission === "granted") {
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then((reg) =>
        reg.showNotification(title, {
          body,
          icon: "icons/icon-192.png",
          badge: "icons/icon-192.png",
          tag: `bilal-${prayer}`,
          vibrate: [300, 100, 300, 100, 300]
        })
      );
    } else {
      new Notification(title, { body, icon: "icons/icon-192.png" });
    }
  }
  if (state.adhanSound) playAdhan(prayer);
}

function playAdhan(prayer) {
  // pause any currently playing adhan first
  ["#adhanAudio", "#adhanFajrAudio"].forEach((s) => {
    const el = $(s); if (el) { el.pause(); }
  });
  const a = prayer === "Fajr" ? $("#adhanFajrAudio") : $("#adhanAudio");
  if (!a) return;
  a.currentTime = 0;
  a.play().catch(() => {/* autoplay may be blocked until user interaction */});
}

// ---------- notifications permission ----------
async function enableNotifications() {
  if (!("Notification" in window)) return;
  const perm = await Notification.requestPermission();
  updateNotifyCard(perm);
  if (perm === "granted") {
    // unlock audio on this user gesture
    const a = $("#adhanAudio");
    a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => {});
  }
}

function updateNotifyCard(perm) {
  const btn = $("#enableNotify");
  if (perm === "granted") {
    btn.textContent = t("enabled");
    btn.disabled = true;
    $("#notifyCard").classList.add("done");
  } else {
    btn.textContent = t("enable");
    btn.disabled = false;
    $("#notifyCard").classList.remove("done");
  }
}

// ---------- calc method select ----------
function buildMethodSelect() {
  const sel = $("#methodSelect");
  sel.innerHTML = "";
  CALC_METHODS.forEach((id) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = t("m" + id);
    if (id === state.method) opt.selected = true;
    sel.appendChild(opt);
  });
}

// ---------- athkar rendering ----------
function renderAthkar(type) {
  const panel = $(`#panel-${type} .athkar-list`);
  panel.innerHTML = "";
  ATHKAR[type].forEach((z, i) => {
    const card = document.createElement("div");
    card.className = "thikr-card";
    const counterId = `cnt-${type}-${i}`;
    card.innerHTML = `
      <p class="thikr-ar" dir="rtl">${z.ar}</p>
      <p class="thikr-en" dir="ltr">${z.en}</p>
      <div class="thikr-foot">
        <span class="repeat">${t("repeatLabel")}: ${z.count} ${z.count > 1 ? t("times") : ""}</span>
        <button class="counter-btn" data-target="${counterId}" data-max="${z.count}">
          <span id="${counterId}">0</span> / ${z.count}
        </button>
      </div>`;
    panel.appendChild(card);
  });
}

function renderAllAthkar() {
  ["morning", "evening", "after"].forEach(renderAthkar);
}

// ---------- qibla compass ----------
const toRad = (d) => (d * Math.PI) / 180;
const toDeg = (r) => (r * 180) / Math.PI;

function computeQibla() {
  if (!state.coords) return;
  const φ1 = toRad(state.coords.lat), φ2 = toRad(KAABA.lat);
  const Δλ = toRad(KAABA.lon - state.coords.lon);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  state.qiblaBearing = (toDeg(Math.atan2(y, x)) + 360) % 360;

  // great-circle distance to Makkah (km)
  const a = Math.sin((φ2 - φ1) / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const dist = Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));

  $("#qiblaDeg").textContent = `${Math.round(state.qiblaBearing)}° · ${dist.toLocaleString()} ${t("km")}`;
  // place the kaaba needle at the qibla bearing within the rose
  $("#qiblaNeedle").style.transform = `rotate(${state.qiblaBearing}deg)`;
}

function handleOrientation(e) {
  let heading = null;
  if (typeof e.webkitCompassHeading === "number") {
    heading = e.webkitCompassHeading;              // iOS: degrees from north
  } else if (e.absolute && typeof e.alpha === "number") {
    heading = 360 - e.alpha;                        // others (absolute)
  } else if (typeof e.alpha === "number") {
    heading = 360 - e.alpha;
  }
  if (heading === null || state.qiblaBearing === null) return;

  // rotate the rose so North aligns with real north
  $("#compassRose").style.transform = `rotate(${-heading}deg)`;

  // are we facing qibla? (device top vs qibla bearing)
  const rel = ((state.qiblaBearing - heading + 540) % 360) - 180;
  const aligned = Math.abs(rel) < 6;
  const status = $("#qiblaStatus");
  status.textContent = aligned ? t("qiblaAligned") : t("qiblaHint");
  status.classList.toggle("aligned", aligned);
  $("#compass").classList.toggle("aligned", aligned);
}

async function enableCompass() {
  const DOE = window.DeviceOrientationEvent;
  if (!DOE) { $("#qiblaStatus").textContent = t("compassUnsupported"); return; }
  try {
    if (typeof DOE.requestPermission === "function") {  // iOS 13+
      const res = await DOE.requestPermission();
      if (res !== "granted") return;
    }
  } catch (_) { /* non-iOS */ }
  if (state.compassOn) return;
  state.compassOn = true;
  window.addEventListener("deviceorientationabsolute", handleOrientation, true);
  window.addEventListener("deviceorientation", handleOrientation, true);
  $("#enableCompass").style.display = "none";
}

// counter tap
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".counter-btn");
  if (!btn) return;
  const span = document.getElementById(btn.dataset.target);
  const max = parseInt(btn.dataset.max, 10);
  let val = parseInt(span.textContent, 10) + 1;
  if (val > max) val = 0;
  span.textContent = val;
  btn.classList.toggle("complete", val === max);
});

// ---------- tabs ----------
function activateTab(name) {
  const tab = document.querySelector(`.tab[data-tab="${name}"]`);
  if (!tab) return;
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  tab.classList.add("active");
  $(`#panel-${name}`).classList.add("active");
}
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

// ---------- events ----------
$("#langToggle").addEventListener("click", () => {
  setLang(currentLang === "ar" ? "en" : "ar");
});

$("#enableNotify").addEventListener("click", enableNotifications);
$("#refreshLocation").addEventListener("click", getLocation);

$("#methodSelect").addEventListener("change", (e) => {
  state.method = parseInt(e.target.value, 10);
  localStorage.setItem("bilal_method", state.method);
  fetchTimes();
});

$("#adhanSoundToggle").addEventListener("change", (e) => {
  state.adhanSound = e.target.checked;
  localStorage.setItem("bilal_adhan_sound", state.adhanSound);
});

$("#testAdhan").addEventListener("click", () => playAdhan());
$("#enableCompass").addEventListener("click", enableCompass);

document.addEventListener("langchange", () => {
  buildMethodSelect();
  renderAllAthkar();
  if (state.timings) { renderTimes(); tick(); }
  if (state.qiblaBearing !== null) computeQibla();
  if (state.locationName) $("#locationName").textContent = state.locationName;
  if ("Notification" in window) updateNotifyCard(Notification.permission);
});

// ---------- init ----------
function init() {
  applyTranslations();
  buildMethodSelect();
  renderAllAthkar();
  $("#adhanSoundToggle").checked = state.adhanSound;
  if ("Notification" in window) updateNotifyCard(Notification.permission);
  getLocation();
  state.timerHandle = setInterval(tick, 1000);

  // deep-link from PWA shortcuts (#qibla / #morning …)
  const hash = location.hash.replace("#", "");
  if (["times", "morning", "evening", "after", "qibla"].includes(hash)) activateTab(hash);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
