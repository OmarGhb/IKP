var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var emailSchema = require("mongoose-type-email");

var userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "You need to specify a username"],
      unique: [true, "This userName already exists."],
      min: 6
    },
    email: {
      type: emailSchema,
      required: [true, "You need to specify an email"],
      unique: [true, "This email already exists."]
    },
    role: {
      type: String,
      enum: ["Administrateur", "Collaborateur"],
      default: "Collaborateur"
    }
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
