import "./chat.scss";
import ChatsList from "../../components/Chat/ChatsList";
import UserSearchDrawer from "../../components/User/UserSearchDrawer";
import GroupChatModal from "../../components/GroupChat/GroupChatModal";
import GroupForm from "../../components/GroupChat/GroupForm";
import ChatBox from "../../components/Chat/ChatBox";
import ChatAction from "../../components/Chat/ChatAction";

const Chat = () => {
  return (
    <>
      <UserSearchDrawer />
      <div className="chat custom-container background-gradient">
        <div className="chat__inner">
          <ChatsList />
          <ChatBox />
          <ChatAction />
        </div>
      </div>
    </>
  );
};
export default Chat;
