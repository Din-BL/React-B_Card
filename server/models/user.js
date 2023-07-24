const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2
    },
    userName: {
      type: String,
      required: true,
      minlength: 2,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      match: /^(050|052|053|054|055)\d{7}$/,
      message: "Invalid phone format"
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
      message: "Invalid email address format"
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 128
    },
    imageUrl: {
      type: String,
      required: false,
      trim: true
    },
    imageAlt: {
      type: String,
      required: false,
      trim: true,
      maxlength: 128
    },
    state: {
      type: String,
      required: false,
      maxlength: 128
    },
    country: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 128
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 128
    },
    street: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 128
    },
    houseNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 128
    },
    zip: {
      type: String,
      required: false,
      trim: true,
      maxlength: 128
    },
    business: {
      type: Boolean,
      default: false
    },
    admin: {
      type: Boolean,
      default: false
    },
    loginAttempts: {
      type: Number,
      default: 0
    },
    lastFailedAttempt: {
      type: Date,
      default: undefined
    },
  },
  { strict: true }
);

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
