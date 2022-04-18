
const sql = require('../db/asiakasSQL');
const postiSql = require('../db/postiSQL');
const varausSql = require('../db/varausSQL');

module.exports = {

    haeAsiakkaat: async (req, res) => {
        try {
            let asiakas_id;
            let etunimi;
            let sukunimi;
            let email; 
            if (req.params.asiakas_id) asiakas_id = req.params.asiakas_id;
            else if (req.body.asiakas_id) asiakas_id = req.body.asiakas_id
            else asiakas_id = "%";
            req.body.etunimi ? etunimi = req.body.etunimi + "%" : etunimi = "%";
            req.body.sukunimi ? sukunimi = req.body.sukunimi + "%" : sukunimi = "%";
            req.body.email ? email = req.body.email : email = "%";

            let asiakkaat = await sql.getAsiakkaat(asiakas_id, etunimi, sukunimi, email);

            res.statusCode = 200;
            res.json(asiakkaat);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    lisaaAsiakas: async (req, res) => {
        try {
            let postinro = req.body.postinro;
            let etunimi = req.body.etunimi;
            let sukunimi = req.body.sukunimi;
            let toimipaikka = req.body.toimipaikka;
            let lahiosoite = req.body.lahiosoite;
            let email = req.body.email;
            let puhelinnro = req.body.puhelinnro;

            let t = await postiSql.getPostinumero(postinro);
            if (t.length > 0) {
                let a = await sql.postAsiakas([postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro]);
                
            }
            else {
                let l = await postiSql.postPostinumero(postinro, toimipaikka);
                let a = await sql.postAsiakas([postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro]);
            }

            res.statusCode = 201;
            res.json({msg : "Lisääminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    poistaAsiakas: async (req, res) => {
        try {
            let asiakas_id = req.params.asiakasid;

            let v = await varausSql.getVaraukset("%", asiakas_id);

            if (v.length > 0) {
                res.statusCode = 600;
                res.json({msg : "Ei voida poistaa asiakasta, sillä on varauksia"})
            }
            else {
                let a = await sql.deleteAsiakas(asiakas_id);
                res.statusCode = 200;
                res.json({msg : "Poistaminen onnistui."});
            }
            
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    muokkaaAsiakasta: async (req, res) => {
        try {
            let asiakas_id = req.body.asiakas_id;
            let postinro = req.body.postinro;
            let toimipaikka = req.body.toimipaikka;
            let etunimi = req.body.etunimi;
            let sukunimi = req.body.sukunimi;
            let lahiosoite = req.body.lahiosoite;
            let email = req.body.email;
            let puhelinnro = req.body.puhelinnro;

            let t = await postiSql.getPostinumero(postinro);

            if (t.length > 0) { // tarkistetaan löytyykö postinumero kannasta, jos ei löydy niin lisätään
                let a = await sql.updateAsiakas(asiakas_id, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro);
                
            }
            else {
                let l = await postiSql.postPostinumero(postinro, toimipaikka);
                let a = await sql.updateAsiakas(asiakas_id, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro);
            }

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