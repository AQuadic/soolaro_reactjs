import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ_URZ7nZelpTYAJNJWj1UpwkMhh5zFho",
  authDomain: "soolaro-93486.firebaseapp.com",
  projectId: "soolaro-93486",
  storageBucket: "soolaro-93486.firebasestorage.app",
  messagingSenderId: "263228261383",
  appId: "1:263228261383:web:b2f6d15ef5b39aaeb5d6a2",
  measurementId: "G-WDHDPTR59X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firebase Cloud Messaging
let messaging: ReturnType<typeof getMessaging> | null = null;

try {
  messaging = getMessaging(app);
} catch (error) {
  console.warn("Firebase messaging not supported:", error);
}

/**
 * Request notification permission and get FCM token
 */
export const requestFcmToken = async (): Promise<string | null> => {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

/**
 * Delete FCM token
 */
export const deleteFcmToken = async (): Promise<void> => {
  if (!messaging) return;

  try {
    await deleteToken(messaging);
  } catch (error) {
    console.error("Error deleting FCM token:", error);
  }
};

export { app, messaging };
