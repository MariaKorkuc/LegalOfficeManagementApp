'use strict';
module.exports = function(app) {
    var appointments = require('../controllers/appointmentController');
  
    app.route('/appointments')
        .get(appointments.list_all_appointment)
        .post(appointments.create_an_appointment)
    
    app.route('/appointments/:appointmentId')
        .get(appointments.read_an_appointment)
        .put(appointments.update_an_appointment)
        .delete(appointments.delete_an_appointment)
};