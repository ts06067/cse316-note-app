import "./css/SearchBar.css";

function SearchBar() {
  return (
    <div className="searchBar">
      <div className="searchIcon">
        <span class="material-icons"> search </span>
      </div>
      <input className="searchBox" placeholder="Search all notes"></input>
    </div>
  );
}

export default SearchBar;
