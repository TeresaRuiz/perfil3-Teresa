import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, TEST } from '@env';
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID  
};
 
console.log("Valor de configuracion", firebaseConfig);
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
  console.log('Firebase initialized successfully');
} else {
  console.log('Firebase initialization failed');
}
 
const database = getFirestore(app);
if (database) {
  console.log('Firestore initialized correctly');
} else {
  console.log('Firestore initialization failed');
}
 
const storage = getStorage(app);
 
if (storage) {
  console.log('Storage initialized correctly');
} else {
  console.log('Storage ization failed');
}
 
const auth = getAuth(app); // Inicializar Auth
 
if (auth) {
  console.log('Auth initialized correctly');
} else {
  console.log('Auth initialization failed');
}
 
export { database, storage, auth };