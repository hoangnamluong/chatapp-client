import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import MultiSelect from "../misc/MultiSelect";
import useLazyAxios from "../../hooks/useLazyAxios";
import { endpoints } from "../../app/api/axiosClient";
import {
  useGetAllChatsQuery,
  useAddUsersToGroupMutation,
} from "../../features/chat/chatApiSlice";
import { toast } from "react-toastify";

const GroupAddUsers = ({ handleClose = null, formArg }) => {
  const { chatId } = formArg;

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [query, setQuery] = useState("");

  const debounceValue = useDebounce(query, 600);

  const { chat } = useGetAllChatsQuery("chatsList", {
    selectFromResult: ({ data }) => ({
      chat: data?.entities[chatId],
    }),
  });

  const [addUsersToGroup] = useAddUsersToGroupMutation();

  const [fetch, { data, isLoading, isSuccess, isError, error }] = useLazyAxios({
    url: endpoints.user + "/outside-group",
    method: "post",
  });

  useEffect(() => {
    if (debounceValue)
      fetch({
        kw: debounceValue,
        usersIds: chat.users,
      });
  }, [debounceValue]);

  useEffect(() => {
    if (isSuccess) {
      if (!data) {
        toast.info("No users was found");
        return;
      }

      const loadedUsers = data.map((user) => {
        const updatedUser = {
          id: user._id,
          name: user.username,
          image: user.avatar,
        };

        return updatedUser;
      });

      setUsers(loadedUsers);
    }
  }, [data, isSuccess]);

  const onChangedQuery = (e) => setQuery(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUsers.length === 0) return toast.info("No users were chosen");

    try {
      const { data } = await addUsersToGroup({
        users: selectedUsers,
        _id: chatId,
      });

      if (data) {
        toast.success("Add Succeed");
        handleClose();
      } else toast.error("Add Failed");
    } catch (err) {
      console.log(err);
      toast.error("Add Failed");
    }
  };

  return (
    <form className="group-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          name="groupName"
          value={query}
          onChange={onChangedQuery}
          placeholder="Find Users"
        />
      </div>
      <MultiSelect
        items={users}
        data={selectedUsers}
        setData={setSelectedUsers}
      />
      <button className="secondary-btn modal-btn">Add Users</button>
    </form>
  );
};
export default GroupAddUsers;
