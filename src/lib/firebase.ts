import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
