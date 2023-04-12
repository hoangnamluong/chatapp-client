import { useEffect, useRef } from "react";
import useNotificationContext from "../../hooks/useNotificationContext";
import NotificationExcerpt from "./NotificationExcerpt";
import "./notification.scss";

const NotificationList = ({ setOpen }) => {
  const { notifications } = useNotificationContext();

  return notifications && notifications.length > 0 ? (
    <ul>
      {notifications.map((notification) => (
        <NotificationExcerpt
          notification={notification}
          key={notification._id}
        />
      ))}
    </ul>
  ) : (
    <div className="p-1 no-notification">No notifications to display</div>
  );
};
export default NotificationList;
