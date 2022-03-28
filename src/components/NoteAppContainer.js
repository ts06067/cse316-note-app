import { useEffect, useState, useRef } from "react";
import axios from "axios";

//virtual React DOM
import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import ProfilePage from "./ProfilePage";

//user-defined hook for handling window size change
import useWindowDimensions from "./WindowDimensions.js";

import "./css/NoteAppContainer.css";

function NoteAppContainer() {
  //states for notelist / active note / tags for the active note
  const [notes, setNotes] = useState([]);
  const [active, setActive] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [profile, setProfile] = useState(null);

  //body, tags elements
  const text = useRef(null);
  const tagsRef = useRef(null);

  //profile input elements
  const inputProfileImage = useRef(null);
  const inputProfileName = useRef(null);
  const inputProfileEmail = useRef(null);
  const inputProfileColorScheme = useRef(null);

  //state for search
  const [search, setSearch] = useState("");

  //window width and height for mobile responsiveness
  const { width, height } = useWindowDimensions();
  //in mobile size, clicking an item in note list will get to editor mode, by toggling editMode.
  const [editMode, setEditMode] = useState(false);
  //show profile window or not
  const [showProfile, setShowProfile] = useState(false);

  //css properties for sidebar / text editor / profile popup window
  const [styleSideBar, setStyleSideBar] = useState({});
  const [styleEditor, setStyleEditor] = useState({});
  const [styleProfileWindow, setStyleProfileWindow] = useState({});

  //css property for 'back button', because the button will appear only in mobile size.
  const [styleButton, setStyleButton] = useState({});

  //handle mobile responsiveness whenever width changes.
  useEffect(() => handleProfileWindowSize(), [width]);
  useEffect(() => handleComponentVisibility(), [width]);
  useEffect(() => handleButtonVisibility(), [width]);

  //fetch notes on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/notes/")
      .then((response) => {
        let noteList = response.data;
        noteList = noteList.sort((a, b) =>
          a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
        );
        setNotes(noteList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetch user profiles on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        let userList = response.data;
        setProfile(userList[0]); //For now, just assume only one user
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //in mobile size, if there is no active note, it does not open text editor.
  useEffect(
    () => (active === undefined ? setEditMode(false) : setEditMode(true)),
    [active]
  );

  //if editMode == true, display text body and corresponding tags in the text editor.
  useEffect(
    () => (text.current.style.display = editMode ? "block" : "none"),
    [editMode]
  );
  useEffect(
    () => (tagsRef.current.style.display = editMode ? "block" : "none"),
    [editMode]
  );

  /*
    handlers for various events when window size changes,
    which includes: 
    adjusting profile window size, and
    displaying of sidebar (note list) & text editor, or any other elements, in mobile/desktop mode.
  */

  //handles profile window size (full screen / small popup)
  const handleProfileWindowSize = () => {
    let mobile = width < 500 ? true : false;

    let styleProfileWindow = {
      width: mobile ? "100vw" : "450px",
      height: mobile ? "100vh" : "auto",
      borderRadius: mobile ? "0px" : "30px",
    };

    setStyleProfileWindow(styleProfileWindow);
  };

  //handles displaying of text editor when clicked a note item, in mobile size.
  const handleShowEditor = () => {
    let mobile = width < 500 ? true : false;

    if (!mobile) {
      return;
    }

    let styleSideBar = { display: "none", flexBasis: "100vw" };
    let styleEditor = { display: "flex", flexBasis: "100vw" };

    setStyleSideBar(styleSideBar);
    setStyleEditor(styleEditor);
  };

  //handles displaying of note list when clicked a back button, in mobile size.
  const handleBackToList = () => {
    let mobile = width < 500 ? true : false;

    if (!mobile) {
      return;
    }

    let styleSideBar = { display: "flex", flexBasis: "100vw" };
    let styleEditor = { display: "none", flexBasis: "100vw" };

    setStyleSideBar(styleSideBar);
    setStyleEditor(styleEditor);
  };

  //handles visibility of back button. It will show only in mobile size.
  const handleButtonVisibility = () => {
    let mobile = width < 500 ? true : false;

    setStyleButton({ display: mobile ? "flex" : "none" });
  };

  //handles visibility of note sidebar (note list) & text editor.
  //Either sidebar or editor must show in mobile.
  //If editMode == true, it will show full-size text editor. Otherwise, it will show full-size sidebar (note list).
  const handleComponentVisibility = () => {
    let mobile = width < 500 ? true : false;

    let styleSideBar = { display: "flex", flexBasis: "300px" };
    let styleEditor = { display: "flex" };

    if (mobile && editMode) {
      styleSideBar.display = "none";
      styleSideBar.flexBasis = "100vw";
    } else if (mobile) {
      //and not edit mode
      styleEditor.display = "none";
      styleSideBar.flexBasis = "100vw";
    }

    setStyleSideBar(styleSideBar);
    setStyleEditor(styleEditor);
  };

  /*
    handlers for profile: open profile window, update profile data.
  */

  const handlerProfile = {
    //if clicked background, profile image button, or 'close (X)' button, then close the profile window.
    handleOpenProfile: (e) => {
      if (
        e.target.className === "background" ||
        e.target.className === "btnProfile" ||
        e.target.className === "btnClose" ||
        e.target.className === "btnSave"
      ) {
        setShowProfile(!showProfile);
      }
    },
    //update profile when clicking 'save' button.
    handleSaveProfile: (e) => {
      e.preventDefault(); //prevents default submit action

      profile.name = inputProfileName.current.value;
      profile.email = inputProfileEmail.current.value;
      profile.colorScheme = inputProfileColorScheme.current.value;
      //profile.image...

      axios
        .post("http://localhost:5000/users/update/" + profile._id, profile)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
  };

  /*
    handlers for tags: add / delete / drag tags of an active note.
  */

  const handlerTags = {
    handleAddTag: (tag) => {
      if (active === undefined) {
        return;
      }

      active.tags = [...active.tags, tag];

      axios
        .post("http://localhost:5000/notes/update/" + active._id, active)
        .then((res) => {
          console.log(res);
          setTags(active.tags);
        })
        .catch((err) => console.log(err));
    },
    handleDeleteTag: (i) => {
      if (active === undefined) {
        return;
      }

      active.tags.splice(i, 1);

      axios
        .post("http://localhost:5000/notes/update/" + active._id, active)
        .then((res) => {
          console.log(res);
          setTags(active.tags);
        })
        .catch((err) => console.log(err));
    },
    handleDragTag: (tag, currPos, newPos) => {
      if (active === undefined) {
        return;
      }

      active.tags.splice(currPos, 1);
      active.tags.splice(newPos, 0, tag);

      axios
        .post("http://localhost:5000/notes/update/" + active._id, active)
        .then((res) => {
          console.log(res);
          setTags(active.tags);
        })
        .catch((err) => console.log(err));
    },
  };

  /*
    handlers for notes: add / delete / edit
  */

  const handlerNotes = {
    handleAdd: (e) => {
      //post
      axios
        .post("http://localhost:5000/notes/add/", {
          text: "New Note...",
          lastUpdatedDate: new Date(Date.now()).toISOString(),
        })
        .then((res) => {
          console.log(res.data);

          //focus new note
          axios
            .get("http://localhost:5000/notes/")
            .then((response) => {
              let noteList = response.data;
              noteList = noteList.sort((a, b) =>
                a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
              );
              setNotes(noteList);
              setActive(noteList[0]);
              setTags(noteList[0].tags);

              text.current.style.display = "flex";
              text.current.focus();

              text.current.value = noteList[0].text;
            })
            .catch((error) => {
              console.log(error);
            });
        });
    },

    handleDelete: (e) => {
      if (active === undefined) {
        return;
      }

      axios
        .delete("http://localhost:5000/notes/" + active._id)
        .then((res) => {
          console.log(res.data);

          setNotes(notes.filter((note) => note._id !== active._id));

          axios
            .get("http://localhost:5000/notes/")
            .then((response) => {
              let noteList = response.data;
              noteList = noteList.sort((a, b) =>
                a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
              );
              setNotes(noteList);
              setActive(noteList.length === 0 ? undefined : noteList[0]);
              setTags(noteList.length === 0 ? undefined : noteList[0].tags);

              if (noteList.length === 0) {
                text.current.style.display = "none";
              } else {
                text.current.style.display = "flex";
                text.current.focus();
                text.current.value = noteList[0].text;
              }

              handleBackToList();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => console.log(err));
    },

    handleSelect: (e) => {
      console.log(e.target.closest(".item").dataset.noteId);
      axios
        .get(
          "http://localhost:5000/notes/" +
            e.target.closest(".item").dataset.noteId
        )
        .then((res) => {
          setActive(res.data);
          setTags(res.data.tags);
          text.current.value = res.data.text;

          handleShowEditor();

          text.current.style.display = "flex";
          text.current.focus();
        })
        .catch((err) => console.log(err));
    },

    handleEdit: (e) => {
      if (active === undefined) {
        return;
      }

      if (active.text === text.current.value) {
        return;
      }

      active.text = text.current.value;
      active.lastUpdatedDate = new Date(Date.now()).toISOString();

      axios
        .post("http://localhost:5000/notes/update/" + active._id, active)
        .then((res) => {
          console.log(res.data);

          axios
            .get("http://localhost:5000/notes/")
            .then((res) => {
              console.log(res.data);

              let noteList = res.data;
              noteList = noteList.sort((a, b) =>
                a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
              );
              setNotes(noteList);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => console.log(err));
    },
  };

  /*
    handlers for search input
  */

  const handlerSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      {showProfile && (
        <ProfilePage
          profile={profile}
          onOpenProfile={handlerProfile.handleOpenProfile}
          onSaveProfile={handlerProfile.handleSaveProfile}
          inputProfileImage={inputProfileImage}
          inputProfileName={inputProfileName}
          inputProfileEmail={inputProfileEmail}
          inputProfileColorScheme={inputProfileColorScheme}
          fullSize={styleProfileWindow}
        ></ProfilePage>
      )}
      <SidePanel
        notes={notes}
        active={active}
        search={search}
        onChangeSearch={handlerSearchInputChange}
        onAdd={handlerNotes.handleAdd}
        onSelect={handlerNotes.handleSelect}
        visible={styleSideBar}
        onOpenProfile={handlerProfile.handleOpenProfile}
        height={height}
      ></SidePanel>
      <MainPanel
        text={text}
        tags={tags}
        tagsRef={tagsRef}
        onDelete={handlerNotes.handleDelete}
        onEdit={handlerNotes.handleEdit}
        onAddTag={handlerTags.handleAddTag}
        onDeleteTag={handlerTags.handleDeleteTag}
        onDragTag={handlerTags.handleDragTag}
        onBackToList={handleBackToList}
        visible={styleEditor}
        visibleButton={styleButton}
      ></MainPanel>
    </div>
  );
}
export default NoteAppContainer;
