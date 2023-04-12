import { toast } from "react-toastify";
import "./misc.scss";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const MultiSelect = ({ items, data, setData }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (e) => {
    e.preventDefault();

    const selectedItemId = e.target.id;
    const selectedItemName = e.target.getAttribute("data-name");

    const idExists = data.some((item) => item === selectedItemId);

    if (idExists) {
      toast.warning("User already added");
    } else {
      setSelectedItems((prev) => [
        ...prev,
        {
          id: selectedItemId,
          name: selectedItemName,
        },
      ]);
      setData((prev) => [...prev, selectedItemId]);
    }
  };

  const removeFromSelectedItems = (e) => {
    const selectedItemId = e.target.id;

    const filteredIds = data?.filter((id) => id !== selectedItemId);
    const filteredItems = selectedItems?.filter(
      (item) => item.id !== selectedItemId
    );

    setData(filteredIds);
    setSelectedItems(filteredItems);
  };

  const ItemRender = () => {
    return items?.map((item) => (
      <li
        key={item.id}
        className="item disable-select"
        onClick={handleSelectItem}
        id={item.id}
        data-name={item.name}
      >
        <div
          className="item-image"
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
        <h6>{item.name}</h6>
      </li>
    ));
  };

  const SelectedItemsRender = () => {
    return selectedItems?.map((item) => (
      <li key={item.id} onClick={removeFromSelectedItems} id={item.id}>
        {item.name} <CloseIcon />
      </li>
    ));
  };

  return (
    <>
      <ul className="selected-items">
        <SelectedItemsRender />
      </ul>
      <ul className="items-list">
        <ItemRender />
      </ul>
    </>
  );
};
export default MultiSelect;
