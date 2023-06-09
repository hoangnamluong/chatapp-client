import "./scss/chatAction.scss";

import GroupChatActions from "../GroupChat/GroupChatActions";
import ChatUsersAvatar from "../GroupChat/ChatUsersAvatar";
import Avatar from "../User/Avatar";

import BackIcon from "../../assets/svg/back.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  selectChat,
  selectIsOpen,
  toggleAction,
} from "../../features/chat/chatSlice";
import { useLeaveGroupMutation } from "../../features/chat/chatApiSlice";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const ChatAction = () => {
  const dispatch = useDispatch();

  const chat = useSelector(selectChat);
  const isOpen = useSelector(selectIsOpen);

  const [leaveGroup, { isLoading }] = useLeaveGroupMutation();

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

  const handleRemoveSelectedChat = () => {
    dispatch(toggleAction());
  };

  return (
    isOpen &&
    chat && (
      <div className="chat__actions">
        <div className="chat-actions__title">
          <img
            src={BackIcon}
            width={30}
            height={30}
            onClick={handleRemoveSelectedChat}
            className="position-absolute start-0 cursor-pointer"
          />
          {chat.users.length > 1 && <ChatUsersAvatar users={chat.users} />}
          {chat.admin && chat.users.length === 1 && (
            <Avatar src={chat.admin.avatar} />
          )}
          <h3>{chat?.name}</h3>
        </div>
        <div className="chat-actions__items">
          {chat?.isGroupChat && (
            <>
              <GroupChatActions chatId={chat?._id} users={chat?.users} />
              <button
                className="chat-actions__leave-group-button error-btn"
                onClick={handleLeaveGroup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Leave Group"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    )
  );
};
export default ChatAction;
