import Avatar from "../User/Avatar";
import useAuth from "../../hooks/useAuth";
import { useFetchMessagesQuery } from "../../features/message/messageApiSlice";
import "./messageItem.scss";

const MessageItem = ({ message }) => {
  const { username } = useAuth();

  const MessagesRender = () => {
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
  };

  return message ? <MessagesRender /> : <></>;
};
export default MessageItem;
