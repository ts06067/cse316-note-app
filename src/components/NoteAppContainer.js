import { useEffect, useState, useRef } from "react";
import axios from "axios";

//virtual DOM
import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import TagUtils from "../api/TagUtils";
import ProfilePage from "./ProfilePage";

//apis: note and profile storages
import NoteStorageUtils from "../api/NoteStorageUtils";
import ProfileStorageUtils from "../api/ProfileStorageUtils";

//user-defined hook for handling window size change
import useWindowDimensions from "./WindowDimensions.js";

import "./css/NoteAppContainer.css";
import { response } from "express";

function NoteAppContainer() {
  //states for notelist / active note / tags for the active note
  const [notes, setNotes] = useState([]);
  const [active, setActive] = useState(undefined);
  const [tags, setTags] = useState([]);

  //body, tags elements
  const text = useRef(null);
  const tagsRef = useRef(null);

  //profile input elements
  const inputProfileImage = useRef(null);
  const inputProfileName = useRef(null);
  const inputProfileEmail = useRef(null);
  const inputProfileColorScheme = useRef(null);

  //window width and height for mobile responsiveness
  const { width, height } = useWindowDimensions();
  //in mobile size, clicking an item in note list will get to editor mode, by toggling editMode.
  const [editMode, setEditMode] = useState(false);

  //states for profile page
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(ProfileStorageUtils.getProfile());

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

  useEffect(() => {
    //hook version of ComponentDidMount
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

  useEffect(() => {
    console.log(notes);
  });

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
        e.target.className === "btnClose"
      ) {
        setShowProfile(!showProfile);
      }
    },
    //update profile when clicking 'save' button.
    handleSaveProfile: (e) => {
      e.preventDefault(); //prevents default submit action

      let newProfile = {
        image: "url",

        name: inputProfileName.current.value,
        email: inputProfileEmail.current.value,
        colorScheme: inputProfileColorScheme.current.value,
      };

      ProfileStorageUtils.setProfile(newProfile);
      setProfile(ProfileStorageUtils.getProfile());
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
      let selectedNote = NoteStorageUtils.getNoteById(active.id); //we are editing tags for a selected note

      TagUtils.addTag(selectedNote, tag); //add tags in note database
      setNotes(NoteStorageUtils.getNoteList()); //update note database with some editted tags

      selectedNote = NoteStorageUtils.getNoteById(active.id); //now selectedNote is old, so get the same note again.

      setTags(TagUtils.getTags(selectedNote));
    },
    handleDeleteTag: (i) => {
      if (active === undefined) {
        return;
      }

      let selectedNote = NoteStorageUtils.getNoteById(active.id);

      TagUtils.deleteTag(selectedNote, i);
      setNotes(NoteStorageUtils.getNoteList());

      selectedNote = NoteStorageUtils.getNoteById(active.id);

      setTags(TagUtils.getTags(selectedNote));
    },
    handleDragTag: (tag, currPos, newPos) => {
      if (active === undefined) {
        return;
      }

      let selectedNote = NoteStorageUtils.getNoteById(active.id);

      TagUtils.dragTag(selectedNote, tag, currPos, newPos);
      setNotes(NoteStorageUtils.getNoteList());

      selectedNote = NoteStorageUtils.getNoteById(active.id);

      setTags(TagUtils.getTags(selectedNote));
    },
  };

  /*
    handlers for notes: add / delete / edit
  */

  const handlers = {
    handleAdd: (e) => {
      axios
        .post("http://localhost:5000/notes/add/", {
          text: "New Note...",
          lastUpdatedDate: new Date(Date.now()).toISOString(),
        })
        .then((res) => {
          console.log(res.data);

          text.current.style.display = "flex";
          text.current.focus();

          setActive(notes[0]);
          setTags(notes[0].tags);
          text.current.value = notes[0].text;
        });
    },

    handleDelete: (e) => {
      if (active === undefined) {
        return;
      }

      NoteStorageUtils.delNote(active);
      setNotes(NoteStorageUtils.getNoteList());

      if (NoteStorageUtils.isEmpty()) {
        //if empty, disable textearea and deactivate selected note. otherwise, focus textarea.
        setActive(undefined);
        setTags(TagUtils.getTags(active));
        text.current.style.display = "none";
        handleBackToList();
        return;
      }

      text.current.focus();

      //automatically activate the first note
      setActive(NoteStorageUtils.getFirstNote());
      text.current.value = NoteStorageUtils.getFirstNote().text;
      setTags(NoteStorageUtils.getFirstNote().tags);

      handleBackToList(); //this will get back to note list after deleting, only in mobile size.
    },

    handleSelect: (e) => {
      const selectedNote = NoteStorageUtils.getNoteById(
        e.target.closest(".item").dataset.noteId //to prevent selecting error when clicking child element, find closest parent
      );
      setActive(selectedNote);
      //putting active instead of selectedNote will lead to an weird behavior (active note was not properly updated)
      text.current.value = selectedNote.text;
      setTags(TagUtils.getTags(selectedNote));

      handleShowEditor();

      text.current.style.display = "flex";
      text.current.focus();
    },

    handleEdit: (e) => {
      if (active === undefined) {
        return;
      }

      const edittedNote = active;

      if (edittedNote.text !== text.current.value) {
        edittedNote.text = text.current.value;
        edittedNote.lastUpdatedDate = Date.now();

        NoteStorageUtils.updateNote(edittedNote, text.current.value);
        setNotes(NoteStorageUtils.getNoteList());
      }
    },
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
        onAdd={handlers.handleAdd}
        onSelect={handlers.handleSelect}
        visible={styleSideBar}
        onOpenProfile={handlerProfile.handleOpenProfile}
        height={height}
      ></SidePanel>
      <MainPanel
        text={text}
        tags={tags}
        tagsRef={tagsRef}
        onDelete={handlers.handleDelete}
        onEdit={handlers.handleEdit}
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
