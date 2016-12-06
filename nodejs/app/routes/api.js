var express = require('express');
var router = express.Router();

router.use('/recette', require('./api/recette'));
router.use('/users', require('./api/users'))

module.exports = router;