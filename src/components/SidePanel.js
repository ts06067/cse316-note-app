import "./css/SidePanel.css";
import SearchBar from "./SearchBar";
import TopBar from "./TopBar";

function SidePanel(props) {
  return (
    <div className="sidePanel">
      <TopBar items={props.items}></TopBar>
      <SearchBar></SearchBar>
      side panel
    </div>
  );
}

export default SidePanel;
