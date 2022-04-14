var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/middleware');

    
router.route('/api/authenticate').
    post(ctrl.authenticate);


// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;