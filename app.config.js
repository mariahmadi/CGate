import 'dotenv/config';

export default {
  "expo": {
    "name": "C Gate",
    "slug": "demo",
    "scheme": "myapp",

    "version": "1.0.8",
    "orientation": "portrait",
    "icon": "./assets/reba.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    }
    ,
    "android": {

      "package": "com.android.cRadar",
      "versionCode": 4,

      "adaptiveIcon": {
        "foregroundImage": "./assets/PNG.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      CMC_API: process.env.CMC_API,
      "eas": {
        "projectId": "04311e82-318a-4f28-91cb-dca105812f3e"
      }
    }
  }
}