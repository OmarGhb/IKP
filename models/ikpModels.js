import { SchemaType } from "mongoose";

var tables = require("../utils/tables");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var emailSchema = require("mongoose-type-email");

//Schemas declaration
var knowledgeSpaceSchema = new Schema({
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  competitions: [
    {
      startedAt: Date,
      duration: String,
      quizzes: [
        {
          tags: { type: [String], enum: tables.SKILLS },
          question: String,
          answer: String,
          startedAt: Date,
          duration: String,
          points: [Number]
        }
      ]
    }
  ]
});

var userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "You need to specify a first name."]
  },
  lastName: {
    type: String,
    required: [true, "You need to specify a last name."]
  },
  email: {
    type: emailSchema,
    required: [true, "You need to specify an email."],
    unique: [true, "This email already exists."]
  },
  birthDate: {
    type: Date,
    required: [true, "You need to specify your date of birth."]
  },
  skills: {
    type: [String],
    required: [true, "Specify at least one skill."],
    min: 1
  },
  knowledgeSpaces: [{ type: Schema.Types.ObjectId, ref: "KnowledgeSpace" }]
});

var competitionAwardSchema = new Schema({
  competition: {
    type: Schema.Types.ObjectId,
    ref: "KnowledgeSpace.competitions"
  },
  pointsPerUsers: [
    [
      { user: { type: Schema.Types.ObjectId, ref: "User" } },
      { points: { type: [Number], ref: "quizAward.points" } }
    ]
  ]
});

var quizAwardSchema = new Schema({
  quiz: [
    { type: Schema.Types.ObjectId, ref: "KnowledgeSpace.competitions.quizzes" }
  ],
  pointsPerUsers: [
    [
      { user: { type: Schema.Types.ObjectId, ref: "User" } },
      {
        points: {
          type: [Number],
          ref: "KnowledgeSpace.competitions.quizzes.points"
        }
      }
    ]
  ]
});

//Models declaration
var KnowledgeSpace = mongoose.model("KnowledgeSpace", knowledgeSpaceSchema);
var User = mongoose.model("User", userSchema);
var competitionAward = mongoose.model(
  "competitionAward",
  competitionAwardSchema
);
var quizAward = mongoose.model("quizAward", quizAwardSchema);

//Modules exportation
module.exports = User;
module.exports = KnowledgeSpace;
module.exports = competitionAward;
module.exports = quizAward;
