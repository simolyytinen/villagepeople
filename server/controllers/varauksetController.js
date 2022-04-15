const varausSql = require('../db/varausSQL');

module.exports = {

    haeVaraukset: async (req, res) => {

        let asiakas_id;

        if (req.body.asiakas_id == ""){
            asiakas_id = '%';
        }else{
            asiakas_id = req.body.asiakas_id;
        }

        try {

            console.log("haetaan varaukset asiakaalle: " + asiakas_id);
            let c = await varausSql.getVaraukset('%', asiakas_id);

            if (c.length == 0){
                res.statusCode = 400;
                res.json({msg: "Ei varauksia", asiakas_id});
            }else{
                res.status = 200;
                res.json(c);
            }
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
        // let varattu_pvm = req.body.varattu_pvm; //kantaan menee SQL:ssä current_timestamp()
        // let vahvistus_pvm = req.body.vahvistus_pvm; //tämä pitäis tulla clientilta, kun kuitataan varaus jotenkin? nyt kantaan menee SQL:ssä current_timestamp + 1 pv
        let varattu_alkupvm = req.body.varattu_alkupvm;
        let varattu_loppupvm = req.body.varattu_loppupvm;

        try {

            console.log("lisätään uusi varaus");
            let c = await varausSql.insertVaraus(asiakas_id, mokki_id, /* varattu_pvm, vahvistus_pvm, */ varattu_alkupvm, varattu_loppupvm);

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

            let c = await varausSql.updateVaraus(varattu_alkupvm, varattu_loppupvm, varaus_id);

            res.statusCode = 200;
            res.json({ msg: "Palvelun muokkaaminen onnistui." });
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ msg: "" + err });
        }
    },

}