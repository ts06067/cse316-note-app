import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import NoteStorageUtils from "../api/NoteStorageUtils";

import "./css/NoteAppContainer.css";
import { useEffect, useState } from "react";
import TagUtils from "../api/TagUtils";

import useWindowDimensions from "./WindowDimensions.js";

function NoteAppContainer() {
  //states
  const [notes, setNotes] = useState(NoteStorageUtils.getNoteList());
  const [active, setActive] = useState(undefined);
  const [body, setBody] = useState("");
  const [tags, setTags] = useState(TagUtils.getTags(active));

  const { width, height } = useWindowDimensions();

  const [editMode, setEditMode] = useState(false);

  const [styleSideBar, setStyleSideBar] = useState({});
  const [styleEditor, setStyleEditor] = useState({});

  const [styleButton, setStyleButton] = useState({});

  //handlers
  const handleChange = (e) => {
    setBody(e.target.value);
  };

  useEffect(() => handleComponentVisibility(), [width]);

  useEffect(() => handleButtonVisibility(), [width]);

  useEffect(
    () => (active === undefined ? setEditMode(false) : setEditMode(true)),
    [active]
  );

  //
  //  handlers for Window Action
  //

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
      document.querySelector("textarea").style.display = "flex";
      document.querySelector("textarea").focus();

      //add the note to storage, then update the storage
      NoteStorageUtils.addNote(newNote);
      setNotes(NoteStorageUtils.getNoteList());

      //auto select
      setActive(NoteStorageUtils.getLastNote());
      setBody(NoteStorageUtils.getLastNote().body);
      setTags(NoteStorageUtils.getLastNote().tags);
    },

    handleDelete: (e) => {
      if (active === undefined) {
        handleBackToList();
        return;
      }

      NoteStorageUtils.delNote(active);
      setNotes(NoteStorageUtils.getNoteList());

      if (NoteStorageUtils.isEmpty()) {
        //if empty, disable textearea and deactivate selected note. otherwise, focus textarea.
        setActive(undefined);
        document.querySelector("textarea").style.display = "none";
        return;
      } else {
        document.querySelector("textarea").focus();
      }

      //auto select
      setActive(NoteStorageUtils.getFirstNote());
      setBody(NoteStorageUtils.getFirstNote().body);
      setTags(NoteStorageUtils.getFirstNote().tags);

      handleBackToList();
    },

    handleSelect: (e) => {
      const selectedNote = NoteStorageUtils.getNoteById(e.target.id);
      setActive(selectedNote);
      setBody(selectedNote.body); //putting active instead of selectedNote will lead to an weird behavior
      setTags(TagUtils.getTags(selectedNote));

      handleShowEditor();

      document.querySelector("textarea").style.display = "flex";
      document.querySelector("textarea").focus();
    },

    handleEdit: (e) => {
      if (active === undefined) {
        return;
      }

      NoteStorageUtils.updateNote(active, body);
      setNotes(NoteStorageUtils.getNoteList());
    },
  };

  return (
    <div className="container">
      <SidePanel
        notes={notes}
        active={active}
        onAdd={handlers.handleAdd}
        onSelect={handlers.handleSelect}
        visible={styleSideBar}
      ></SidePanel>
      <MainPanel
        body={body}
        tags={tags}
        onChangeBody={handleChange}
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
