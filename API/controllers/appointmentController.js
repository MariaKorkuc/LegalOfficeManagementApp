'use strict';

var mongoose = require('mongoose'),
  Appointment = mongoose.model('Appointments');

exports.list_all_appointment = function(req, res) {
    Appointment.find(function(err, appointment) {
        if (err){
          res.status(500).send(err);
        }
        else{
            res.json(appointment);
        }
    });
};


exports.create_an_appointment = function(req, res) {
    var new_appointment = new Appointment(req.body);
    new_appointment.save(function(err, appointment) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
        res.json(appointment);
        }
    });
};


exports.read_an_appointment = function(req, res) {
    Appointment.findById(req.params.appointmentId, function(err, appointment) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(appointment);
        }
    });
};


exports.update_an_appointment = function(req, res) {
    Appointment.findOneAndUpdate({_id: req.params.appointmentId}, req.body, {new: true}, function(err, appointment) {
        if (err){
            if(err.name=='ValidationError') {
                es.status(422).send(err);
            } 
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(appointment);
        }
    });
};


exports.delete_an_appointment = function(req, res) {
    Appointment.deleteOne({_id: req.params.appointmentId}, function(err, appointment) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'appointment successfully deleted' });
        }
    });
};