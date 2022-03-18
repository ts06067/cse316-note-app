import "./css/TopBar.css";

function TopBarRight(props) {
  return (
    <div className="topBar">
      <button
        className="btnBack"
        style={props.visible}
        onClick={props.onBackToList}
      >
        <span className="material-icons"> arrow_back </span>
      </button>
      <button>
        <span className="material-icons"> notification_add </span>
      </button>
      <button>
        <span className="material-icons"> person_add_alt </span>
      </button>
      <button onClick={props.onDelete}>
        <span className="material-icons"> delete </span>
      </button>
    </div>
  );
}

export default TopBarRight;
