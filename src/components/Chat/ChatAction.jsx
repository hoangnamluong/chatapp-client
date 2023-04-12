import { useSelector } from "react-redux";
import GroupChatActions from "../GroupChat/GroupChatActions";
import { selectChat } from "../../features/chat/chatSlice";
import ChatUsersAvatar from "../GroupChat/ChatUsersAvatar";
import "./scss/chatAction.scss";
import { useLeaveGroupMutation } from "../../features/chat/chatApiSlice";
import { toast } from "react-toastify";

const ChatAction = () => {
  const chat = useSelector(selectChat);

  const [leaveGroup] = useLeaveGroupMutation();

  const handleLeaveGroup = async (e) => {
    if (!confirm(`Do you really want to leave ${chat.name}`)) return;

    try {
      const { data } = await leaveGroup(chat._id);

      if (data) {
        toast.success("Leave Group Succeed");
      } else {
        toast.error("Leave Group Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Leave Group Failed");
    }
  };

  return (
    chat && (
      <div className="chat__actions">
        <div className="chat-actions__title">
          <ChatUsersAvatar users={chat?.users} />
          <h3>{chat?.name}</h3>
        </div>
        <div className="chat-actions__items">
          {chat?.isGroupChat && (
            <>
              <GroupChatActions chatId={chat?._id} users={chat?.users} />
              <button
                className="chat-actions__leave-group-button error-btn"
                onClick={handleLeaveGroup}
              >
                Leave Group
              </button>
            </>
          )}
        </div>
      </div>
    )
  );
};
export default ChatAction;
