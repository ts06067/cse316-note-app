import "./css/ProfileForm.css";

function ProfileForm(props) {
  /*
    <input
        ref={props.inputProfileImage}
        defaultValue={props.profile.image}
      ></input>
    */
  return (
    <div style={props.fullSize} className="formWrapper">
      <div className="formTitle">
        <h2>Edit Profile</h2>
        <button
          className="btnClose material-icons"
          onClick={props.onOpenProfile}
        >
          close
        </button>
      </div>
      <form className="form">
        <div className="input imageBox">
          <img
            className="imgProfile"
            src={require("../assets/defaultProfilePicture.png")}
            alt="profile"
          ></img>

          <button disabled={true}>Add New Image</button>
          <button disabled={true}>Delete Image</button>
        </div>

        <label htmlFor="userName">Name</label>
        <input
          className="input"
          ref={props.inputProfileName}
          defaultValue={props.profile.name}
          name={"userName"}
        ></input>

        <label htmlFor="userEmail">Email</label>
        <input
          className="input"
          ref={props.inputProfileEmail}
          defaultValue={props.profile.email}
          name={"userEmail"}
        ></input>

        <label htmlFor="userColorScheme">Color Scheme</label>
        <select
          className="input"
          ref={props.inputProfileColorScheme}
          defaultValue={props.profile.colorScheme}
          name="colorScheme"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <div className="buttonArea" onClick={props.onOpenProfile}>
          <button className={"btnSave"} onClick={props.onSaveProfile}>
            Save
          </button>
          <button onClick={props.onLogOut}>Logout</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
