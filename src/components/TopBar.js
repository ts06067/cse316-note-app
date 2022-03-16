import Button from "./Button";
import "./css/TopBar.css";

function TopBar(props) {
  return (
    <div className="topBar">
      <button onClick={props.onAdd}>add</button>
      <button onClick={props.onDelete}>delete</button>
    </div>
  );
}

export default TopBar;
