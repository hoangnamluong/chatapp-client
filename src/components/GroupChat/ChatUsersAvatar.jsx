import { useEffect, useState } from "react";
import filterLoggedUser from "../../utils/filterLoggedUser";
import Avatar from "../User/Avatar";

const ChatUsersAvatar = ({ users = [] }) => {
  const [usersInput, setUsersInput] = useState(null);

  const filter = filterLoggedUser(users);

  useEffect(() => {
    if (!filter.length) return;

    setUsersInput(filter);

    console.log(first)
  }, [users]);

  const Content = () => {
    return usersInput && usersInput.length >= 2 ? (
      <div className="multiple-avatars">
        {usersInput.slice(0, 2).map((user) => (
          <Avatar src={user.avatar} key={user._id} />
        ))}
      </div>
    ) : (
      <Avatar src={usersInput[0]?.avatar} />
    );
  };

  return usersInput ? <Content /> : <></>;
};
export default ChatUsersAvatar;
