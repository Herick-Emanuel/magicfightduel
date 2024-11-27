import React, { createContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      toast.info(`${notification.message} (Deck ID: ${notification.deckId})`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
