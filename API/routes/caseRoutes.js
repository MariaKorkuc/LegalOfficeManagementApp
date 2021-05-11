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
};