var express = require('express');
var router = express.Router();


router.use('/api', require('./api'));
router.use('/', require('./home'));
router.use('/recette', require('./recette_view'));
router.use('/ingredient', require('./ingredient_view'));
router.use('/about', function (req, res) {
    return res.render('about')
});
router.use('/contact', function (req, res) {
    return res.render('contact')
});
router.use('/troll', function (req, res) {
    return res.render('troll')
});
router.use('/test', function (req, res) {
    return res.render('test')
});

module.exports = router;
