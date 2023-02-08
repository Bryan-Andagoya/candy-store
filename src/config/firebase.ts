import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBV6Pf-HxlrlKXMRxS3QkhRbW7PUsMnC-U",
  authDomain: "candy-store-1a6d6.firebaseapp.com",
  projectId: "candy-store-1a6d6",
  storageBucket: "gs://candy-store-1a6d6.appspot.com",
  messagingSenderId: "883940146392",
  appId: "1:883940146392:web:69cb958ba910a654caabad",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

export const storage = getStorage(app);
