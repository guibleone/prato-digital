// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-tKHlydaxwA-LZlULXfYTr4gCg6E2wfg",
  authDomain: "prato-digital-410117.firebaseapp.com",
  projectId: "prato-digital-410117",
  storageBucket: "prato-digital-410117.appspot.com",
  messagingSenderId: "66959080052",
  appId: "1:66959080052:web:665aaadb71edf51427ef21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);