
const mongoose = require('mongoose');
const Document = mongoose.model('Document');

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
    const newDocument = new Document({ ...req.body, modificationUserId: req.User._id });
    newDocument.attachments.push({
      displayName: file.name,
      textVector: rawtextCorpuse,
      type: 'pdf', // for now
      link: req.protocol + '://' + req.hostname + ':8080' + '/download/' + fileName
    });
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

exports.search_in_document = async function(req, res) {
  const { q } = req.query;

  if(!q) {
    res.status(400).json({ message: 'Missing q parameter'});
  }

  try {
    const results = await Document.find({
      $text: {
        $search: decodeURI(q),
        $caseSensitive: true,
        $language: "english"
      }
    }, { score : { $meta: "textScore" } })
    .sort({ score : { $meta : 'textScore' } });

    return res.json({
      searchQuery: decodeURI(q),
      results
    });

  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.assign_document_to_case = async function(req, res) {
  const Case = mongoose.model('Case');

  try {
    const documentData = await Document.findById(req.params.documentId);
    const caseData = await Case.findOneAndUpdate({
      _id: req.params.caseId,
      documents: { $ne: documentData.id }
    }, {
      $push: {
        documents: documentData.id
      }
    });

    if (!caseData) {
      res.json({
        status: 'Document alredy exist in that Case!'
      });
    }

    return res.json(caseData);
  } catch (error) {
    res.status(400).json({error: 'missing Case/User'}); 
  }
};


