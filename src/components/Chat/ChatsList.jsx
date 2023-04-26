import "./scss/chatsList.scss";
import { toast } from "react-toastify";

import ChatItem from "./ChatItem";
import GroupChatModal from "../GroupChat/GroupChatModal";
import GroupForm from "../GroupChat/GroupForm";

import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { selectChat } from "../../features/chat/chatSlice";
import { useGetAllChatsQuery } from "../../features/chat/chatApiSlice";

const ChatList = () => {
  const chat = useSelector(selectChat);

  const {
    data: chats,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllChatsQuery("chatsList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const mobileScreen = useMediaQuery({ query: "(max-width: 1224px)" });
  const pcScreen = useMediaQuery({ query: "(min-width: 1224px)" });

  const Content = () => {
    if (isLoading)
      return (
        <>
          <li className="chat-item__bone">
            <div className="bone__avatar"></div>
            <div className="bone__content">
              <h5></h5>
              <p></p>
            </div>
          </li>
        </>
      );

    if (isError) {
      toast.error("Could not get Chats");
      console.log(error);
      return;
    }

    if (isSuccess) {
      const { ids } = chats;

      return ids.length
        ? ids.map((id) => <ChatItem key={id} chatId={id} />)
        : null;
    }
  };

  return (
    (pcScreen || (mobileScreen && !chat)) && (
      <div className="chat__list">
        <div className="list__title">
          <h3>My Chats</h3>
          <GroupChatModal title="Create Group Chat" Form={GroupForm}>
            <p style={{ cursor: "pointer" }}>New Group +</p>
          </GroupChatModal>
        </div>
        <div className="list__conversations">
          <ul className="chats-list">
            <Content />
          </ul>
        </div>
      </div>
    )
  );
};
export default ChatList;
