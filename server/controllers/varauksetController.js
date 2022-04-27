const varausSql = require('../db/varausSQL');

module.exports = {

    haeVarauksetEhdoilla: async (req, res) => {
        try {
            let alue_id = req.body.alue_id;
            let alkuPvm = req.body.alkuPvm + " 00:00:00";
            let loppuPvm = req.body.loppuPvm + " 23:59:00";
            
            console.log(req.body);

            let varaukset = await varausSql.getVarauksetEhdoilla(alue_id, alkuPvm, loppuPvm);
            
            res.statusCode = 200;
            res.json(varaukset);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    haeVaraukset: async (req, res) => {

        let asiakas_id;

        if (req.params.asiakas_id == "") {
            asiakas_id = '%';
        } else {
            asiakas_id = req.params.asiakas_id;
        }

        try {

            console.log("haetaan varaukset asiakaalle: " + asiakas_id);
            let c = await varausSql.getVaraukset('%', asiakas_id);

            if (c.length == 0) {
                res.statusCode = 201;
                res.json({ msg: "Ei varauksia", asiakas_id });
            } else {
                res.status = 200;
                res.json(c);
            }
        }
        catch (err) {
            console.log("Error in server", err)
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    //Admin käyttäjän varaushallintaa varten
    haeKaikkiVaraukset: async (req, res) => {

        let alue_id = req.params.alue_id;

        try {
            console.log("haetaan kaikki varaukset");
            let c = await varausSql.getKaikkiVaraukset(alue_id);

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
        let varattu_alkupvm = req.body.varattu_alkupvm;
        let varattu_loppupvm = req.body.varattu_loppupvm;

        try {

            console.log("lisätään uusi varaus");
            let c = await varausSql.insertVaraus(asiakas_id, mokki_id, varattu_alkupvm, varattu_loppupvm);

            res.status = 200;
            res.json({ msg: "Varauksen lisäys onnistui" });
        }
        catch (err) {
            console.log("Error in server " + err)
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    muokkaaVaraus: async (req, res) => {
        try {
            let varaus_id = req.body.varaus_id;
            let varattu_alkupvm = req.body.varattu_alkupvm;
            let varattu_loppupvm = req.body.varattu_loppupvm;

            let alkupvm = new Date(varattu_alkupvm).valueOf() / 1000;
            let loppupvm = new Date(varattu_loppupvm).valueOf() / 1000;

            let c = await varausSql.updateVaraus(alkupvm, loppupvm, varaus_id);

            res.statusCode = 200;
            res.json({ msg: "Varauksen muokkaaminen onnistui." });
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ msg: "" + err });
        }
    },

}