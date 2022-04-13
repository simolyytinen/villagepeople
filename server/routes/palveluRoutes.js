var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/palveluController');


router.route('/api/palvelut').
    get(ctrl.haePalvelut);

router.route('/api/palvelut/kortit').
get(ctrl.haePalveluKortit);

router.route('/api/palvelut').
    post(ctrl.lisaaPalvelu);

router.route('/api/palvelut/:palveluid').
    delete(ctrl.poistaPalvelu);

router.route('/api/palvelut/:palveluid').
    put(ctrl.muokkaaPalvelu);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;