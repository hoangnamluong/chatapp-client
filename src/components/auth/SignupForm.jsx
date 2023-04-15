import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ImageIcon from "@mui/icons-material/Image";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authForm.scss";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../features/auth/authApiSlice";
import removeAccented from "../../utils/removeAccented";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { REGEX } from "../../data/regex";

const { ACCENTED_LETTER_REGEX, STRONG_PASSWORD } = REGEX;

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h2">Password Requirements:</Popover.Header>
    <Popover.Body>
      <div>Must contain a letter</div>
      <div>Must contain an uppercase letter</div>
      <div>Must contain a number</div>
      <div>Must contain a special letter</div>
      <div>At least 8 characters long</div>
    </Popover.Body>
  </Popover>
);

const SignupForm = () => {
  const navigate = useNavigate();

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const imageRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const postImage = async (file) => {
    setLoading(true);
    if (file === undefined) {
      toast.warning("Please Select an Image");
      return;
    }

    if (file.type === "image/jpeg" || file.type === "image/png") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Chatapp");
      data.append("cloud_name", "dufb4a9l1");

      await fetch("https://api.cloudinary.com/v1_1/dufb4a9l1/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
        })
        .catch((err) => {
          toast.error("Upload Image Failed");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const match =
      passwordRef.current.value === confirmPasswordRef.current.value;

    if (!match) {
      toast.warn("Confirm Password does not match! Please check again.");
      return;
    }

    const containsAccentedLetters =
      ACCENTED_LETTER_REGEX.test(usernameRef.current.value) ||
      ACCENTED_LETTER_REGEX.test(passwordRef.current.value);

    if (containsAccentedLetters) {
      toast.warning("Username or Password is containing Accented Letters");
      return;
    }

    if (!STRONG_PASSWORD.test(passwordRef.current.value)) {
      toast.info("Password does not meet the Requirements");
      return;
    }

    let body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    if (image) {
      body = {
        ...body,
        avatar: image,
      };
    }

    await signup(body);

    imageRef.current.value = "";
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const spaceDisAllowed = (e) => {
    if (e.code === "Space") e.preventDefault();
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { toastId: "loading" });
    }
    if (isSuccess) {
      toast.dismiss("loading");
      toast.success("Signup Success");
      navigate("/dash", { replace: true });
    }
    if (isError) {
      toast.dismiss("loading");
      toast.error(error.data.message);
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="input-container">
        <PersonIcon />
        <input
          type="text"
          name="username"
          ref={usernameRef}
          onKeyDown={(e) => {
            spaceDisAllowed(e);
          }}
          required
          placeholder="Username"
        />
      </div>
      <OverlayTrigger trigger="focus" placement="top-start" overlay={popover}>
        <div className="input-container">
          <LockIcon />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            onKeyDown={(e) => {
              spaceDisAllowed(e);
            }}
            required
            placeholder="Password"
          />
        </div>
      </OverlayTrigger>
      <div className="input-container">
        <LockIcon />
        <input
          type="password"
          name="confirm-password"
          ref={confirmPasswordRef}
          required
          placeholder="Confirm password"
        />
      </div>
      <div className="input-container">
        <ImageIcon />
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={imageRef}
          onChange={(e) => postImage(e.target.files[0])}
        />
      </div>
      <button disabled={loading} className="primary-btn w-100">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
