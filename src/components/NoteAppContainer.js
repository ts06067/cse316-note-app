import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import NoteStorageUtils from "../api/NoteStorageUtils";

import "./css/NoteAppContainer.css";
import { useEffect, useState, useRef } from "react";
import TagUtils from "../api/TagUtils";
import ProfilePage from "./ProfilePage";
import ProfileStorageUtils from "../api/ProfileStorageUtils";

import useWindowDimensions from "./WindowDimensions.js";

function NoteAppContainer() {
  //states for notes
  const [notes, setNotes] = useState(NoteStorageUtils.getNoteList());
  const [active, setActive] = useState(undefined);
  const [tags, setTags] = useState(TagUtils.getTags(active));

  const body = useRef(null);
  const tagsRef = useRef(null);

  const { width, height } = useWindowDimensions();

  const [editMode, setEditMode] = useState(false);

  const [styleSideBar, setStyleSideBar] = useState({});
  const [styleEditor, setStyleEditor] = useState({});
  const [styleProfileWindow, setStyleProfileWindow] = useState({});

  const [styleButton, setStyleButton] = useState({});
  //states for profile page
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(ProfileStorageUtils.getProfile());

  //profile inputs
  const inputProfileImage = useRef(null);
  const inputProfileName = useRef(null);
  const inputProfileEmail = useRef(null);
  const inputProfileColorScheme = useRef(null);

  //
  //  handlers for Profile
  //

  useEffect(() => handleProfileWindowSize(), [width]);

  useEffect(() => handleComponentVisibility(), [width]);

  useEffect(() => handleButtonVisibility(), [width]);

  useEffect(
    () => (active === undefined ? setEditMode(false) : setEditMode(true)),
    [active]
  );

  useEffect(
    () => (body.current.style.display = editMode ? "block" : "none"),
    [editMode]
  );

  useEffect(
    () => (tagsRef.current.style.display = editMode ? "block" : "none"),
    [editMode]
  );

  //
  //  handlers for Window Action
  //

  const handleProfileWindowSize = () => {
    let mobile = width < 500 ? true : false;

    let styleProfileWindow = {
      width: mobile ? "100vw" : "450px",
      height: mobile ? "100vh" : "auto",
    };

    setStyleProfileWindow(styleProfileWindow);
  };

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

  const handleButtonVisibility = () => {
    let mobile = width < 500 ? true : false;

    setStyleButton({ display: mobile ? "flex" : "none" });
  };

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

  //
  //  handlers for Windows Visibility
  //

  const handlerProfile = {
    handleOpenProfile: (e) => {
      if (
        e.target.className === "background" ||
        e.target.className === "btnProfile" ||
        e.target.className === "btnClose"
      ) {
        setShowProfile(!showProfile);
      }
    },
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

  //
  //  handlers for Tags
  //

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

  //
  //  handlers for Notes
  //

  const handlers = {
    handleAdd: (e) => {
      //init new note
      const newNote = {
        id: Math.floor(Math.random() * 10000),
        body: "New Note...",
        date: Date.now(),
      };

      //enable textarea
      body.current.style.display = "flex";
      body.current.focus();

      //add the note to storage, then update the storage
      NoteStorageUtils.addNote(newNote);
      setNotes(NoteStorageUtils.getNoteList());

      //auto select
      setActive(NoteStorageUtils.getLastNote());
      body.current.value = NoteStorageUtils.getLastNote().body;
      setTags(NoteStorageUtils.getLastNote().tags);
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
        body.current.style.display = "none";
        handleBackToList();
        return;
      }

      body.current.focus();

      //auto select
      setActive(NoteStorageUtils.getFirstNote());
      body.current.value = NoteStorageUtils.getFirstNote().body;
      setTags(NoteStorageUtils.getFirstNote().tags);

      handleBackToList();
    },

    handleSelect: (e) => {
      const selectedNote = NoteStorageUtils.getNoteById(
        e.target.closest(".item").dataset.noteId //to prevent selecting error when clicking child element, find closest parent
      );
      setActive(selectedNote);
      //putting active instead of selectedNote will lead to an weird behavior
      body.current.value = selectedNote.body;
      setTags(TagUtils.getTags(selectedNote));

      handleShowEditor();

      body.current.style.display = "flex";
      body.current.focus();
    },

    handleEdit: (e) => {
      if (active === undefined) {
        return;
      }

      const edittedNote = active;

      if (edittedNote.body !== body.current.value) {
        edittedNote.body = body.current.value;
        edittedNote.date = Date.now();

        NoteStorageUtils.updateNote(edittedNote, body.current.value);
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
        body={body}
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
