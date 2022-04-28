const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("../utils/validators");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: validator.validateEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: true,
      trim: true, // This will trim the whitespace automatically from the email before saving
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
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

userSchema.statics.findAndValidate = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
