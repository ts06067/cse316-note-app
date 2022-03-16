export default class NoteStorageUtils {
  static getNoteList() {
    const newNoteList = JSON.parse(sessionStorage.getItem("notes-storage"));

    return newNoteList;
  }

  static setNoteList(newNoteList) {
    sessionStorage.setItem("notes-storage", JSON.stringify(newNoteList));
  }

  static addNote(note) {
    const notes = this.getNoteList() || [];
    notes.push(note);
    this.setNoteList(notes);
  }

  static delNote(toDelete) {
    let notes = this.getNoteList() || [];
    notes = notes.filter((note) => note.id != toDelete.id);
    this.setNoteList(notes);
  }

  static getNoteById(id) {
    const notes = this.getNoteList();
    return notes.find((note) => note.id == id);
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

  static updateNote(noteToUpdate, body) {
    const notes = this.getNoteList();
    notes.forEach((note) => {
      if (note.id == noteToUpdate.id) {
        note.body = body;
      }
    });
    this.setNoteList(notes);
  }

  static isEmpty() {
    return this.getNoteList().length == 0;
  }
}
