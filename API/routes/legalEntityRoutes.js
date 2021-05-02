'use strict';
module.exports = function(app) {
    var LegalEnities = require('../controllers/legalEntityController');
  
    app.route('/LegalEnities')
        .get(LegalEnities.list_all_appointment)
        .post(LegalEnities.create_an_appointment)
    
    app.route('/LegalEnities/:LegalEnityId')
        .get(LegalEnities.read_an_appointment)
        .put(LegalEnities.update_an_appointment)
        .delete(LegalEnities.delete_an_appointment)
};