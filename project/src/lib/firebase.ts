import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAye8yK2v_SSz7-cMKJ4QQiay197qGBD5I",
  authDomain: "vehiclemanagentsystem.firebaseapp.com",
  projectId: "vehiclemanagentsystem",
  storageBucket: "vehiclemanagentsystem.firebasestorage.app",
  messagingSenderId: "598889012071",
  appId: "1:598889012071:web:866fe12100584db1556dc2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);