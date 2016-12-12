var express = require('express');
var router = express.Router();

var recette_controller = require('../../controllers/recette_controller');

router.post('/', recette_controller.create);
router.post('/add_comment/:id', recette_controller.add_comment);
router.post('/add_rating/:id', recette_controller.add_rating);
router.post('/edit/:id', recette_controller.edit_recette)
router.get('/edit/:id', recette_controller.edit_recette_view);
router.get('/', recette_controller.retrieve_all);
router.get('/:id', recette_controller.retrieve);
router.put('/:id', recette_controller.update);
router.delete('/:id', recette_controller.delete);


module.exports = router;