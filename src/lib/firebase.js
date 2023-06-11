import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAO9Bp7GI2bcartbQkni6eAACHYLHAgm3w",
  authDomain: "social-media-app-8f2cf.firebaseapp.com",
  projectId: "social-media-app-8f2cf",
  storageBucket: "social-media-app-8f2cf.appspot.com",
  messagingSenderId: "748979115111",
  appId: "1:748979115111:web:c367790087af42355570c2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
