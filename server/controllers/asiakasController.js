
const sql = require('../db/asiakasSQL');

module.exports = {

    haeAsiakkaat: async (req, res) => {
        let asiakas_id;
        let etunimi;
        let sukunimi; 
        req.body.asiakas_id ? asiakas_id = req.body.asiakas_id : asiakas_id = "%";
        req.body.etunimi ? etunimi = req.body.etunimi + "%" : etunimi = "%";
        req.body.sukunimi ? sukunimi = req.body.sukunimi + "%" : sukunimi = "%";

        try {
            let asiakkaat = await sql.getAsiakkaat(asiakas_id, etunimi, sukunimi);

            res.statusCode = 200;
            res.json(asiakkaat);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    lisaaAsiakas: async (req, res) => { // EI VALMIS
        try {
            let postinro = req.body.postinro;
            let etunimi = req.body.etunimi;
            let sukunimi = req.body.sukunimi;
            let lahiosoite = req.body.lahiosoite;
            let email = req.body.email;
            let puhelinnro = req.body.puhelinnro;

            // Tarkistus löytyykö postinumero jo kannasta, jos ei niin lisätään ensin

            // sen jälkeen luodaan asiakas
            let a = await sql.postAsiakas(asiakas);

            res.statusCode = 201;
            res.json({msg : "Lisääminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    poistaAsiakas: async (req, res) => { // EI VALMIS
        try {
            let asiakas_id = req.params.asiakasid;

            // tarkistus löytyykö asiakkaalta varauksia / laskuja, jos löytyy -> ei voida poistaa
            
            // TÄHÄN VIRHEVIESTI JA KOODI JOS EI VOIDA PALAUTTAA

            // jos voidaan poistaa, poistetaan
            let a = await sql.deleteAsiakas(asiakas_id);

            res.statusCode = 200;
            res.json({msg : "Poistaminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    muokkaaAsiakasta: async (req, res) => { // EI VALMIS
        try {
            let asiakas_id = req.params.asiakasid;
            let postinro = req.body.postinro;
            let etunimi = req.body.etunimi;
            let sukunimi = req.body.sukunimi;
            let lahiosoite = req.body.lahiosoite;
            let email = req.body.email;
            let puhelinnro = req.body.puhelinnro;

            // tarkistus löytyykö postinumero jo kannasta, jos ei löydy niin luodaan se

            // sen jälkeen muokataan asiakas
            let a = await sql.updateAsiakas(asiakas_id, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro);

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