'use strict';
module.exports = function(app) {
    var clients = require('../controllers/clientController');
  
    app.route('/clients')
        .get(clients.list_all_clients)
        .post(clients.create_a_client)
    
    app.route('/clients/:clientId')
        .get(clients.read_a_client)
        .put(clients.update_a_client)
        .delete(clients.delete_a_client)
};