var express = require("express");
var router = express.Router();
var User = require("../models/usersModel");
var debug = require("debug")("app:users");
var bodyParser = require("body-parser");
const { MongoClient, ObjectID } = require("mongodb");

/* GET users listing. */
router.get("/", (req, res) => {
  try {
    User.find({}, function(err, users) {
      if (err) throw err;
      debug(users);
      res.json(users);
    });
  } catch (err) {
    res.json(err);
  }
});
router.post("/", (req, res) => {
  try {
    var user = new User(req.body);
    debug(user);
    user.save(function(err) {
      if (err) throw err;
      debug("New user created");
      res.json(user);
    });
  } catch (err) {
    res.json(err);
  }
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  debug(id);
  User.findByIdAndUpdate({ _id: id }, { role: "Administrateur" }, function(
    err,
    user
  ) {
    if (err) res.json(err);
    res.json(user);
    debug(user.userName + " is now an Admin");
  });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  debug(id);
  User.findByIdAndRemove({ _id: id }, function(err, user) {
    if (err) res.json(err);
    res.json(user);
    debug(user.userName + " deleted :(");
  });
});
router.delete("/", (req, res) => {
  User.remove({}, function(err, users) {
    if (err) res.json(err);
    debug("All users deleted :'(((");
    res.json(users);
  });
});

module.exports = router;
