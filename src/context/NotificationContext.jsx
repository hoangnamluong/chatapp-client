import { createContext, useReducer } from "react";

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "UNSHIFT_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };

    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (message) => message.chat._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
  });

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
