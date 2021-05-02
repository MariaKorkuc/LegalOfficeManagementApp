'use strict';
module.exports = function(app) {
  var sa = require('../controllers/sentenceappealController');
  
  app.route('/sa')
    .get(sa.list_all_sa)
    .post(sa.create_an_sa)
    
  app.route('/sa/:saId')
  .get(sa.read_an_sa)
  .put(sa.update_an_sa)
  .delete(sa.delete_an_sa)
};