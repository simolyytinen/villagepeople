var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/customerController');

// HUOM! Tässä on vain esimerkin vuoksi määritelty erilaisia reittejä, toisessa on /api, toisessa ei
// Tähän ei liity mitään mystiikkaa, otettu mukaan vain esimerkin vuoksi.
 
router.route('/Asiakas').
    get(ctrl.fetch);

router.route('/api/studenttype').
    get(ctrl.fetchTypes);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;