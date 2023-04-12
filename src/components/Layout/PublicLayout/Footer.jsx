import "./footer.scss";

//svg
import Facebook from "../../../assets/svg/facebook-color-svgrepo-com.svg";
import Google from "../../../assets/svg/google-color-svgrepo-com.svg";
import Youtube from "../../../assets/svg/youtube-color-svgrepo-com.svg";
import Instagram from "../../../assets/svg/instagram-2016-logo-svgrepo-com.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="footer__copy-right">
          &#169; Mot Minh T Coporation - Dung la t dum
        </div>
        <div className="footer__contact">
          <p>Contact Us</p>
          <div className="footer__contact-icon">
            <Link>
              <img src={Facebook} />
            </Link>
            <Link>
              <img src={Google} />
            </Link>
            <Link>
              <img src={Youtube} />
            </Link>
            <Link>
              <img src={Instagram} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
