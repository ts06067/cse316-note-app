import "./css/TopBar.css";

function TopBarRight(props) {
  return (
    <div className="topBar">
      <button>button1</button>
      <button>button2</button>
      <button onClick={props.onDelete}>delete</button>
    </div>
  );
}

export default TopBarRight;
