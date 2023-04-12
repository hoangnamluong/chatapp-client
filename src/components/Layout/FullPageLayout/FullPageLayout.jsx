import { Outlet } from "react-router-dom";

import "./fullPageLayout.scss";

const FullPageLayout = () => {
  return (
    <div className="full-page__container background-gradient">
      <div className="full-page__inner">
        <Outlet />
      </div>
    </div>
  );
};
export default FullPageLayout;
