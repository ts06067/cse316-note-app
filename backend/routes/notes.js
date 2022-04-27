const router = require("express").Router();
const Note = require("../models/note.model");
const { isLoggedIn, isAgent } = require("../middleware/auth");
const { wrapAsync } = require("../utils/helper");
const { default: mongoose } = require("mongoose");

/*
router.route("/").get((req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});
*/

router.get(
  "/",
  isLoggedIn,
  wrapAsync(async function (req, res) {
    let notes = await Note.find({ agent: req.session.userId });
    res.json(notes);
  })
);

/*
router.route("/add").post((req, res) => {
  const text = req.body.text;
  const lastUpdatedDate = Date.parse(req.body.lastUpdatedDate);
  const tags = req.body.tags;

  const newNote = new Note({ text, lastUpdatedDate, tags });

  newNote
    .save()
    .then(() => res.json("Note added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
*/

router.post(
  "/add",
  isLoggedIn,
  wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));

    const text = req.body.text;
    const lastUpdatedDate = Date.parse(req.body.lastUpdatedDate);
    const tags = req.body.tags;

    const newNote = new Note({
      text,
      lastUpdatedDate,
      tags,
      agent: req.session ? req.session.userId : null,
    });

    await newNote.save();
    res.json(newNote);
  })
);

/*
router.route("/:id").get((req, res) => {
  Note.findById(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json("Error: " + err));
});
*/

router.get(
  "/:id",
  isAgent,
  wrapAsync(async function (req, res) {
    let id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
      const note = await Note.findById(id);
      if (note) {
        res.json(note);
        return;
      } else {
        throw new Error("Note Not Found");
      }
    } else {
      throw new Error("Invalid Note Id");
    }
  })
);

/*
router.route("/:id").delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
*/

router.delete(
  "/:id",
  isAgent,
  wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted Successfully: " + result);
    res.json(result);
  })
);

router.route("/update/:id").post((req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      note.text = req.body.text;
      note.lastUpdatedDate = req.body.lastUpdatedDate;
      note.tags = req.body.tags;

      note
        .save()
        .then(() => res.json("Note updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
