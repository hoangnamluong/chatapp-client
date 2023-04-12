import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SignupForm from "../../components/auth/SignupForm";
import SignUpPic from "../../assets/img/brooke-cagle--uHVRvDr7pg-unsplash.png";

const Signup = () => {
  return (
    <section className="auth">
      <div
        className="img signup-img"
        style={{ backgroundImage: `url(${SignUpPic})` }}
      ></div>
      <div className="auth-form">
        <div>
          <SignupForm />
        </div>
        <p className="text-center">
          Already have an account?&nbsp; <Link to="/">Sign in</Link>
        </p>
      </div>
    </section>
  );
};
export default Signup;
