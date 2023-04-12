//icon
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

//hooks
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//rtk query
import { useLoginMutation } from "../../features/auth/authApiSlice";

//scss
import "./authForm.scss";

//misc
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { toastId: "loading" });
    }
    if (isSuccess) {
      toast.dismiss("loading");
      toast.success("Login Success");
      navigate("/dash", { replace: true });
    }
    if (isError) {
      toast.dismiss("loading");
      toast.error("Username or password is incorrect");
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <div className="input-container">
        <PersonIcon />
        <input
          type="text"
          name="username"
          ref={usernameRef}
          required
          placeholder="Username"
        />
      </div>
      <div className="input-container">
        <LockIcon />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          required
          placeholder="Password"
        />
      </div>
      <p>Forgot Password?</p>
      <button className="primary-btn w-100">Sign In</button>
    </form>
  );
};

export default LoginForm;
