var express = require('express');
var router = express.Router();


router.use('/api', require('./api'));
router.use('/', require('./home'));
router.use('/recette', require('./recette_view'));
router.use('/ingredient', require('./ingredient_view'));

module.exports = router;
