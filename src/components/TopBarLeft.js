import "./css/TopBar.css";
import defaultImg from "../assets/defaultProfilePicture.png";

function TopBarLeft(props) {
  const parseUrl = (profile) => {
    if (profile) {
      const url = profile.imgUrl;
      if (url) {
        return url;
      } else {
        return defaultImg;
      }
    }
    return defaultImg;
  };

  return (
    <div className="topBar">
      <img
        className={"btnProfile"}
        onClick={props.onOpenProfile}
        src={parseUrl(props.profile)}
        alt={"profile"}
      ></img>
      <div className="title">My Notes</div>
      <button onClick={props.onAdd}>
        <span className="material-icons"> note_add </span>
      </button>
    </div>
  );
}

export default TopBarLeft;
