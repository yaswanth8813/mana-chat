import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyBKrnUOV6FwcJCn_77-ojWufoQGCUPasAw",
  authDomain: "manachat-af04c.firebaseapp.com",
  projectId: "manachat-af04c",
  storageBucket: "manachat-af04c.appspot.com",
  messagingSenderId: "470540864574",
  appId: "1:470540864574:web:a73b2b199c8428ae86556f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(); 