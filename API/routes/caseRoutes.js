'use strict';
module.exports = function (app) {
    var cases = require('../controllers/caseController');

    app.route('/cases')
        .get(cases.list_all_cases)
        .post(cases.create_a_case)

    app.route('/cases/:caseId')
        .get(cases.read_a_case)
        .put(cases.update_a_case)
        .delete(cases.delete_a_case)
    
        /*
        * @section cases
        * @type get
        * @url /cases/search
        * @param {string} userId 
        * @param {string} type (CIVIL|CRIMINAL|FAMILY)
        * @param {string} status (Open|Closed|Reopened)
        * @param {string} sortedBy (total)
        * @param {string} reverse (true|false)
        * @param {string} pageSize
       */
    app.route('/cases/search')
        .get(cases.list_all_lawyer_cases);

        
  /*
        * @section cases
        * @type get
        * @url /cases/sa/search
        * @param {string} type (SENTENCE|APPEAL)
        * @param {string} status (Open|Closed)
        * @param {string} sortedBy (total)
        * @param {string} reverse (true|false)
        * @param {string} pageSize
       */
  app.route('/cases/sa/search')
    .get(cases.search_sa_for_case)
};