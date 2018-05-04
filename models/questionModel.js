var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  themes: {
    type: [String],
    required: [true, "You need to specify at least one theme for the question"]
  },
  wording: {
    type: String,
    required: [true, "Type a question"]
  },
  rightAnswer: {
    type: String,
    required: [true, "Type an answer"]
  },
  points: {
    type: [String],
    required: [true, "Type a number of points for the 3 first winners"]
  },
  launchDate: Date,
  stopDate: Date
});

module.exports = Question;
