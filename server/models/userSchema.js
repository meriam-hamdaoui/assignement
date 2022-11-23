const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: Number },
  country: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

module.exports = User = model("user", userSchema);
