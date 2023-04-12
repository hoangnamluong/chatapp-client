import "./scss/groupChatActions.scss";
import EditGroupChat from "./EditGroupChat";
import GroupChatModal from "./GroupChatModal";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GroupAddUsers from "./GroupAddUsers";
import GroupRemoveUser from "./GroupRemoveUser";

const GroupChatActions = (props) => {
  const { chatId, users } = props;

  return (
    <>
      <GroupChatModal
        title="Change Group Chat Name"
        Form={EditGroupChat}
        formArg={{ chatId }}
      >
        <EditIcon />
        <p>Change Name</p>
      </GroupChatModal>
      <GroupChatModal
        title="Add Member"
        Form={GroupAddUsers}
        formArg={{ chatId }}
      >
        <PersonAddAlt1Icon />
        <p>Add Member</p>
      </GroupChatModal>
      <GroupChatModal
        title="Remove Member"
        Form={GroupRemoveUser}
        formArg={{ chatId, users }}
      >
        <PersonRemoveIcon />
        <p>Remove Member</p>
      </GroupChatModal>
    </>
  );
};
export default GroupChatActions;
