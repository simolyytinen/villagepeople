const sql = require('../db/laskuSQL');
const postiSql = require('../db/postiSQL');
const alueSql = require('../db/toimipisteSQL');
const varausSql = require('../db/varausSQL');

module.exports = {

    haeLasku: async (req, res) => {
        try {
            let lasku_id;
            req.params.lasku_id ? lasku_id = req.params.lasku_id : lasku_id = "%";
            let lasku = await sql.getLasku(lasku_id);

            res.statusCode = 200;
            res.json(lasku);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    //Admin käyttäjän laskuhallintaa varten
    haeLaskut: async (req, res) => {

        try {

            console.log("haetaan kaikki laskut");
            let c = await laskuSql.getLaskut();

            res.status = 200;
            res.json(c);

        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    lisaaLasku: async (req, res) => {
        try {
            let varaus_id = req.body.varaus_id;
            let summa = req.body.summa; 
            let alv = req.body.alv; 
            

            let t = await varausSql.getVaraukset(varaus_id);
            if (t.length > 0) {
                let a = await sql.postLasku(varaus_id, summa, alv);

                res.statusCode = 201;
            res.json({msg : "Laskun lisääminen onnistui."});
                
            }
            
            
            

            
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    poistaLasku: async (req, res) => {
        try {
            let lasku_id = req.params.lasku_id;

            let v = await laskuSql.getLaskut(lasku_id, "%");
            
            if (v.length == 0) {
                let a = await sql.deleteLasku(lasku_id);

                res.statusCode = 200;
                res.json({msg : "Laskun poistaminen onnistui."});
            }
            else {
                res.statusCode = 600;
                res.json({msg : "Laskua ei voida poistaa, siihen liittyy varauksia"});
            }

            
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    muokkaaLasku: async (req, res) => {
        try {
            let lasku_id = req.body.lasku_id;
            let varaus_id = req.body.varaus_id;
            let summa = req.body.summa; 
            let alv = req.body.alv; 
            

            // samat tarkastukset kun lisäyksen tapauksessa?

            let a = await sql.updateLasku(lasku_id, varaus_id, summa, alv);

            res.statusCode = 200;
            res.json({msg : "Laskun muokkaaminen onnistui."});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

}