import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  return context;
};
export default useNotificationContext;
