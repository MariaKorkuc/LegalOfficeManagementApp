'use strict';

var mongoose = require('mongoose'),
  Client = mongoose.model('Client');

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
    Client.deleteOne({_id: req.params.clientId}, function(err, client) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'client successfully deleted' });
        }
    });
};

exports.assign_client_to_case = async function(req, res) {
    const Case = mongoose.model('Case');
  
    try {
      const clientData = await Client.findById(req.params.clientId);
      const caseData = await Case.findOneAndUpdate({
        _id: req.params.caseId,
        affiliatedClients: { $ne: clientData.id }
      }, {
        $push: {
          affiliatedClients: clientData.id
        }
      });
  
      if (!caseData) {
        res.json({
          status: 'Client alredy exist in that Case!'
        });
      }
  
      return res.json(caseData);
    } catch (error) {
      res.status(400).json({error: 'missing Case/clientData'}); 
    }
  };
  