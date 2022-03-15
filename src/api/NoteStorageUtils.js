export default class NoteStorageUtils {
  static getNoteList() {
    const newNoteList = JSON.parse(
      sessionStorage.getItem("notes-storage") || "[]"
    );

    return newNoteList;
  }

  static setNoteList(newNoteList) {
    sessionStorage.setItem("notes-storage", JSON.stringify(newNoteList));
  }
}
