'use strict';

// add listing for a lawyer

var mongoose = require('mongoose');
var Case = mongoose.model('Case');
var Judge = mongoose.model('Judge');
var SentenceAppeals = mongoose.model('SentenceAppeal');
var LegalEntity = mongoose.model('LegalEntity');


exports.list_all_cases = function(req, res) {
    Case.find(function(err, cases) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(cases);
        }
    });
};

// exports.list_all_lawyer_cases = function(req, res) {
//     Case.find(function(err, cases) {
//         if (err){
//             res.status(500).send(err);
//         }
//         else{
//             res.json(cases);
//         }
//     });
// };


// exports.search_cases = function(req, res) {
//     //Check if category param exists (category: req.query.category)
//     //Check if keyword param exists (keyword: req.query.keyword)
//     //Search depending on params but only if deleted = false
//     console.log('Searching a case depending on params');
//     res.send('Item returned from the case search');
//   };

exports.read_a_case = function(req, res) {
    Case.findById(req.params.caseId, function(err, mcase) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(mcase);
      }
    });
};

exports.create_a_case = function(req, res) {

    var new_case = new Case(req.body);
    // var data = await new_case.save();

    // var judges = new Judge(req.body.judges);
    // await judges.save();

    // var legalEntities = new LegalEntity(req.body.legalEntities)
    // await legalEntities.save()

    // var sentenceAppeals = new SentenceAppeals(req.body.sentenceAppeals)
    // await sentenceAppeals.save()

    // return data;

    new_case.save(function(err, mcase) {
        if (err){
        if(err.name=='ValidationError') {
            res.status(422).send(err);
        }
        else{
            res.status(500).send(err);
        }
        }
        else{
        res.json(mcase);
        }
    });
};


exports.update_a_case = function(req, res) {
    //Check if the order has been previously assigned or not
    //Assign the order to the proper clerk that is requesting the assigment
    //when updating delivery moment it must be checked the clerk assignment and to check if it is the proper clerk and if not: res.status(403); "an access token is valid, but requires more privileges"
    Case.findById(req.params.caseId, function(err, mcase) {
      if (err){
        if(err.name=='ValidationError') {
            res.status(422).send(err);
        }
        else{
          res.status(500).send(err);
        }
      }
      else{
          Case.findOneAndUpdate({_id: req.params.caseId}, req.body, {new: true}, function(err, mcase) {
            if (err){
              res.status(500).send(err);
            }
            else{
              res.json(mcase);
            }
          });
        }
    });
  };
  

// only by admin - soft delete (maybe add active to model)
exports.delete_a_case = function(req, res) {
    //Check if the order were delivered or not and delete it or not accordingly
    //Check if the user is the proper customer that posted the order and if not: res.status(403); "an access token is valid, but requires more privileges"
    Case.deleteOne({
      _id: req.params.caseId
    }, function(err, mcase) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json({ message: 'Case successfully deleted' });
      }
    });
  };
  