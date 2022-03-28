import axios from "axios";

export default class NoteStorageUtils {
  static getNoteList() {
    let noteList = [];
    axios
      .get("http://localhost:5000/notes/")
      .then((response) => {
        noteList = response.data;

        noteList = noteList.sort((a, b) =>
          a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static setNoteList(newNoteList) {
    sessionStorage.setItem("notes-storage", JSON.stringify(newNoteList));
  }

  static addNote(note) {
    axios
      .post("http://localhost:5000/notes/add/", note)
      .then((res) => console.log(res.data));
  }

  static delNote(toDelete) {
    axios
      .delete("http://localhost:5000/notes/" + toDelete._id)
      .then((response) => {});
  }

  static getNoteById(id) {
    const notes = this.getNoteList();
    const found = notes.find((note) => parseInt(note._id) === parseInt(id));
    return found;
  }

  static getNote(idx) {
    return this.getNoteList()[idx];
  }

  static getFirstNote() {
    return this.getNote(0);
  }

  static getLastNote() {
    const notes = this.getNoteList();
    let last = notes.length - 1;
    return this.getNote(last);
  }

  static updateNote(noteToUpdate, text) {
    noteToUpdate.text = text;
    noteToUpdate.lastUpdatedDate = new Date(Date.now()).toISOString();

    axios
      .post("http://localhost:5000/update" + noteToUpdate._id, noteToUpdate)
      .then((res) => console.log(res.data));
  }

  static updateTags(noteToUpdate, tags) {
    noteToUpdate.tags = tags;

    axios
      .post("http://localhost:5000/update" + noteToUpdate._id, noteToUpdate)
      .then((res) => console.log(res.data));
  }

  static isEmpty() {
    return this.getNoteList().length === 0;
  }
}
