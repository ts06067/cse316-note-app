import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import NoteStorageUtils from "../api/NoteStorageUtils";

import "./css/NoteAppContainer.css";
import { useState } from "react";

function NoteAppContainer() {
  //states
  const [notes, setNotes] = useState(NoteStorageUtils.getNoteList());
  const [active, setActive] = useState(undefined);
  const [body, setBody] = useState("");

  //handlers
  const handleChange = (e) => {
    setBody(e.target.value);
  };

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
      setBody(selectedNote.body);
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
        onChangeBody={handleChange}
        onDelete={handlers.handleDelete}
        onEdit={handlers.handleEdit}
      ></MainPanel>
    </div>
  );
}
export default NoteAppContainer;
