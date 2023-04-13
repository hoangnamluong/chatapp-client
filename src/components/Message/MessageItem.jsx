import Avatar from "../User/Avatar";
import useAuth from "../../hooks/useAuth";
import "./messageItem.scss";

const MessageItem = ({ message = {} }) => {
  const { username } = useAuth();

  const MessagesRender = () => {
    if (message && message.user)
      return message.user.username === username ? (
        <div className="chat-box__logged-user">
          <p>{message.content}</p>
          <Avatar src={message.user.avatar} />
        </div>
      ) : (
        <div className="chat-box__guest-user">
          <Avatar src={message.user.avatar} />
          <p>{message.content}</p>
        </div>
      );
    else return <></>;
  };

  return <MessagesRender />;
};
export default MessageItem;
