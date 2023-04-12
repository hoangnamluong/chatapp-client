import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { useEffect, memo } from "react";

let Logout = ({ ...args }) => {
  const navigate = useNavigate();

  const [logout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout success!");
      navigate("/", { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleClick = async (e) => {
    await logout();
  };

  return (
    <button onClick={handleClick} {...args}>
      <LogoutIcon /> Logout
    </button>
  );
};

Logout = memo(Logout);

export default Logout;
