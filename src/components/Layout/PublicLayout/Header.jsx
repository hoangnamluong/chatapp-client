//react router
import { Link, Outlet } from "react-router-dom";

//hooks
import { useEffect } from "react";

//css
import "./header.scss";

const navbarItemList = ["Home", "Enrollment", "News", "About"];

const Header = () => {
  useEffect(() => {
    const handleScroll = (e) => {
      const btn = document.getElementById("btn-on-scroll");

      if (window.scrollY >= 500) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarItemRender = navbarItemList.map((item) => (
    <li key={item}>
      {item === "Home" ? (
        <Link to={"/"}>{item}</Link>
      ) : (
        <Link to={`/${item.toLowerCase()}`}>{item}</Link>
      )}
    </li>
  ));

  return (
    <>
      <nav>
        <h2>Brand</h2>
        <ul>
          {navbarItemRender}
          <li>
            <Link to={`/login`}>Login</Link>
          </li>
          <button className="secondary-btn">
            <Link to="/signup">GET STARTED</Link>
          </button>
        </ul>
      </nav>

      <button className="secondary-btn btn-on-scroll" id="btn-on-scroll">
        <Link to="/signup">GET STARTED</Link>
      </button>

      <Outlet />
    </>
  );
};
export default Header;
