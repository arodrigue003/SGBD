var express = require('express');
var router = express.Router();

var ingredient_controller = require('../controllers/ingredient_controller');

//router.get('/', ingredient_controller.search_view);
//router.get('/:id', ingredient_controller.item_view);
router.get('/classement', ingredient_controller.ranking_view);

module.exports = router;