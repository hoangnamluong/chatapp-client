import "./scss/chatsList.scss";
import { toast } from "react-toastify";
import { useGetAllChatsQuery } from "../../features/chat/chatApiSlice";

import ChatItem from "./ChatItem";

const ChatList = () => {
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
    <ul className="chats-list">
      <Content />
    </ul>
  );
};
export default ChatList;
