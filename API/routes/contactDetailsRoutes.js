'use strict';
module.exports = function(app) {
    var ContactDetails = require('../controllers/contactDetailsController');
  
    app.route('/ContactDetails')
        .get(ContactDetails.list_all_contactDetails)
        .post(ContactDetails.create_contactDetails)
    
    app.route('/ContactDetails/:ContactDetailsId')
        .get(ContactDetails.read_contactDetails)
        .put(ContactDetails.update_contactDetails)
        .delete(ContactDetails.delete_contactDetails)
};