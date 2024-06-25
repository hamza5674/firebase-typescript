import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken, Messaging } from "firebase/messaging";

// Define the Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCaNLuJNIRBy4hweZahZmSGoUAKT0G_vM0",
  authDomain: "notification-ee16a.firebaseapp.com",
  projectId: "notification-ee16a",
  storageBucket: "notification-ee16a.appspot.com",
  messagingSenderId: "359641335419",
  appId: "1:359641335419:web:ad9e4e0277308d1bc204de",
  measurementId: "G-94K6P390Z7"
};

// Initialize the Firebase app with the provided configuration
initializeApp(firebaseConfig);

// Get the messaging instance from Firebase
const messaging: Messaging = getMessaging();

// Function to request and retrieve the FCM token
export const requestForToken = async (): Promise<string | null> => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BC4fCZ-3hChFaRkt39gF9SCtQRJc7o6R9s6n-ckIK0ROimzF_GNJx46KG9r4JF7fosXjwjgL46Mv5M0Ky6OQ-KI"
    });

    if (currentToken) {
      console.log("Token client: ", currentToken);
      return currentToken;
    } else {
      console.log("No Token Registration Available");
      return null;
    }
  } catch (err) {
    console.error("Error while registering token: ", err);
    return null;
  }
};

// Function to listen for incoming messages
export const onMessageListener = (): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      onMessage(messaging, (payload) => {
        console.log("Payload: ", payload);
        resolve(payload);
      });
    } catch (err) {
      console.error("Error receiving message: ", err);
      reject(err);
    }
  });
