export default class NoteStorageUtils {
  static getNoteList() {
    let newNoteList = JSON.parse(localStorage.getItem("notes-storage"));
    newNoteList = newNoteList === null ? [] : newNoteList;

    newNoteList = newNoteList.sort((a, b) => (a.date < b.date ? 1 : -1));

    return newNoteList;
  }

  static setNoteList(newNoteList) {
    localStorage.setItem("notes-storage", JSON.stringify(newNoteList));
  }

  static addNote(note) {
    const notes = this.getNoteList() || [];
    notes.push(note);
    this.setNoteList(notes);
  }

  static delNote(toDelete) {
    let notes = this.getNoteList() || [];
    notes = notes.filter((note) => parseInt(note.id) !== parseInt(toDelete.id));
    this.setNoteList(notes);
  }

  static getNoteById(id) {
    const notes = this.getNoteList();
    const found = notes.find((note) => parseInt(note.id) === parseInt(id));
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

  static updateNote(noteToUpdate, body) {
    const notes = this.getNoteList();
    notes.forEach((note) => {
      if (note.id === noteToUpdate.id) {
        note.body = body;
        note.date = noteToUpdate.date;
      }
    });
    this.setNoteList(notes);
  }

  static updateTags(noteToUpdate, tags) {
    const notes = this.getNoteList();
    notes.forEach((note) => {
      if (note.id === noteToUpdate.id) {
        note.tags = tags;
      }
    });
    this.setNoteList(notes);
  }

  static isEmpty() {
    return this.getNoteList().length === 0;
  }
}
