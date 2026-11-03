
import { initializeApp, getApps, getApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';

import {
  getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGpeOVeCohsRsuErj-cRAPZJgqs2EOtgU",
  authDomain: "taskeasy-990ce.firebaseapp.com",
  projectId: "taskeasy-990ce",
  storageBucket: "taskeasy-990ce.firebasestorage.app",
  messagingSenderId: "492825370569",
  appId: "1:492825370569:web:56e22b779b7a1be63f9218"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
