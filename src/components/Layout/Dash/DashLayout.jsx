import { Outlet } from "react-router-dom";
import "./dash.scss";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <div className="dash">
      <DashHeader />
      <div className="dash__inner">
        <Outlet />
      </div>
    </div>
  );
};
export default DashLayout;
