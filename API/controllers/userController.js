'use strict';
var mongoose = require('mongoose');
const User = mongoose.model('User');
 

exports.list_all_users = function(req, res) {
    //Check if the role param exist
    var roleName;
    if(req.query.role){
        roleName=req.query.role;
      }
    //Adapt to find the actors with the specified role
    User.find({}, function(err, users) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(users);
        }
    });
};


exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  // If new_actor is a customer, validated = true;
  // If new_actor is a clerk, validated = false;
  if ((new_user.role.includes( 'ADMIN' ))) {
    new_user.validated = false;
  } else {
    new_user.validated = true;
  }
  new_user.save(function(err, user) {
    if (err){
      if(err.name=='ValidationError') {
          res.status(422).send(err);
      }
      else{
        res.status(500).send(err);
      }
    }
    else{
      res.json(user);
    }
  });
};

exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err){
      res.status(500).send(err);
    }
    else{
      res.json(user);
    }
  });
};

exports.update_a_user = function(req, res) {
    //Check that the user is the proper actor and if not: res.status(403); "an access token is valid, but requires more privileges"
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
      if (err){
        if(err.name=='ValidationError') {
            res.status(422).send(err);
        }
        else{
          res.status(500).send(err);
        }
      }
      else{
          res.json(user);
      }
    });
};

// only admin
exports.validate_a_user = function(req, res) {
    //Check that the user is an Administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
    console.log("Validating user with id: "+ req.params.userId)
    User.findOneAndUpdate({_id: req.params.userId},  { $set: {"validated": "true" }}, {new: true}, function(err, user) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(user);
      }
    });
  };

//   only admin
exports.delete_a_user = function(req, res) {
    User.deleteOne({_id: req.params.userId}, function(err, user) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'User successfully deleted' });
        }
    });
};

exports.list_all_user_cases = async function(req, res) {
    const Case = mongoose.model('Case');
    
    try {
      const user = await User.findById(req.params.userId);
      const userCases = await Case.find({ assignedUsers: user.id });
  
      return res.json(userCases);
      
    } catch (error) {
      res.status(400).json({error});
    }
};

exports.list_all_user_cases = async function(req, res) {
  const Case = mongoose.model('Case');
  
  try {
    const user = await User.findById(req.params.userId);
    const userCases = await Case.find({ assignedUsers: user.id });

    return res.json(userCases);
    
  } catch (error) {
    res.status(400).json({error});
  }
};


exports.cases_by_user = async function(req, res) {
  
};



exports.assign_user_to_case = async function(req, res) {
  const Case = mongoose.model('Case');

  try {
    const userData = await User.findById(req.params.userId);
    const caseData = await Case.findOneAndUpdate({
      _id: req.params.caseId,
      assignedUsers: { $ne: userData.id }
    }, {
      $push: {
        assignedUsers: userData.id
      }
    });

    if (!caseData) {
      res.json({
        status: 'User alredy exist in that Case!'
      });
    }

    return res.json(caseData);
  } catch (error) {
    res.status(400).json({error: 'missing Case/User'}); 
  }
};
