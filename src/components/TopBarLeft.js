import "./css/TopBar.css";
import profileImage from "../assets/defaultProfilePicture.png";

function TopBarLeft(props) {
  return (
    <div className="topBar">
      <img
        className={"btnProfile"}
        onClick={props.onOpenProfile}
        src={profileImage}
      ></img>
      <div className="title">My Notes</div>
      <button onClick={props.onAdd}>
        <span className="material-icons"> note_add </span>
      </button>
    </div>
  );
}

export default TopBarLeft;
