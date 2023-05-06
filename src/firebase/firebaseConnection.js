import { initializeApp } from "firebase/";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc05jU0uvrBRrEDCJHIGhiDk14l1l6DSM",
  authDomain: "project01-4b835.firebaseapp.com",
  projectId: "project01-4b835",
  storageBucket: "project01-4b835.appspot.com",
  messagingSenderId: "480483398644",
  appId: "1:480483398644:web:680b954630b54df3bbdfa1",
  measurementId: "G-T588D0L2EB",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
