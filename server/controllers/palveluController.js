const sql = require('../db/palveluSQL');

module.exports = {

    haePalvelut: async (req, res) => {

        //eri hakuvaihtoehdot? nimi, tyyppi(mitä tyyppi tarkoittaa kannassa?)

        let nimi = req.query.nimi || "";

        try {

            console.log("haetaan kaikki palvelut");
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
}