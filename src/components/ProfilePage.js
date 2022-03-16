import "./css/ProfilePage.css";

function ProfilePage(props) {
  return (
    <div onClick={props.onOpenProfile} className={"background"}>
      profile
    </div>
  );
}

export default ProfilePage;
