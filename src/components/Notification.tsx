import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from '../firebase';

// Define the shape of the notification state
interface Notification {
  title: string;
  body: string;
}

const Notification: React.FC = () => {
  // Use state with a defined type
  const [notification, setNotification] = useState<Notification | null>(null);

  // Display toast notification
  const notify = () => toast(<ToastDisplay />);

  // Component to display inside the toast
  const ToastDisplay: React.FC = () => {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  // Use effect to trigger the toast notification when state changes
  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  // Request FCM token on component mount
  useEffect(() => {
    requestForToken()
      .then(token => {
        if (token) {
          console.log("Token received:", token);
          // You can save the token to your server or local storage here
        }
      })
      .catch(err => console.log("Token request failed:", err));

    // Set up message listener
    onMessageListener()
      .then((payload: any) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body
        });
      })
      .catch(err => console.log('Failed to receive message:', err));
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Toaster />
      {/* {notification && notification.title && (
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '10px' }}>
          <h4>Notification</h4>
          <p><strong>{notification.title}</strong></p>
          <p>{notification.body}</p>
        </div>
      )} */}
    </>
  );
};

export default Notification;
