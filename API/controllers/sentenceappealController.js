'use strict';

var mongoose = require('mongoose'),
  SentenceAppeal = mongoose.model('SentenceAppeal');

exports.list_all_sa = function(req, res) {
//Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
SentenceAppeal.find(function(err, sa) {
    if (err){
        res.status(500).send(err);
    }
    else{
        res.json(sa);
    }
});
};

exports.create_an_sa = function(req, res) {
    var new_sa = new SentenceAppeal(req.body);
    new_sa.save(function(err, sa) {
      if (err){
        if(err.name=='ValidationError') {
            res.status(422).send(err);
        }
        else{
          res.status(500).send(err);
        }
      }
      else{
        res.json(sa);
      }
    });
  };
  


exports.read_an_sa = function(req, res) {
    SentenceAppeal.findById(req.params.saId, function(err, sa) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(sa);
      }
    });
};

exports.update_an_sa = function(req, res) {
    //Check that the user is administrator if it is updating more things than comments and if not: res.status(403); "an access token is valid, but requires more privileges"
      SentenceAppeal.findOneAndUpdate({_id: req.params.saId}, req.body, {new: true}, function(err, sa) {
        if (err){
          if(err.name=='ValidationError') {
              res.status(422).send(err);
          }
          else{
            res.status(500).send(err);
          }
        }
        else{
          res.json(sa);
        }
      });
  };

  
exports.delete_an_sa = function(req, res) {
    //Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
      SentenceAppeal.deleteOne({_id: req.params.saId}, function(err, sa) {
          if (err){
              res.status(500).send(err);
          }
          else{
              res.json({ message: 'SA successfully deleted' });
          }
      });
  };