import "./chat.scss";
import ChatsList from "../../components/Chat/ChatsList";
import UserSearchDrawer from "../../components/User/UserSearchDrawer";
import GroupChatModal from "../../components/GroupChat/GroupChatModal";
import ChatBox from "../../components/Chat/ChatBox";
import ChatAction from "../../components/Chat/ChatAction";

const Chat = () => {
  return (
    <>
      <UserSearchDrawer />
      <div className="chat custom-container background-gradient">
        <div className="chat__inner">
          <div className="chat__list">
            <div className="list__title">
              <h3>My Chats</h3>
              <GroupChatModal title="Create Group Chat" Form={GroupForm}>
                <p style={{ cursor: "pointer" }}>New Group +</p>
              </GroupChatModal>
            </div>
            <div className="list__conversations">
              <ChatsList />
            </div>
          </div>
          <ChatBox />
          <ChatAction />
        </div>
      </div>
    </>
  );
};
export default Chat;
