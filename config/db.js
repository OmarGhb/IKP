var constants = require("../utils/constants");
var mongoose = require("mongoose");

module.exports.connect = function(err) {
  if (err) throw err;
  mongoose.connect(constants.DB_URL).then(data => {
    console.log(data.connection.readyState);
  });
};
