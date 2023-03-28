// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ5bnxmTyWBWu4RnT32TuEx4-idLRQuL8",
  authDomain: "open-ai-a7b7f.firebaseapp.com",
  projectId: "open-ai-a7b7f",
  storageBucket: "open-ai-a7b7f.appspot.com",
  messagingSenderId: "860962913420",
  appId: "1:860962913420:web:9cce0cece29f2aa8b0cfa9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(firebaseApp);
const db = getFirestore()
export { db ,storage ,firebaseApp};