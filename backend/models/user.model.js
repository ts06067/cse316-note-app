const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    colorScheme: {
      type: String,
      required: false,
      default: "light",
    },
    imgUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//for unique account
userSchema.index({ email: "text" }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
