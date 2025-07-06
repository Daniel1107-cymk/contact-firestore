import { getApp } from "@react-native-firebase/app";
import {
  initializeAppCheck,
  ReactNativeFirebaseAppCheckProvider,
} from "@react-native-firebase/app-check";
import { getFirestore } from "@react-native-firebase/firestore";

// // For @react-native-firebase it initialize automatically (no need to manual initiate)
// const firebaseConfig = {
//   apiKey: "AIzaSyDQ-XTG4gkYLmHpLEG2XqkpsJ-DLE5oNQ8",
//   authDomain: "kontak-5e83a.firebaseapp.com",
//   projectId: "kontak-5e83a",
//   storageBucket: "kontak-5e83a.firebasestorage.app",
//   messagingSenderId: "63987543644",
//   appId: "1:63987543644:web:ea1b6d2a6752ae8cf90099",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const appCheckInit = async () => {
  // Cek apakah App Check sudah diinisialisasi
  const rnfbProvider = new ReactNativeFirebaseAppCheckProvider();

  // Konfigurasi provider App Check
  rnfbProvider.configure({
    android: {
      provider: __DEV__ ? "debug" : "playIntegrity",
      debugToken: "E2B5F995-DCE4-4391-B574-94223CB0E0DE",
    },
    apple: {
      provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
      debugToken: "E2B5F995-DCE4-4391-B574-94223CB0E0DE",
    },
  });

  // Inisialisasi App Check dengan provider yang telah dikonfigurasi
  const appCheck = await initializeAppCheck(getApp(), {
    provider: rnfbProvider,
    isTokenAutoRefreshEnabled: true,
  });

  // Cek apakah token berhasil didapatkan
  try {
    // `appCheckInstance` is the saved return value from initializeAppCheck
    const { token } = await appCheck.getToken(true);

    if (token.length > 0) {
      console.log("AppCheck verification passed", token);
    }
  } catch (error) {
    console.log("AppCheck verification failed");
  }
};

// Initialize Firebase
const app = getApp(); // optional if you only have one app
const firestore = getFirestore(app);

export const Db = firestore;
