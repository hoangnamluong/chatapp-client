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
import { Spinner } from "react-bootstrap";
import { REGEX } from "../../data/regex";

const {
  ACCENTED_LETTER_REGEX,
  ACCENTED_LETTER_REGEX_WITH_SPECIAL_CHARACTER,
  CONTAIN_A_SPECIAL_CHARACTER,
} = REGEX;

const LoginForm = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameNotContainsAccentedLetters = ACCENTED_LETTER_REGEX.test(
      usernameRef.current.value
    );

    const passwordNotContainsAccentedLetters =
      ACCENTED_LETTER_REGEX_WITH_SPECIAL_CHARACTER.test(
        passwordRef.current.value
      );

    if (
      !usernameNotContainsAccentedLetters ||
      !passwordNotContainsAccentedLetters
    ) {
      toast.warning("Username or Password is containing Accented Letters");
      passwordRef.current.value = "";
      return;
    }

    await login({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const spaceDisallowed = (e) => {
    if (e.code === "Space") e.preventDefault();
  };

  const specialCharacterDisallowed = (e) => {
    if (CONTAIN_A_SPECIAL_CHARACTER.test(e.key)) e.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Success");

      navigate("/dash", { replace: true });
    }
    if (isError) {
      passwordRef.current.value = "";

      toast.error("Username or password is incorrect");
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <div className="input-container">
        <PersonIcon />
        <input
          type="text"
          name="username"
          ref={usernameRef}
          onKeyDown={(e) => {
            spaceDisallowed(e);
            specialCharacterDisallowed(e);
          }}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
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
          onKeyDown={spaceDisallowed}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          required
          placeholder="Password"
        />
      </div>
      <p>Forgot Password?</p>
      <button className="primary-btn w-100" disabled={isLoading}>
        {isLoading ? (
          <Spinner style={{ width: "20px", height: "20px" }} />
        ) : (
          "SIGN IN"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
