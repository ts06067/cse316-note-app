import "./css/TopBar.css";

function TopBarRight(props) {
  return (
    <div className="topBar">
      <button style={props.visible} onClick={props.onBackToList}>
        <span class="material-icons"> arrow_back </span>
      </button>
      <button>
        <span class="material-icons"> notification_add </span>
      </button>
      <button>
        <span class="material-icons"> person_add_alt </span>
      </button>
      <button onClick={props.onDelete}>
        <span class="material-icons"> delete </span>
      </button>
    </div>
  );
}

export default TopBarRight;
