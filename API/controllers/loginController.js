'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');


exports.register_new_user = function (req, res) {
  var new_user = new User(req.body);
  new_user.validated = false;

  new_user.save(function (err, user) {
    if (err) {
      if (err.name == 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(500).send(err);
      }
    }
    else {
      res.json(user);
    }
  });
};

exports.log_in_user = async function (req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  user.verifyPassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      return res.status(401).send(err);
    }

    req.session.user = user;
    res.json(user);
  });
};

