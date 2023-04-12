import { useGetAllChatsQuery } from "../../features/chat/chatApiSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "../../features/chat/chatSlice";
import ChatUsersAvatar from "../GroupChat/ChatUsersAvatar";

const ChatItem = ({ chatId }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { chat } = useGetAllChatsQuery("chatsList", {
    selectFromResult: ({ data }) => ({
      chat: data?.entities[chatId],
    }),
  });

  const { _id, users, latest, name, isGroupChat } = chat;

  const handleChatClick = (e) => {
    dispatch(setChat(chat));
  };

  const handleClickOpen = (e) => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className="chats-item">
      <div className="chats-item__inner" onClick={handleChatClick}>
        <ChatUsersAvatar users={users} />
        <div className="disable-select">
          <h5>{name}</h5>
          <p>{latest ? latest.content : "No latest Message"}</p>
        </div>
      </div>
    </li>
  );
};

const memoizedChat = memo(ChatItem);

export default memoizedChat;
