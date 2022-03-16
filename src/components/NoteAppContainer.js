import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import NoteStorageUtils from "../api/NoteStorageUtils";

import "./css/NoteAppContainer.css";
import { useState } from "react";
import TagUtils from "../api/TagUtils";

function NoteAppContainer() {
  //states
  const [notes, setNotes] = useState(NoteStorageUtils.getNoteList());
  const [active, setActive] = useState(undefined);
  const [body, setBody] = useState("");
  const [tags, setTags] = useState(TagUtils.getTags(active));

  //handlers
  const handleChange = (e) => {
    setBody(e.target.value);
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
      };

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
        return;
      }

      NoteStorageUtils.delNote(active);
      setNotes(NoteStorageUtils.getNoteList());

      if (NoteStorageUtils.isEmpty()) {
        setActive(undefined);
        return;
      }

      //auto select
      setActive(NoteStorageUtils.getFirstNote());
      setBody(NoteStorageUtils.getFirstNote().body);
    },

    handleSelect: (e) => {
      const selectedNote = NoteStorageUtils.getNoteById(e.target.id);
      setActive(selectedNote);
      setBody(selectedNote.body); //putting active instead of selectedNote will lead to an weird behavior
      setTags(TagUtils.getTags(selectedNote));
    },

    handleEdit: (e) => {
      if (active === undefined) {
        return;
      }

      NoteStorageUtils.updateNote(active, body);
      setNotes(NoteStorageUtils.getNoteList());
    },
  };

  //button elements
  const sidePanelButtons = [
    { id: "profile", text: "profile" },
    { id: "logo", text: "logo" },
    { id: "add", text: "add" },
  ];
  const mainPanelButtons = [
    { id: "none1", text: "none" },
    { id: "none2", text: "none" },
    { id: "del", text: "delete" },
  ];

  return (
    <div className="container">
      <SidePanel
        items={sidePanelButtons}
        notes={notes}
        active={active}
        onAdd={handlers.handleAdd}
        onSelect={handlers.handleSelect}
      ></SidePanel>
      <MainPanel
        items={mainPanelButtons}
        body={body}
        tags={tags}
        onChangeBody={handleChange}
        onDelete={handlers.handleDelete}
        onEdit={handlers.handleEdit}
        onAddTag={handlerTags.handleAddTag}
        onDeleteTag={handlerTags.handleDeleteTag}
        onDragTag={handlerTags.handleDragTag}
      ></MainPanel>
    </div>
  );
}
export default NoteAppContainer;
