import "./css/ProfilePage.css";
import ProfileForm from "./ProfileForm";

function ProfilePage(props) {
  return (
    <div onClick={props.onOpenProfile} className={"background"}>
      <ProfileForm
        fullSize={props.fullSize}
        profile={props.profile}
        onOpenProfile={props.onOpenProfile}
        onSaveProfile={props.onSaveProfile}
        inputProfileImage={props.inputProfileImage}
        inputProfileName={props.inputProfileName}
        inputProfileEmail={props.inputProfileEmail}
      ></ProfileForm>
    </div>
  );
}

export default ProfilePage;
