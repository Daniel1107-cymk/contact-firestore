/*
    Membuat App Check untuk mengamankan request firestore
    Debug Token: E2B5F995-DCE4-4391-B574-94223CB0E0DE
    SHA256 Google Play Console: E7:A4:2F:B9:6B:BB:97:D8:F9:02:4D:5A:ED:1B:9F:DB:F7:72:26:AB:A2:52:28:61:6E:28:BD:25:7A:3E:B6:C8
    website1: https://medium.com/@vibhavguria07/level-up-your-app-security-implementing-firebase-app-check-in-react-native-9c7409d56504
    website2: https://rnfirebase.io/app-check/usage
*/
import { initializeAppCheck, ReactNativeFirebaseAppCheckProvider } from '@react-native-firebase/app-check'
import { getApp } from '@react-native-firebase/app';

const AppCheck = async ({ berhasil, gagal }) => {

    // Cek apakah App Check sudah diinisialisasi
    const rnfbProvider = new ReactNativeFirebaseAppCheckProvider();

    // Konfigurasi provider App Check
    rnfbProvider.configure({
        android: {
            provider: __DEV__ ? 'debug' : 'playIntegrity',
            debugToken: 'E2B5F995-DCE4-4391-B574-94223CB0E0DE'
        },
        apple: {
            provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
            debugToken: 'E2B5F995-DCE4-4391-B574-94223CB0E0DE'
        }
    })

    // Inisialisasi App Check dengan provider yang telah dikonfigurasi
    const appCheck = await initializeAppCheck(getApp(), {
        provider: rnfbProvider,
        isTokenAutoRefreshEnabled: true,
    });

    // Cek apakah token berhasil didapatkan
    try {
        const { token } = await appCheck.getToken(true);

        if (token.length > 0) {
            return { berhasil }
        }
    } catch (error) {
        return { gagal }
    }
}

export default AppCheck