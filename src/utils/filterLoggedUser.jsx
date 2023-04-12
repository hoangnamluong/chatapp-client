import useAuth from "../hooks/useAuth";

const filterLoggedUser = (users) => {
  const { _id } = useAuth();

  return users.filter((user) => user._id !== _id);
};
export default filterLoggedUser;
