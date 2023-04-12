import { useContext } from "react";
import { TypingContext } from "../context/TypingContext";

const useTypingContext = () => {
  const context = useContext(TypingContext);

  if (!context) return;

  return context;
};
export default useTypingContext;
