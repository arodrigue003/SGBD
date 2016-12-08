var express = require('express');
var router = express.Router();

var recette_controller = require('../controllers/recette_controller');

router.get('/', recette_controller.search_view);
router.get('/:id', recette_controller.item_view);

module.exports = router;