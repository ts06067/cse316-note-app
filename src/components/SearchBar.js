import "./css/SearchBar.css";

function SearchBar(props) {
  return (
    <div className="searchBar">
      <div className="searchIcon">
        <span className="material-icons"> search </span>
      </div>
      <input
        onChange={props.onChangeSearch}
        className="searchBox"
        placeholder="Search all notes"
      ></input>
    </div>
  );
}

export default SearchBar;
