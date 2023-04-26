import "./scss/usersList.scss";
import UserItem from "./UserItem";
import { useEffect, useRef } from "react";
import { endpoints } from "../../app/api/axiosClient";
import useAxios from "../../hooks/useLazyAxios";

const UsersList = ({ query }) => {
  const [fetch, { data: users, isLoading, isError, isSuccess, error }] =
    useAxios({
      url: endpoints["user"],
      method: "post",
      options: {},
    });

  useEffect(() => {
    if (query) {
      fetch({ kw: query });
    } else {
      fetch({ kw: "a" });
    }
  }, [query]);

  const Content = () => {
    if (isLoading) {
      return (
        <>
          <li className="user-item__bone">
            <div className="bone__avatar"></div>
            <div className="bone__content">
              <h5></h5>
              <p></p>
            </div>
          </li>
        </>
      );
    } else if (isError) {
      toast.error("Could not get Users");
      console.log(error);
      return;
    } else if (isSuccess) {
      return users.users?.length
        ? users.users.map((user) => <UserItem key={user._id} user={user} />)
        : null;
    }
  };

  return (
    <ul className="users-list">
      <Content />
    </ul>
  );
};
export default UsersList;
