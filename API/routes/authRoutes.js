const loginController = require('../controllers/loginController');

exports.authRoutes = function(app) {
  app.route('/auth/register')
    .post(loginController.register_new_user);

  app.route('/auth/login')
    .post(loginController.log_in_user);

};