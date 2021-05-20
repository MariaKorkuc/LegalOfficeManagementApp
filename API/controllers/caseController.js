'use strict';

// add listing for a lawyer

var mongoose = require('mongoose'),
  Case = mongoose.model('Case'),
  User = mongoose.model('User');


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

exports.list_all_lawyer_cases = function(req, res) {
  var query = {};
  //if clerkId is null, i.e. parameter is not in the URL, the search retrieves orders not assined to any clerk
  //else, the search retrieves orders assined to the specified clerk
  query.assignedUsers = {};
  query.assignedUsers._id = req.params.userId;
  //User.findById(req.params.userId);

  if (req.query.userId) {
    query.assignedUsers._id = req.query.userId;
  }

  if (req.query.status) {
    query.status = { $exists: true };
  }
  if (req.query.type) {
    query.type = { $exists: true };
  }

  var limit=10;
  if(req.query.pageSize){
    limit=parseInt(req.query.pageSize);
  }

  var sort="";
  if(req.query.reverse=="true"){
    sort="-";
  }

  if(req.query.sortedBy){
    sort+=req.query.sortedBy;
  }

  console.log("Query: "+query+ " Limit:" + limit+" Sort:" + sort);

  Case.find(query)
       .sort(sort)
       .limit(limit)
       .lean()
       .exec(function(err, cases){
            console.log('Start searching cases for lawyer');
            if (err){
              res.send(err);
            }
            else{
              res.json(cases);
            }
            console.log('End searching cases');
        });
};

exports.search_sa_for_case = function(req, res) {
  var query = {};
  query.SentenceAppeals = {};
  //if clerkId is null, i.e. parameter is not in the URL, the search retrieves orders not assined to any clerk
  //else, the search retrieves orders assined to the specified clerk


  if (req.query.type) {
    //retrieving orders with a cancelationMoment
      query.SentenceAppeals.type = { $exists: true };
  }

  if (req.query.status) {
    //retrieving orders with a cancelationMoment
      query.SentenceAppeals.status = { $exists: true };
  }

  console.log('Q '+query);

  var limit=10;
  if(req.query.pageSize){
    limit=parseInt(req.query.pageSize);
  }

  var sort="";
  if(req.query.reverse=="true"){
    sort="-";
  }

  console.log("Query: "+query+ " Limit:" + limit+" Sort:" + sort);

  Case.find(query)
       .sort(sort)
       .limit(limit)
       .lean()
       .exec(function(err, cases){
            console.log('Start searching sentences/appeals for cases');
            if (err){
              res.send(err);
            }
            else{
              res.json(cases);
            }
            console.log('End searching cases');
        });
};

exports.read_an_sa = function(req, res) {
  SentenceAppeal.findById(req.params.saId, function(err, cases) {
    if (err){
      res.status(500).send(err);
    }
    else{
      res.json(cases);
    }
  });
};



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
    //Check that user is a Customer and if not: res.status(403); "an access token is valid, but requires more privileges"
    var new_case = new Case(req.body);

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
  