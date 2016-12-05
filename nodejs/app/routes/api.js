var express = require('express');
var router = express.Router();

router.use('/recette', require('./api/recette'));


module.exports = router;