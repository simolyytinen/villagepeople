const sql = require('../db/majoitusSQL');
const postiSql = require('../db/postiSQL');
const alueSql = require('../db/toimipisteSQL');
const varausSql = require('../db/varausSQL');

module.exports = {

    haeMokit: async (req, res) => {
        try {
            let alue_id;
            req.params.alue_id ? alue_id = req.params.alue_id : alue_id = "%";
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

    haeVapaatMokit: async (req, res) => {
        try {
            let alue_id_taulukko = req.body.alueet;
            let alkuPvm = req.body.alkuPvm;
            let loppuPvm = req.body.loppuPvm;
            
            console.log(req.body);

            let mokit = await sql.getVapaatMokit(alue_id_taulukko, alkuPvm, loppuPvm);
            
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

            let t = await postiSql.getPostinumero(postinro);
            if (t.length > 0) {
                let a = await sql.postMokki(alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu);
                
            }
            else {
                let alue = await alueSql.getToimipisteet(alue_id);
                let l = await postiSql.postPostinumero(postinro, alue[0].nimi);
                let a = await sql.postMokki(alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu);
            }
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

            let v = await varausSql.getVaraukset(mokki_id, "%");
            
            if (v.length == 0) {
                let a = await sql.deleteMokki(mokki_id);

                res.statusCode = 200;
                res.json({msg : "Mökin poistaminen onnistui."});
            }
            else {
                res.statusCode = 600;
                res.json({msg : "Mökkiä ei voida poistaa, siihen liittyy varauksia"});
            }

            
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    muokkaaMokki: async (req, res) => {
        try {
            let mokki_id = req.body.mokki_id;
            let alue_id = req.body.alue_id;
            let postinro = req.body.postinro; 
            let mokkinimi = req.body.mokkinimi; 
            let katuosoite = req.body.katuosoite; 
            let hinta = req.body.hinta; 
            let kuvaus = req.body.kuvaus; 
            let henkilomaara = req.body.henkilomaara; 
            let varustelu = req.body.varustelu;

            // samat tarkastukset kun lisäyksen tapauksessa?

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