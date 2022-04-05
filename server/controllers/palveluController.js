const sql = require('../db/palveluSQL');

module.exports = {

    haePalvelut: async (req, res) => {

        //eri hakuvaihtoehdot? nimi, tyyppi(mitä tyyppi tarkoittaa kannassa?)

        let nimi = req.query.nimi || "";

        try {

            console.log("haetaan palveluja");
            let c = await sql.getPalvelut(nimi);

            // console.log("Next")

            res.status = 200;
            res.json({ status: "OK", palvelut: c });
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    lisaaPalvelu: async (req, res) => {
        let { alue_id, nimi, tyyppi, kuvaus, hinta, alv } = req.body;

        try {
            console.log("lisataan palvelu");
            let t = await sql.postPalvelu(req.body);
            res.status = 200;
            res.json({ status: "OK"/* , palvelut: t */ });
        } catch (error) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: error });
        }

    },
    poistaPalvelu: async (req, res) => {
        let palveluid = req.params.palveluid || "";
        try {
            let t = await sql.deletePalvelu(palveluid);
            res.status = 200;
            res.json({ status: "OK"/* , palvelut: t */ });

        } catch (error) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: error });

        }
    },
    muokkaaPalvelu: async (req, res) => {
        try {
            let palveluid = req.params.palveluid;
            let nimi = req.body.nimi;
            let tyyppi = req.body.tyyppi;
            let kuvaus = req.body.kuvaus;
            let hinta = req.body.hinta;
            let alv = req.body.alv;

            let a = await sql.updatePalvelu(palveluid, nimi, tyyppi, kuvaus, hinta, alv);

            res.statusCode = 200;
            res.json({ status: "OK"});
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },
}