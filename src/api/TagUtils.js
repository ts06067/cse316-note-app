import NoteStorageUtils from "./NoteStorageUtils";

export default class TagUtils {
  static getTags(note) {
    return note === undefined
      ? undefined
      : note.tags === undefined
      ? []
      : note.tags;
  }

  static setTags(note, tags) {
    if (note === undefined) {
      return;
    }
    NoteStorageUtils.updateTags(note, tags);
  }
  static addTag(note, tag) {
    let tags = this.getTags(note);
    tags.push(tag);
    this.setTags(note, tags);
  }

  static deleteTag(note, i) {
    let tags = this.getTags(note);
    tags = tags.filter((tag, idx) => idx !== i);
    this.setTags(note, tags);
  }

  static dragTag(note, tag, currPos, newPos) {
    let tags = this.getTags(note);

    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    this.setTags(note, tags);
  }
}
