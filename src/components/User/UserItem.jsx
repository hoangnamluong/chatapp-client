import { memo, useEffect } from "react";
import Avatar from "./Avatar";
import { useCreateChatMutation } from "../../features/chat/chatApiSlice";
import { toast } from "react-toastify";

const UserItem = ({ user }) => {
  const DRAWER = document.getElementById("drawer");

  const [createChat, { isLoading, isSuccess, isError, error }] =
    useCreateChatMutation();

  const handleClick = async (e) => {
    await createChat(user._id);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Accessing Chat", { toastId: "loading" });
    } else if (isSuccess) {
      toast.dismiss("loading");
      DRAWER.classList.remove("show");
      toast.success("Access Chat Succeed");
    } else if (isError) {
      toast.dismiss("loading");
      DRAWER.classList.remove("show");
      toast.error("Access Chat Failed");
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <li onClick={handleClick}>
      <Avatar src={user.avatar} />
      <div className="disable-select">
        <h5>{user.username}</h5>
        <p>{user.username.toLowerCase()}@example.com</p>
      </div>
    </li>
  );
};

const memoizedUserItem = memo(UserItem);

export default memoizedUserItem;
