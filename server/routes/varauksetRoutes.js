var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/varauksetController');


router.route('/api/varaukset/:asiakas_id').
    get(ctrl.haeVaraukset);

router.route('/api/varaukset/:varaus_id').
    delete(ctrl.poistaVaraus);

router.route('/api/varaukset').
    post(ctrl.lisaaVaraus);

// router.route('/api/varaukset').
//     put(ctrl.muokkaaVaraus);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;