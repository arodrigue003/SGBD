var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/users_controller');

router.post('/authenticate', users_controller.authenticate);
router.use(users_controller.validate_token);

router.use('/recette', require('./api/recette'));
router.use('/users', require('./api/users'))

module.exports = router;