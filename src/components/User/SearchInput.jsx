import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ name, className, data, setData }) => {
  const onChangedQuery = (e) => setData(e.target.value);

  return (
    <div className={className}>
      <SearchIcon />
      <input
        type="text"
        name={name?.toLowerCase()}
        placeholder={`Search ${name}`}
        value={data}
        onChange={onChangedQuery}
      />
    </div>
  );
};
export default SearchInput;
