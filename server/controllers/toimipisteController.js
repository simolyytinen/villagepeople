
const sql = require('../db/toimipisteSQL');
const mokkisql = require('../db/majoitusSQL');

module.exports = {

    haeToimipisteet: async (req, res) => {
        try {
            let alue_id = "%";
            let toimipisteet = await sql.getToimipisteet(alue_id);

            res.statusCode = 200;
            res.json(toimipisteet);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    lisaaToimipiste: async (req, res) => {
        try {
            let nimi = req.body.nimi;
            let a = await sql.postToimipiste(nimi);

            res.statusCode = 201;
            res.json({msg : "Lisääminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    poistaToimipiste: async (req, res) => { // EI VALMIS!
        try {
            let alueid = req.params.alueid;
            let m = await mokkisql.getMokit(alueid);
            if (m.length == 0) {
                let a = await sql.deleteToimipiste(alueid);
                res.statusCode = 200;
                res.json({msg : "Poistaminen onnistui."});
            }
            else {
                res.statusCode = 400;
                res.json({msg : "Aluetta ei voida poistaa, siihen liittyy mökkejä."});
            }
            
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    muokkaaToimipiste: async (req, res) => {
        try {
            let alueid = req.params.alueid;
            let nimi = req.body.nimi;

            let a = await sql.updateToimipiste(nimi, alueid);

            res.statusCode = 200;
            res.json({msg : "Muokkaaminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

}