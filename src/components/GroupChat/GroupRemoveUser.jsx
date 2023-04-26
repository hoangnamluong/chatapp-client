import "./scss/groupRemoveUser.scss";
import Avatar from "../User/Avatar";
import filterLoggedUser from "../../utils/filterLoggedUser";
import CloseIcon from "@mui/icons-material/Close";
import { useRemoveUserFromGroupMutation } from "../../features/chat/chatApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const GroupRemoveUser = ({ handleClose = null, formArg }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const { chatId, users } = formArg;

  const [removeUserFromGroup, { isLoading }] = useRemoveUserFromGroupMutation();

  const filteredUsers = filterLoggedUser(users);

  const handleChecked = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      const itemExists = selectedItems.some((item) => item === value);

      if (!itemExists) {
        setSelectedItems((prev) => [...prev, value]);
      }
    } else {
      const filteredItem = selectedItems.filter((item) => item !== value);
      setSelectedItems(filteredItem);
    }
  };

  const handleRemoveUser = async (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) return toast.info("No members were chosen");

    const confirmation = confirm(
      "Are you sure you wans to Remove these Members"
    );

    if (!confirmation) return;

    try {
      const { data } = await removeUserFromGroup({
        _id: chatId,
        usersIds: selectedItems,
      });

      if (data) {
        toast.success("Remove Succeed");
        handleClose();
      } else toast.error("Remove Failed");
    } catch (err) {
      console.log(err);
      toast.error("Remove Failed");
    }
  };

  return (
    <>
      <div className="remove-user__list">
        {filteredUsers.map((user) => (
          <div className="remove-user__item" key={user._id}>
            <input
              type="checkbox"
              value={user._id}
              id={user._id}
              onChange={handleChecked}
            />
            <label htmlFor={user._id}>
              <Avatar src={user.avatar} />
              <p className="disable-select">{user.username}</p>
              <CloseIcon />
            </label>
          </div>
        ))}
      </div>
      {users.length === 1 && <p>No members left in this group</p>}
      <button
        className="secondary-btn modal-btn mt-3"
        disabled={isLoading}
        onClick={handleRemoveUser}
      >
        {isLoading ? (
          <Spinner style={{ width: "20px", height: "20px" }} />
        ) : (
          "SAVE CHANGES"
        )}
      </button>
    </>
  );
};
export default GroupRemoveUser;
