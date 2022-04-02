const sql = require('../db/majoitusSQL');

module.exports = {

    haeMokit: async (req, res) => {
        try {
            let alue_id;
            req.body.alue_id ? alue_id = req.body.alue_id : alue_id = "%";
            let mokit = await sql.getMokit(alue_id);

            res.statusCode = 200;
            res.json(mokit);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    lisaaMokki: async (req, res) => {
        try {
            
            let alue_id = req.body.alue_id;
            let postinro = req.body.postinro; 
            let mokkinimi = req.body.mokkinimi; 
            let katuosoite = req.body.katuosoite; 
            let hinta = req.body.hinta; 
            let kuvaus = req.body.kuvaus; 
            let henkilomaara = req.body.henkilomaara; 
            let varustelu = req.body.varustelu;

            // Alue id:n tarkistus ja postinumeron tarkistus
            let a = await sql.postMokki(alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu);

            res.statusCode = 201;
            res.json({msg : "Mökin lisääminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    poistaMokki: async (req, res) => {
        try {
            let mokki_id = req.params.mokki_id;

            // TARKASTUS ETTÄ ONKO MÖKKIIN OLEMASSA VARAUKSIA?

            let a = await sql.deleteMokki(mokki_id);

            res.statusCode = 200;
            res.json({msg : "Mökin poistaminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    muokkaaMokki: async (req, res) => {
        try {
            let mokki_id = req.params.mokki_id;
            let alue_id = req.body.alue_id;
            let postinro = req.body.postinro; 
            let mokkinimi = req.body.mokkinimi; 
            let katuosoite = req.body.katuosoite; 
            let hinta = req.body.hinta; 
            let kuvaus = req.body.kuvaus; 
            let henkilomaara = req.body.henkilomaara; 
            let varustelu = req.body.varustelu;

            let a = await sql.updateMokki(alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, mokki_id);

            res.statusCode = 200;
            res.json({msg : "Mökin muokkaaminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

}