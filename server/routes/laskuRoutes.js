var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/laskuController');


router.route('/api/laskut/:lasku_id').
    get(ctrl.haeLasku);
    
router.route('/api/laskut/').
    get(ctrl.haeLaskut);

    
router.route('/api/laskut').
    post(ctrl.lisaaLasku);

router.route('/api/laskut/:lasku_id').
    delete(ctrl.poistaLasku);

router.route('/api/laskut').
    put(ctrl.muokkaaLasku);

router.route('/api/avoimetvaraukset').
    get(ctrl.haeAvoimetVaraukset);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;