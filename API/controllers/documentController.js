'use strict';

var mongoose = require('mongoose'),
  Document = mongoose.model('Documents');

exports.list_all_documents = function(req, res) {
//Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
Document.find(function(err, documents) {
    if (err){
        res.status(500).send(err);
    }
    else{
        res.json(documents);
    }
});
};

exports.create_a_document = function(req, res) {
    var new_document = new Document(req.body);
    new_document.save(function(err, document) {
      if (err){
        if(err.name=='ValidationError') {
            res.status(422).send(err);
        }
        else{
          res.status(500).send(err);
        }
      }
      else{
        res.json(document);
      }
    });
  };
  

// exports.search_document = function(req, res) {
// //Check if category param exists (category: req.query.category)
// //Check if keyword param exists (keyword: req.query.keyword)
// //Search depending on params but only if deleted = false
// console.log('Searching an document depending on params');
// res.send('Item returned from the document search');
// };

exports.read_a_document = function(req, res) {
    Document.findById(req.params.documentId, function(err, document) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(document);
      }
    });
};

exports.update_a_document = function(req, res) {
    //Check that the user is administrator if it is updating more things than comments and if not: res.status(403); "an access token is valid, but requires more privileges"
      Document.findOneAndUpdate({_id: req.params.documentId}, req.body, {new: true}, function(err, document) {
        if (err){
          if(err.name=='ValidationError') {
              res.status(422).send(err);
          }
          else{
            res.status(500).send(err);
          }
        }
        else{
          res.json(document);
        }
      });
  };

  
exports.delete_a_document = function(req, res) {
    //Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
      Document.deleteOne({_id: req.params.documentId}, function(err, document) {
          if (err){
              res.status(500).send(err);
          }
          else{
              res.json({ message: 'document successfully deleted' });
          }
      });
  };




var mongoose = require('mongoose'),
    Attachment = mongoose.model('Attachments');

exports.create_an_attachment = function(req, res) {
    var new_att = new Attachment(req.body);
    new_att.save(function(err, att) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
            }
        else{
            res.json(att);
        }
    });
};

exports.read_an_attachment = function(req, res) {
    Attachment.findById(req.params.attachmentId, function(err, att) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(att);
      }
    });
  };

exports.delete_an_attachment = function(req, res) {
Attachment.deleteOne({_id: req.params.attId}, function(err, att) {
    if (err){
    res.status(500).send(err);
    }
    else{
    res.json({ message: 'Attachment successfully deleted' });
    }
});
};