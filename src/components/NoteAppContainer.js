import { useEffect, useState, useRef } from "react";
import axios from "axios";

//virtual React DOM
import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import ProfilePage from "./ProfilePage";

//user-defined hook for handling window size change
import useWindowDimensions from "./WindowDimensions.js";

//css
import "./css/NoteAppContainer.css";

//utilities
import Search from "./api/Search.js";
import { useNavigate } from "react-router-dom";

function NoteAppContainer() {
  //states for notelist / active note / tags for the active note
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [active, setActive] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [profile, setProfile] = useState(null);

  //body, tags elements
  const text = useRef(null);
  const tagsRef = useRef(null);

  //search input
  const searchRef = useRef(null);

  //profile input elements
  const inputProfileImage = useRef(null);
  const inputProfileName = useRef(null);
  const inputProfileEmail = useRef(null);
  const inputProfileColorScheme = useRef(null);

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

  const navigate = useNavigate();

  //handle mobile responsiveness whenever width changes.
  useEffect(() => handleProfileWindowSize(), [width]);
  useEffect(() => handleComponentVisibility(), [width]);
  useEffect(() => handleButtonVisibility(), [width]);

  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

  //fetch notes on load
  useEffect(() => {
    api
      .get("/notes/")
      .then((res) => {
        let noteList = res.data;
        noteList = noteList.sort((a, b) =>
          a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
        );
        setNotes(noteList);
        setFilteredNotes(noteList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetch user profiles on load
  useEffect(() => {
    api
      .get("/users/")
      .then((res) => {
        let user = res.data;
        setProfile(user);
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
      const classes = Array.from(e.target.classList);
      const eventTargets = ["btnProfile", "btnClose"];
      eventTargets.forEach((target) => {
        if (classes.indexOf(target) !== -1) {
          setShowProfile(!showProfile);
          return;
        }
      });
    },
    handleBackgroundClick: (e) => {
      const classes = Array.from(e.target.classList);
      const eventTargets = ["background"];
      eventTargets.forEach((target) => {
        if (classes.indexOf(target) !== -1) {
          setShowProfile(!showProfile);
          return;
        }
      });
    },
    //update profile when clicking 'save' button.
    handleSaveProfile: async (imgFile, doDelete) => {
      //e.preventDefault(); //prevents default submit action

      const name = inputProfileName.current.value;
      const email = inputProfileEmail.current.value;
      const colorScheme = inputProfileColorScheme.current.value;

      let newProfile = { name, email, colorScheme, imgUrl: profile.imgUrl };

      if (doDelete) {
        newProfile = { ...newProfile, imgUrl: null };
      }

      if (imgFile) {
        console.log("we will save " + imgFile);

        const formData = new FormData();
        const unsignedUploadPreset = "jpxjict6"; //my Cloudinary id
        formData.append("file", imgFile);
        formData.append("upload_preset", unsignedUploadPreset);

        const cloudName = "dwp6hrsi5";
        let res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );

        const uploadedUrl = res.data.url;
        newProfile = { ...newProfile, imgUrl: uploadedUrl };

        console.log(res);
      }

      setProfile(newProfile);
      const res = await api.put("/users", newProfile);

      console.log(res);

      setShowProfile(!showProfile);
    },

    handleFileSelected: (e) => {
      console.log("New File Selected");
      if (e.target.files && e.target.files[0]) {
        // Could also do additional error checking on the file type, if we wanted
        // to only allow certain types of files.
        const selectedFile = e.target.files[0];
        return selectedFile;
      }
    },

    handleFileDeleted: async (e) => {
      console.log("File deleted");
    },

    handleLogOut: (e) => {
      e.preventDefault();

      api.post("/users/logout").then((res) => {
        console.log("Logging Out");
        navigate("/login");
      });
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

      const newTags = [...tags, tag];
      const newNote = active;
      newNote.tags = [...newTags];

      api
        .post("/notes/update/" + active._id, newNote)
        .then((res) => {
          setTags(newTags);
        })
        .catch((err) => console.log(err));
    },
    handleDeleteTag: (i) => {
      if (active === undefined) {
        return;
      }

      const newTags = [...tags];
      newTags.splice(i, 1);
      const newNote = active;
      newNote.tags = [...newTags];

      api
        .post("/notes/update/" + active._id, newNote)
        .then((res) => {
          setTags(newTags);
        })
        .catch((err) => console.log(err));
    },
    handleDragTag: (tag, currPos, newPos) => {
      if (active === undefined) {
        return;
      }

      const newTags = [...tags];
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
      const newNote = active;
      newNote.tags = [...newTags];

      api
        .post("/notes/update/" + active._id, newNote)
        .then((res) => {
          setTags(newTags);
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
      api
        .post("/notes/add/", {
          text: "New Note...",
          lastUpdatedDate: new Date(Date.now()).toISOString(),
        })
        .then((res) => {
          //focus new note
          api
            .get("/notes/")
            .then((res) => {
              searchRef.current.value = "";

              let noteList = res.data;
              noteList = noteList.sort((a, b) =>
                a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
              );
              setNotes(noteList);
              setFilteredNotes(noteList);
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

      api
        .delete("/notes/" + active._id)
        .then((res) => {
          api
            .get("/notes/")
            .then((res) => {
              const noteList = res.data;
              const filteredNoteList = Search.filterCaseInsensitive(
                noteList,
                searchRef.current.value
              );

              setNotes(noteList);
              setFilteredNotes(filteredNoteList);
              setActive(
                filteredNoteList.length === 0 ? undefined : filteredNoteList[0]
              );
              setTags(
                filteredNoteList.length === 0
                  ? undefined
                  : filteredNoteList[0].tags
              );

              if (filteredNoteList.length === 0) {
                text.current.style.display = "none";
              } else {
                text.current.style.display = "flex";
                text.current.focus();
                text.current.value = filteredNoteList[0].text;
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
      const selectedNote = filteredNotes.find(
        (note) => note._id === e.target.closest(".item").dataset.noteId
      );

      setActive(selectedNote);
      setTags(selectedNote.tags);
      text.current.value = selectedNote.text;

      handleShowEditor();

      text.current.style.display = "flex";
      text.current.focus();
    },

    handleEdit: (e) => {
      if (active === undefined) {
        return;
      }

      if (active.text === text.current.value) {
        return;
      }

      const updatedDate = new Date(Date.now()).toISOString();
      const updatedText = text.current.value;
      const noteToUpdate = active;

      //pre-save information to update. Otherwise, it will inadvertently update other selected note.
      noteToUpdate.text = updatedText;
      noteToUpdate.lastUpdatedDate = updatedDate;

      //debounced edit
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        api
          .post("/notes/update/" + noteToUpdate._id, noteToUpdate)
          .then((res) => {
            api
              .get("/notes/")
              .then((res) => {
                let noteList = res.data;
                noteList = noteList.sort((a, b) =>
                  a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
                );
                const filteredNoteList = Search.filterCaseInsensitive(
                  noteList,
                  searchRef.current.value
                );
                setNotes(noteList);
                setFilteredNotes(filteredNoteList);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => console.log(err));
      }, 1000);
    },
  };

  /*
    handlers for search input
  */

  const handlerSearch = {
    handleSearchInputChange: (e) => {
      const search = e.target.value;
      console.log("searching for : " + search);

      const filteredNoteList = Search.filterCaseInsensitive(notes, search);

      setFilteredNotes(filteredNoteList);

      if (active !== undefined && filteredNoteList.length > 0) {
        if (
          filteredNoteList.find((note) => note._id === active._id) === undefined
        ) {
          setActive(filteredNoteList[0]);
        }
      }
    },
  };

  return (
    <div className="appContainer">
      {showProfile && (
        <ProfilePage
          profile={profile}
          onBackgroundClick={handlerProfile.handleBackgroundClick}
          onOpenProfile={handlerProfile.handleOpenProfile}
          onSaveProfile={handlerProfile.handleSaveProfile}
          onFileSelect={handlerProfile.handleFileSelected}
          onFileDelete={handlerProfile.handleFileDeleted}
          onLogOut={handlerProfile.handleLogOut}
          inputProfileImage={inputProfileImage}
          inputProfileName={inputProfileName}
          inputProfileEmail={inputProfileEmail}
          inputProfileColorScheme={inputProfileColorScheme}
          fullSize={styleProfileWindow}
        ></ProfilePage>
      )}
      <SidePanel
        profile={profile}
        notes={filteredNotes}
        active={active}
        searchRef={searchRef}
        onChangeSearch={handlerSearch.handleSearchInputChange}
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
