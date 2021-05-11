'use strict';

const mongoose = require('mongoose');
const Document = mongoose.model('Documents');
const Attachment = mongoose.model('Attachments');

const fs = require('fs');
const PDFParser = require("pdf2json");



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

exports.create_a_document = async function(req, res) {
  const file = req.files.file;

  const fileName = 'test_file_1_' + new Date().getTime() + '.pdf';
  await file.mv('/tmp/' + fileName);

  const pdfParser = new PDFParser(this, 1);
  pdfParser.on("pdfParser_dataError", errData => {
    res.status(400).json({ error: errData });
  });

  pdfParser.on("pdfParser_dataReady", pdfData => {
    const rawtextCorpuse = pdfParser.getRawTextContent();

    var newattachment = new Attachment({
      displayName: file.name,
      textVector: rawtextCorpuse,
      type: 'pdf', // for now
      link: req.protocol + '://' + req.hostname + ':8080' + '/download/' + fileName
    });

    const newDocument = new Document({ ...req.body, modificationUserId: req.User._id });
    newDocument.attachments.push(newattachment);
    newDocument.save((err, document) => {

      if (err) {
        res.status(400).json({ error: errData });
      } else {
        res.json(document)
      }
    });
  });

  pdfParser.loadPDF('/tmp/' + fileName);
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