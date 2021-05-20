'use strict';
module.exports = function(app) {
  var documents = require('../controllers/documentController');
  
  app.route('/documents')
    .get(documents.list_all_documents)
    .post(documents.create_a_document)

  app.route('/documents/search')
    .get(documents.search_in_document)


  app.route('/documents/:documentId')
  .get(documents.read_a_document)
  .put(documents.update_a_document)

  app.route('/documents/:documentId/case/:caseId')
  .post(documents.assign_document_to_case);
};