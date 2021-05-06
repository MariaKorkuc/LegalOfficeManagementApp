'use strict';
module.exports = function(app) {
    var Judges = require('../controllers/judgeController');
  
    app.route('/judges')
        .get(Judges.list_all_judges)
        .post(Judges.create_a_judge)
    
    app.route('/judges/:judgeId')
        .get(Judges.read_a_judge)
        .put(Judges.update_a_judge)
        .delete(Judges.delete_a_judge)
};