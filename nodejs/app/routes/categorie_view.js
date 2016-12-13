var express = require('express');
var router = express.Router();

var categorie_controller = require('../controllers/categorie_controller');

router.get('/', categorie_controller.liste);
router.get('/:id', categorie_controller.index);

module.exports = router;