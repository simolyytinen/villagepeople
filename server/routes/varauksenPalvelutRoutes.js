var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/varauksenPalvelutController');


router.route('/api/varauksenPalvelut/:asiakas_id').
    get(ctrl.haeVarauksenPalvelut);
    
router.route('/api/varauksenPalvelut').
    post(ctrl.lisaaVarauksenPalvelut);

router.route('/api/varauksenPalvelut/:varaus_id').
    delete(ctrl.poistaVarauksenPalvelut);

// router.route('/api/varauksenPalvelut/:varaus_id').
//     put(ctrl.muokkaaVarauksenPalvelut);

router.route('/api/varauksenPalvelutEhdoilla').
    post(ctrl.haeVarauksenPalvelutEhdoilla);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;