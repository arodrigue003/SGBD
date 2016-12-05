var express = require('express');
var router = express.Router();

var recette_controller = require('../controllers/recette_controller');

router.get('/', recette_controller.index_view);
router.post('/add_comment/:id', recette_controller.add_comment);
router.get('/:id', recette_controller.index_view);

module.exports = router;