'use strict';

var mongoose = require('mongoose'),
  Client = mongoose.model('Clients');

exports.list_all_clients = function(req, res) {
    Client.find(function(err, clients) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(clients);
        }
    });
};


exports.create_a_client = function(req, res) {
    var new_client = new Client(req.body);
    new_client.save(function(err, client) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
        res.json(client);
        }
    });
};


exports.read_a_client = function(req, res) {
    Client.findById(req.params.clientId, function(err, client) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(client);
        }
    });
};


exports.update_a_client = function(req, res) {
    Client.findOneAndUpdate({_id: req.params.clientId}, req.body, {new: true}, function(err, client) {
        if (err){
            if(err.name=='ValidationError') {
                es.status(422).send(err);
            } 
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(client);
        }
    });
};


exports.delete_a_client = function(req, res) {
    Client.deleteOne({_id: req.params.documentId}, function(err, client) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'client successfully deleted' });
        }
    });
};