import React, { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);

    // Clear previous timeout if exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    const id = setTimeout(() => {
      setActiveNotification(null);
    }, 5000); // Adjust the duration as needed

    // Save the timeout id
    setTimeoutId(id);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
    // Clear timeout when notification is manually hidden
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
