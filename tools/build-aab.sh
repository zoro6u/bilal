#!/usr/bin/env bash
# Build the signed Android App Bundle (.aab) for Google Play.
# Output: dist/Bilal-<versionName>.aab
#
# Requires JDK 17, the Android SDK (platform-35, build-tools 35.0.0), and a signing
# config in android/keystore.properties (see store/STORE_LISTING.md).
set -euo pipefail
cd "$(dirname "$0")/.."

: "${JAVA_HOME:=$HOME/.bilal-build/jdk-17.0.19+10}"
: "${ANDROID_HOME:=$HOME/.bilal-build/android-sdk}"
export JAVA_HOME ANDROID_HOME
export PATH="$JAVA_HOME/bin:$PATH"

[ -d node_modules ] || npm install
echo "sdk.dir=$ANDROID_HOME" > android/local.properties

npm run build:android                      # sync web assets + plugins

( cd android && chmod +x gradlew && ./gradlew bundleRelease --no-daemon )

VER=$(grep -oP 'versionName "\K[^"]+' android/app/build.gradle | head -1)
mkdir -p dist
cp android/app/build/outputs/bundle/release/app-release.aab "dist/Bilal-${VER}.aab"
echo "✅ dist/Bilal-${VER}.aab"
