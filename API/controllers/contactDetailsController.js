'use strict';

var mongoose = require('mongoose'),
ContactDetails = mongoose.model('Contact Details');

exports.list_all_contactDetails = function(req, res) {
    ContactDetails.find(function(err, contactDetails) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(contactDetails);
        }
    });
};


exports.create_contactDetails = function(req, res) {
    var new_contactDetails = new ContactDetails(req.body);
    new_contactDetails.save(function(err, contactDetails) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
        res.json(contactDetails);
        }
    });
};


exports.read_contactDetails = function(req, res) {
    ContactDetails.findById(req.params.contactDetailsId, function(err, contactDetails) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(contactDetails);
        }
    });
};


exports.update_contactDetails = function(req, res) {
    ContactDetails.findOneAndUpdate({_id: req.params.contactDetails}, req.body, {new: true}, function(err, contactDetails) {
        if (err){
            if(err.name=='ValidationError') {
                es.status(422).send(err);
            } 
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(contactDetails);
        }
    });
};


exports.delete_contactDetails = function(req, res) {
    ContactDetails.deleteOne({_id: req.params.contactDetailsId}, function(err, contactDetails) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'contactDetails successfully deleted' });
        }
    });
};