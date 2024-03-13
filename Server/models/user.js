const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  phone: { type: Number, require: true },
  role: {
    type: String,
    enum: ["guest", "advisor", "admin"],
    default: "guest",
  },
});
module.exports = mongoose.model("User", UserSchema);
