var express = require('express');
var router = express.Router();

var categorie_controller = require('../../controllers/categorie_controller');

router.get('/', recette_controller.get_noms);


module.exports = router;