export default class Search {
  static filterCaseInsensitive(notes, query) {
    return notes.filter(
      (note) => note.text.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
}
