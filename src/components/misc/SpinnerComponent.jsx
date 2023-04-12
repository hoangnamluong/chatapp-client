import Spinner from "react-bootstrap/Spinner";
import "./misc.scss";

const SpinnerComponent = () => {
  return (
    <div className="spinner">
      <Spinner animation="grow" variant="info" />
      <p>Loading...</p>
    </div>
  );
};
export default SpinnerComponent;
