var express = require("express");
var router = express.Router();
var User = require("../models/usersModel");
var debug = require("debug")("app:users");
var bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");

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
  const modifiedUser = req.body;
  User.findByIdAndUpdate({ _id: id }, modifiedUser, function(err) {
    if (err) res.json(err);
    debug(modifiedUser.userName + " has been updated.");
    res.json(modifiedUser);
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
