'use strict';
module.exports = function(app) {
    var LegalEntities = require('../controllers/legalEntityController');
  
    app.route('/LegalEntities')
        .get(LegalEntities.list_all_legalEntity)
        .post(LegalEntities.create_a_legalEntity)
    
    app.route('/LegalEntities/:LegalEntityId')
        .get(LegalEntities.read_a_legalEntity)
        .put(LegalEntities.update_a_legalEntity)
        .delete(LegalEntities.delete_a_legalEntity)
};