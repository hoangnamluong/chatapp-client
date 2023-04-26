import CloseIcon from "@mui/icons-material/Close";
import "./scss/userSearchDrawer.scss";
import SearchInput from "./SearchInput";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import UsersList from "./UsersList";

const UserSearchDrawer = () => {
  const [query, setQuery] = useState("");

  const debounceValue = useDebounce(query, 600);

  const handleClickCloseDrawer = (e) => {
    const drawer = document.getElementById("drawer");

    drawer.classList.remove("show");
  };

  return (
    <div className="drawer" id="drawer">
      <div className="drawer__container">
        <div className="drawer__header">
          <SearchInput
            name="User"
            className="drawer__search-input"
            data={query}
            setData={setQuery}
          />
          <span onClick={handleClickCloseDrawer} className="close-icon">
            <CloseIcon />
          </span>
        </div>
        <div className="drawer__items">
          <UsersList query={debounceValue} />
        </div>
      </div>
    </div>
  );
};
export default UserSearchDrawer;
