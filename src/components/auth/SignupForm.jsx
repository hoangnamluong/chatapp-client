import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ImageIcon from "@mui/icons-material/Image";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authForm.scss";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../features/auth/authApiSlice";

const SignupForm = () => {
  const navigate = useNavigate();

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

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

    await signup({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      avatar: image,
    });

    usernameRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
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
      toast.error("Signup failed");
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
          required
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
