module.exports = function(app) {
    const {
        users_with_most_cases,
        documents_per_cases,
        longest_cases
    } = require('../controllers/analyticClontroller');

    app.route('/analytics/users_per_cases')
        .get(users_with_most_cases)    

    app.route('/analytics/documents_per_cases')
        .get(documents_per_cases)

    app.route('/analytics/longest_cases')
        .get(longest_cases)
};