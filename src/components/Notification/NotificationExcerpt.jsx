import { useEffect } from "react";
import { endpoints } from "../../app/api/axiosClient";
import useLazyAxios from "../../hooks/useLazyAxios";
import Avatar from "../User/Avatar";
import { useDispatch } from "react-redux";
import { setChat } from "../../features/chat/chatSlice";
import useNotificationContext from "../../hooks/useNotificationContext";

const NotificationExcerpt = ({ notification }) => {
  const dispatch = useDispatch();
  const { dispatch: notificationDispatch } = useNotificationContext();

  const [fetch, { data, isSuccess }] = useLazyAxios({
    url: endpoints.chat.concat(`/${notification.chat._id}`),
    method: "get",
  });

  const handleClickNotification = async (e) => {
    await fetch();
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setChat(data));
      notificationDispatch({
        type: "CLEAR_NOTIFICATION",
        payload: notification.chat._id,
      });
    }
  }, [isSuccess, data]);

  return (
    <li
      key={notification._id}
      onClick={handleClickNotification}
      className="disable-select"
    >
      <Avatar src={notification.user.avatar} />
      <p>
        {notification.user.username} has sent a new message in{" "}
        {notification.chat.name}
      </p>
    </li>
  );
};
export default NotificationExcerpt;
