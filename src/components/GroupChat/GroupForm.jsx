import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useLazyAxios from "../../hooks/useLazyAxios";
import { endpoints } from "../../app/api/axiosClient";
import MultiSelect from "../misc/MultiSelect";
import "./scss/groupForm.scss";
import { toast } from "react-toastify";
import { useCreateGroupChatMutation } from "../../features/chat/chatApiSlice";

const GroupForm = ({ handleClose = null }) => {
  const [groupName, setGroupName] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [query, setQuery] = useState("");

  const debouncedValue = useDebounce(query, 600);

  const [fetch, { data, isLoading, isSuccess, isError, error }] = useLazyAxios({
    url: endpoints.user,
    method: "post",
  });

  const [
    createGroupChat,
    {
      isLoading: createGroupIsLoading,
      isSuccess: createGroupIsSuccess,
      isError: createGroupIsError,
      error: createGroupError,
    },
  ] = useCreateGroupChatMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUsers.length < 2) {
      toast.warning("2 Users are Required to Create a Group");
    }

    if (groupName && selectedUsers.length >= 2) {
      await createGroupChat({ name: groupName, users: selectedUsers });
    }
  };

  const onChangedQuery = (e) => setQuery(e.target.value);
  const onChangedGroupName = (e) => setGroupName(e.target.value);

  useEffect(() => {
    if (debouncedValue) fetch({ kw: debouncedValue });
  }, [debouncedValue]);

  useEffect(() => {
    if (isSuccess) {
      if (!data.users) {
        toast.info("No users was found");
        return;
      }

      const loadedUsers = data.users.map((user) => {
        const updatedUser = {
          id: user._id,
          name: user.username,
          image: user.avatar,
        };

        return updatedUser;
      });

      setUsers(loadedUsers);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (createGroupIsLoading) {
      toast.loading("Creating Group Chat", { toastId: "loading" });
    } else if (createGroupIsSuccess) {
      toast.dismiss("loading");
      toast.success("Create Group Chat Succeed");

      handleClose();

      setGroupName("");
      setQuery("");
      setUsers([]);
      setSelectedUsers([]);
    } else if (createGroupIsError) {
      toast.dismiss("loading");
      toast.error("Create Group Chat Failed");

      setGroupName("");
      setQuery("");
      setUsers([]);
      setSelectedUsers([]);
    }
  }, [createGroupIsLoading, createGroupIsSuccess, createGroupError]);

  return (
    <form className="group-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          name="groupName"
          value={groupName}
          id="group-name-input"
          onChange={onChangedGroupName}
          placeholder="Name your Group"
          required
        />
      </div>
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
      <button className="secondary-btn modal-btn">Create Chat</button>
    </form>
  );
};
export default GroupForm;
