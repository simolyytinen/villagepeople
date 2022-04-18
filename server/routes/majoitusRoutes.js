var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/majoitusController');


router.route('/api/mokit/:alue_id').
    get(ctrl.haeMokit);
    
router.route('/api/mokit/').
    get(ctrl.haeMokit);

router.route('/api/vapaatmokit').
    post(ctrl.haeVapaatMokit);
    
router.route('/api/mokit').
    post(ctrl.lisaaMokki);

router.route('/api/mokit/:mokki_id').
    delete(ctrl.poistaMokki);

router.route('/api/mokit').
    put(ctrl.muokkaaMokki);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;