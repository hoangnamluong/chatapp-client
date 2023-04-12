import jwtDecode from "jwt-decode";
import { selectAccessToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector(selectAccessToken);
  let isAdmin = false;
  let status = "USER";

  if (token) {
    const decoded = jwtDecode(token);
    const { _id, username, roles, avatar } = decoded;

    isAdmin = roles.includes("ADMIN");

    if (isAdmin) status = "ADMIN";

    return { username, roles, status, isAdmin, avatar, _id };
  }

  return { username: "", roles: [], isAdmin, status };
};

export default useAuth;
