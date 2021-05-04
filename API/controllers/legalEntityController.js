'use strict';

var mongoose = require('mongoose'),
LegalEntity = mongoose.model('Legal Enities');

exports.list_all_legalEntity = function(req, res) {
    LegalEntity.find(function(err, legalEntity) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(legalEntity);
        }
    });
};


exports.create_a_legalEntity = function(req, res) {
    var new_legalEntity = new LegalEntity(req.body);
    new_legalEntity.save(function(err, legalEntity) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
        res.json(legalEntity);
        }
    });
};


exports.read_a_legalEntity = function(req, res) {
    LegalEntity.findById(req.params.legalEntityId, function(err, LegalEntity) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(LegalEntity);
        }
    });
};


exports.update_a_legalEntity = function(req, res) {
    LegalEntity.findOneAndUpdate({_id: req.params.legalEntity}, req.body, {new: true}, function(err, legalEntity) {
        if (err){
            if(err.name=='ValidationError') {
                es.status(422).send(err);
            } 
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(legalEntity);
        }
    });
};


exports.delete_a_legalEntity = function(req, res) {
    LegalEntity.deleteOne({_id: req.params.legalEntityId}, function(err, legalEntity) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'legalEntity successfully deleted' });
        }
    });
};