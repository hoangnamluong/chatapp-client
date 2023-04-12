import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//redux
import { useRefreshMutation } from "../../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../features/auth/authSlice";
import { useState } from "react";

//components
import SpinnerComponent from "../misc/SpinnerComponent";

const PersistsLogin = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isSuccess, isError, isUninitialized }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const refreshToken = async () => {
        try {
          await refresh();

          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!accessToken) refreshToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, [accessToken]);

  let content;
  if (isLoading) {
    content = <SpinnerComponent />;
  } else if (isError) {
    toast.error("Oops, something's wrong. Please login again");
    navigate("/", { replace: true });
    content = <>error</>;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (accessToken && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistsLogin;
