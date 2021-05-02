'use strict';

var mongoose = require('mongoose'),
  Judge = mongoose.model('Judges');

exports.list_all_judges = function(req, res) {
    Judge.find(function(err, judges) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(judges);
        }
    });
};


exports.create_a_judge = function(req, res) {
    var new_judge = new Judge(req.body);
    new_judge.save(function(err, judge) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
        res.json(judge);
        }
    });
};


exports.read_a_judge = function(req, res) {
    Judge.findById(req.params.judgeId, function(err, judge) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(judge);
        }
    });
};


exports.update_a_judge = function(req, res) {
    Judge.findOneAndUpdate({_id: req.params.judgeId}, req.body, {new: true}, function(err, judge) {
        if (err){
            if(err.name=='ValidationError') {
                es.status(422).send(err);
            } 
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(judge);
        }
    });
};


exports.delete_a_judge = function(req, res) {
    Judge.deleteOne({_id: req.params.judgeId}, function(err, judge) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'judge successfully deleted' });
        }
    });
};