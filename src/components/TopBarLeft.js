import "./css/TopBar.css";

function TopBarLeft(props) {
  return (
    <div className="topBar">
      <button className={"btnProfile"} onClick={props.onOpenProfile}>
        profile
      </button>
      <button>logo</button>
      <button onClick={props.onAdd}>add</button>
    </div>
  );
}

export default TopBarLeft;
