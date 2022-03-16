import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";
import NoteStorageUtils from "../api/NoteStorageUtils";

import "./css/NoteAppContainer.css";
import { useState } from "react";

function NoteAppContainer() {
  //states
  const [notes, setNotes] = useState(NoteStorageUtils.getNoteList());
  const [active, setActive] = useState({});
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
      setActive(newNote);
      setBody(newNote.body);
      console.log(active);
    },

    handleDelete: (e) => {
      console.log("delete button clicked");
    },

    handleSelect: (e) => {
      const selectedNote = notes.find((note) => note.id == e.target.id);
      setActive(selectedNote);
      setBody(selectedNote.body);
      console.log(body);
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
      ></MainPanel>
    </div>
  );
}
export default NoteAppContainer;
