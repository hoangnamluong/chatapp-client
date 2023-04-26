import { useEffect, useRef, useState } from "react";
import {
  useGetAllChatsQuery,
  useChangeGroupNameMutation,
} from "../../features/chat/chatApiSlice";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const EditGroupChat = ({ handleClose = "", formArg }) => {
  //Hooks and Props
  const { chatId } = formArg;

  const [groupName, setGroupName] = useState("");

  //Api
  const [changeGroupName, { isSuccess, isLoading }] =
    useChangeGroupNameMutation();

  const { chat } = useGetAllChatsQuery("chatsList", {
    selectFromResult: ({ data }) => ({
      chat: data?.entities[chatId],
    }),
  });

  //Event Listeners
  const onChangedGroupName = (e) => setGroupName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await changeGroupName({ _id: chatId, name: groupName });

      if (data) {
        toast.success("Change Group Name Succeed");
        handleClose();
      } else {
        toast.error("Change Group Name Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Change Group Name Failed");
    }
  };

  return (
    <form className="group-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          name="groupName"
          value={groupName}
          onChange={onChangedGroupName}
          id="group-name-input"
          placeholder="Change your Group Name"
        />
      </div>
      <button className="secondary-btn modal-btn" disabled={isLoading}>
        {isLoading ? (
          <Spinner style={{ width: "20px", height: "20px" }} />
        ) : (
          "SAVE CHANGES"
        )}
      </button>
    </form>
  );
};

export default EditGroupChat;
