import { useRef, useState } from 'react';
import NotificationContext from './NotificationContext';

export default function NotificationContextProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showNotification = (message, time = 0) => {
    if (!time) {
      setMessage(message);
      return;
    }
    setMessage(message);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => setMessage(null), time);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, message }}>
      {children}
    </NotificationContext.Provider>
  );
}
