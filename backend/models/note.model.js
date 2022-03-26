const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    lastUpdatedDate: {
      type: Date,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("User", noteSchema);

module.exports = Note;
