const router = require("express").Router();
let User = require("../models/user.model");
const { wrapAsync } = require("../utils/helper");

router.post(
  "/register",
  wrapAsync(async function (req, res) {
    const { password, email, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();
    req.session.userId = user._id;
    // Note: this is returning the entire user object to demo, which will include the hashed and salted password.
    // In practice, you wouldn't typically do this – a success status would suffice, or perhaps just the user id.
    res.json(user);
  })
);

router.get(
  "/info",
  wrapAsync(async function (req, res) {
    res.send(req.session.userId);
  })
);

router.post(
  "/login",
  wrapAsync(async function (req, res) {
    const { password, email } = req.body;
    const user = await User.findAndValidate(email, password);
    if (user) {
      req.session.userId = user._id;
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  })
);

router.post(
  "/logout",
  wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
  })
);

router.get(
  "/",
  wrapAsync(async function (req, res) {
    const id = req.session.userId;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    }
  })
);

router.put(
  "/",
  wrapAsync(async function (req, res) {
    const id = req.session.userId;
    const { name, email, colorScheme, imgUrl } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
      colorScheme,
      imgUrl,
    });
    if (user) {
      res.sendStatus(201);
    }
  })
);

module.exports = router;
