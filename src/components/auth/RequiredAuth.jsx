import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

const RequiredAuth = () => {
  const { _id } = useAuth();
  const runOnce = useRef(false);

  useEffect(() => {
    if (runOnce.current) return;

    if (!_id) {
      toast.warning("Require Login");
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  return _id ? <Outlet /> : <Navigate to="/" replace={true} />;
};
export default RequiredAuth;
