// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
 
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
 
export { firebase };