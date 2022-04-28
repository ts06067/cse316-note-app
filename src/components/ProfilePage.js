import "./css/ProfilePage.css";
import ProfileForm from "./ProfileForm";

function ProfilePage(props) {
  return (
    <div onMouseDown={props.onBackgroundClick} className={"background"}>
      <ProfileForm
        fullSize={props.fullSize}
        profile={props.profile}
        onOpenProfile={props.onOpenProfile}
        onSaveProfile={props.onSaveProfile}
        onLogOut={props.onLogOut}
        inputProfileImage={props.inputProfileImage}
        inputProfileName={props.inputProfileName}
        inputProfileEmail={props.inputProfileEmail}
        inputProfileColorScheme={props.inputProfileColorScheme}
      ></ProfileForm>
    </div>
  );
}

export default ProfilePage;
