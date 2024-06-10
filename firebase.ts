import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import 'firebase/auth'

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDo8rgBcusjle1tcDA8pAro36kUzvCm760",
  authDomain: "newo-d730f.firebaseapp.com",
  projectId: "newo-d730f",
  storageBucket: "newo-d730f.appspot.com",
  messagingSenderId: "178409573240",
  appId: "1:178409573240:web:79286ed2cca61c0a4dd68d",
  databaseURL: " https://newo-d730f-default-rtdb.firebaseio.com/"
});

 const app = initializeAuth(firebaseConfig, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export default app
