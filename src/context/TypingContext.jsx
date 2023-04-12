import { createContext, useReducer } from "react";

export const TypingContext = createContext();

const typingReducer = (state, action) => {
  switch (action.type) {
    case "SET_TYPING_TRUE":
      return {
        ...state,
        typing: true,
      };
    case "SET_TYPING_FALSE":
      return {
        ...state,
        typing: false,
      };
    case "SET_IS_TYPING_TRUE":
      return {
        ...state,
        isTyping: true,
      };
    case "SET_IS_TYPING_FALSE":
      return {
        ...state,
        isTyping: false,
      };
    default:
      return state;
  }
};

export const TypingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(typingReducer, {
    typing: false,
    isTyping: false,
  });

  return (
    <TypingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TypingContext.Provider>
  );
};
