#!/usr/bin/env bash
# Build the Bilal Android APK locally.
#   ./tools/build-apk.sh            -> debug APK (dist/Bilal-debug.apk)
#   ./tools/build-apk.sh release    -> signed release APK (dist/Bilal-1.0.apk)
#
# Requires JDK 17 and the Android SDK (platform-34, build-tools 34.0.0).
# Set JAVA_HOME and ANDROID_HOME, or let this script fall back to ~/.bilal-build.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

: "${JAVA_HOME:=$HOME/.bilal-build/jdk-17.0.19+10}"
: "${ANDROID_HOME:=$HOME/.bilal-build/android-sdk}"
export JAVA_HOME ANDROID_HOME
export PATH="$JAVA_HOME/bin:$PATH"

echo "JAVA_HOME=$JAVA_HOME"
echo "ANDROID_HOME=$ANDROID_HOME"

[ -d node_modules ] || npm install
echo "sdk.dir=$ANDROID_HOME" > android/local.properties

# refresh the web bundle the app ships with
npm run sync:www
npx cap copy android

mkdir -p dist
MODE="${1:-debug}"

if [ "$MODE" = "release" ]; then
  ( cd android && chmod +x gradlew && ./gradlew assembleRelease --no-daemon )
  VER=$(grep -oP 'versionName "\K[^"]+' android/app/build.gradle | head -1)
  KS="dist/bilal-release.keystore"
  if [ ! -f "$KS" ]; then
    keytool -genkeypair -v -keystore "$KS" -alias bilal -keyalg RSA -keysize 2048 \
      -validity 10000 -storepass bilal12345 -keypass bilal12345 \
      -dname "CN=Bilal, O=Bilal, C=SA"
  fi
  BT="$ANDROID_HOME/build-tools/34.0.0"
  OUT="dist/Bilal-${VER}.apk"
  # gradle may emit a signed (app-release.apk) or unsigned APK depending on
  # whether android/keystore.properties is present. Either way we re-sign the
  # sideload build with bilal-release.keystore so updates install over earlier
  # sideloaded versions (same signing key).
  IN=android/app/build/outputs/apk/release/app-release.apk
  [ -f "$IN" ] || IN=android/app/build/outputs/apk/release/app-release-unsigned.apk
  "$BT/zipalign" -p -f 4 "$IN" dist/_aligned.apk
  "$BT/apksigner" sign --ks "$KS" --ks-pass pass:bilal12345 --key-pass pass:bilal12345 \
    --out "$OUT" dist/_aligned.apk
  rm -f dist/_aligned.apk "$OUT.idsig"
  "$BT/apksigner" verify "$OUT" && echo "✅ $OUT (signed)"
else
  ( cd android && chmod +x gradlew && ./gradlew assembleDebug --no-daemon )
  cp android/app/build/outputs/apk/debug/app-debug.apk dist/Bilal-debug.apk
  echo "✅ dist/Bilal-debug.apk"
fi
