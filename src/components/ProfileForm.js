import "./css/ProfileForm.css";
import defaultImg from "../assets/defaultProfilePicture.png";

import { useState, useEffect } from "react";

function ProfileForm(props) {
  const [localImgFile, setLocalImgFile] = useState(null);
  const [loadedImgUrl, setLoadedImgUrl] = useState(props.profile.imgUrl);
  const [doDeleteImg, setDoDeleteImg] = useState(false);

  const handleFileSelect = (e) => {
    const file = props.onFileSelect(e);
    setLocalImgFile(file);
    setDoDeleteImg(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    props.onSaveProfile(localImgFile, doDeleteImg);
  };

  const handleFileDelete = (e) => {
    e.preventDefault();
    setLocalImgFile(null);
    setLoadedImgUrl(null);
    setDoDeleteImg(true);
  };

  function parseURL(file) {
    if (!file) {
      return loadedImgUrl || defaultImg;
    }
    return URL.createObjectURL(file);
  }

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
            src={parseURL(localImgFile)}
            alt="profile"
          ></img>
          <input
            onChange={handleFileSelect}
            type={"file"}
            name="image"
            accept="image/*"
            id="imgFile"
          ></input>
          <label className="imgSelectButton" htmlFor={"imgFile"}>
            Add New Image
          </label>
          <button onClick={handleFileDelete}>Delete Image</button>
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
          <button className={"btnSave"} onClick={handleSave}>
            Save
          </button>
          <button onClick={props.onLogOut}>Logout</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
