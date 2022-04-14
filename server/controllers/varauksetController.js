const varausSql = require('../db/varausSQL');

module.exports = {

    haeVaraukset: async (req, res) => {

        let asiakas_id = req.params.asiakas_id;

        try {

            console.log("haetaan asiakkaan varaukset");
            let c = await varausSql.getVaraukset('%', asiakas_id);

            res.status = 200;
            res.json(c);
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    poistaVaraus: async (req, res) => {

        let varaus_id = req.params.varaus_id;

        try {

            console.log("poistetaan varaus: " + varaus_id);
            let c = await varausSql.deleteVaraus(varaus_id);

            res.status = 200;
            res.json(c);
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    lisaaVaraus: async (req, res) => {

        let asiakas_id = req.body.asiakas_id;
        let mokki_id = req.body.mokki_id;
        // let varattu_pvm = req.body.varattu_pvm; //nykyinen aika sql lauseessa
        // let vahvistus_pvm = req.body.vahvistus_pvm; //tämä pitäis tulla clientiltä? nyt sql lauseessa vahvistus + 1 pv
        let varattu_alkupvm = req.body.varattu_alkupvm;
        let varattu_loppupvm = req.body.varattu_loppupvm;

        try {

            console.log("lisätään uusi varaus");
            let c = await varausSql.insertVaraus(asiakas_id, mokki_id, /* varattu_pvm, vahvistus_pvm, */ varattu_alkupvm, varattu_loppupvm);

            res.status = 200;
            res.json(c);
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

}