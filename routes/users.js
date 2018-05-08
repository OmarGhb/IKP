var express = require("express");
var router = express.Router();
var User = require("../models/usersModel");
var debug = require("debug")("app:users");
var bodyParser = require("body-parser");

//Get all users
router.get("/", (req, res) => {
  try {
    User.find({}, function(err, users) {
      if (err) throw err;
      debug(users);
      res.json(users);
    }).sort({ role: 1, userName: 1 });
  } catch (err) {
    res.json(err);
  }
});

//Get one user by ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    User.findById({ _id: id }, function(err, user) {
      if (err) res.json(err);
      debug(user);
      res.json(user);
    });
  } catch (err) {
    res.json(err);
  }
});

//Add a new user
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

//Edit a user by ID
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const modifiedUser = req.body;
    User.findByIdAndUpdate({ _id: id }, modifiedUser, function(err, user) {
      if (err) res.json(err);
      debug(user.userName + " has been updated.");
      res.json(user);
    });
  } catch (err) {
    res.json(err);
  }
});

//Delete one user by ID
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    debug(id);
    User.findByIdAndRemove({ _id: id }, function(err, user) {
      if (err) res.json(err);
      res.json(user);
      debug(user.userName + " deleted :(");
    });
  } catch (err) {
    res.json(err);
  }
});

//Delete all users
router.delete("/", (req, res) => {
  try {
    User.remove({}, function(err, users) {
      if (err) res.json(err);
      debug("All users deleted :'(((");
      res.json(users);
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
