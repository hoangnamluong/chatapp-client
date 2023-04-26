import LoginForm from "../../components/auth/LoginForm";
import "./auth.scss";
import Google from "../../assets/svg/google.svg";
import { Link } from "react-router-dom";
import Social from "../../assets/img/christian-wiediger-5BG-9id-A6I-unsplash.png";

const Login = () => {
  return (
    <section className="auth">
      <div className="auth-form">
        <div>
          <LoginForm />
          <p>Or</p>
          <button className="big-google-btn">
            <img src={Google} width={30} height={30} />
            &nbsp; Sign in with google
          </button>
          <button className="small-google-btn">
            <img src={Google} width={30} height={30} />
          </button>
        </div>
        <p className="text-center">
          Create an acount?&nbsp; <Link to="/signup">Signup</Link>
        </p>
      </div>
      <div className="img" style={{ backgroundImage: `url(${Social})` }}></div>
    </section>
  );
};
export default Login;
