//icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

//hooks
import useAuth from "../../../hooks/useAuth";
import useNotificationContext from "../../../hooks/useNotificationContext";

//pics
import Logout from "../../misc/Logout";
import { useEffect, useState } from "react";
import Avatar from "../../User/Avatar";
import NotificationList from "../../Notification/NotificationList";

const DashHeader = () => {
  const { notifications } = useNotificationContext();

  const { username, avatar } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleClick = (e) => {
    setIsOpen((prev) => !prev);
  };

  const handleNotificationsClick = (e) => {
    setNotificationsOpen((prev) => !prev);
  };

  const handleClickOpenDrawer = (e) => {
    const drawer = document.getElementById("drawer");

    drawer.classList.add("show");
  };

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <div className="dash__header">
      <div className="header__inner">
        <button className="secondary-btn" onClick={handleClickOpenDrawer}>
          <SearchIcon /> Search For a Friend
        </button>
        <div className="header__items">
          <h1>Chat App</h1>
        </div>
        <div className="header__user-info">
          <div className="header__notification">
            <span onClick={handleNotificationsClick}>
              <NotificationsIcon />
            </span>
            {notifications.length > 0 ? (
              <p className="notification__count">{notifications.length}</p>
            ) : (
              ""
            )}
            {notificationsOpen && (
              <div className="notification__list">
                <NotificationList setOpen={setNotificationsOpen} />
              </div>
            )}
          </div>
          <div className="header__user-detail" onClick={handleClick}>
            <Avatar src={avatar} />
            <ArrowDropDownIcon />
          </div>
          {isOpen && <Logout className="header__sub-item" />}
        </div>
      </div>
    </div>
  );
};
export default DashHeader;
