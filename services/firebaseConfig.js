import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants'

const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.FIREBASE_API_KEY,
    authDomain: Constants.expoConfig.extra.FIREBASE_AUTHDOMAIN,
    projectId: Constants.expoConfig.extra.FIREBASE_PROYECTID,
    storageBucket: Constants.expoConfig.extra.FIREBASE_STORAGEBUCKET,
    messagingSenderId: Constants.expoConfig.extra.FIREBASE_MESSAGINGSENDERID,
    appId: Constants.expoConfig.extra.FIREBASE_APPID,
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { storage }