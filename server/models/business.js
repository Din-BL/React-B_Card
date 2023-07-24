
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^(050|052|053|054|055|058)/,
    message: "Invalid phone format",
    minlength: 10,
    maxlength: 10
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
    message: "Invalid email address format"
  },
  web: {
    type: String,
    required: false
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
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Generating random numbers before saving them to the database
businessSchema.pre("save", async function (next) {
  const user = this;
  let random = Math.floor(Math.random() * 1000000);
  let unique = await user.constructor.findOne({ number: random });
  while (unique !== null) {
    random = Math.floor(Math.random() * 1000000);
    unique = await user.constructor.findOne({ number: random });
  }
  user.number = random;
  next();
});

module.exports = mongoose.model("Business", businessSchema)



