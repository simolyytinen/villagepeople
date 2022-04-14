var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/toimipisteController');


router.route('/api/toimipisteet').
    get(ctrl.haeToimipisteet);
    
router.route('/api/a/toimipisteet').
    post(ctrl.lisaaToimipiste);

router.route('/api/a/toimipisteet/:alueid').
    delete(ctrl.poistaToimipiste);

router.route('/api/a/toimipisteet/:alueid').
    put(ctrl.muokkaaToimipiste);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;