'use strict';
module.exports = function(app) {
    var Judges = require('../controllers/clientController');
  
    app.route('/judges')
        .get(Judges.list_all_clients)
        .post(Judges.create_a_client)
    
    app.route('/judges/:judgeId')
        .get(Judges.read_a_client)
        .put(Judges.update_a_client)
        .delete(Judges.delete_a_client)
};