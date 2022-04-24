const sql = require('../db/varauksenPalvelutSQL');

module.exports = {

    haeVarauksenPalvelut: async (req, res) => {
        try {
            let asiakas_id = req.params.asiakas_id;

            let v = await sql.getVarauksenPalvelut(asiakas_id);

            if(v.length == 0){
                res.statusCode = 201;
                res.json(v);
            }else{
                res.statusCode = 200;
                res.json(v);
            }

           
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ msg: err });
        }
    },
    lisaaVarauksenPalvelut: async (req, res) => {

        try {
            let asiakas_id = req.params.asiakas_id;
            let varaus_id = req.body.varaus_id;
            let palvelu_id = req.body.palvelu_id;

            let v = await sql.insertVarauksenPalvelut(varaus_id, palvelu_id);

            res.statusCode = 200;
            res.json(v);

        }
        catch (err) {
            console.log("Error in server")
            if (err.errno == "1062") {
                res.statusCode = 600;
                res.json({ msg: err.sqlMessage })
            }

            else {
                res.statusCode = 400;
                res.json({ msg: err });
            }
        }
    },

    poistaVarauksenPalvelut: async (req, res) => {
        let varaus_id = req.params.varaus_id;
        let palvelu_id = req.params.palvelu_id;

        try {
            console.log("poistetaan palveluvaraus: " + varaus_id + " "+palvelu_id);
            let c = await sql.deleteVarauksenPalvelu(varaus_id, palvelu_id);

            res.status = 200;
            res.json(c);
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    haeVarauksenPalvelutEhdoilla: async (req, res) => {
        try {
            let alue_id = req.body.alue_id;
            let alkuPvm = req.body.alkuPvm + " 00:00:00";
            let loppuPvm = req.body.loppuPvm + " 23:59:00";

            console.log(req.body);

            let palvelut = await sql.getVarauksenPalvelutEhdoilla(alue_id, alkuPvm, loppuPvm);

            res.statusCode = 200;
            res.json(palvelut);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ msg: err });
        }
    },

}