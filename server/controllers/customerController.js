
const sql = require('../db/customerSQL');

module.exports = {

    fetch: async (req, res) => {
        console.log("fetch started ...");

        try {
            let nimi = req.query.nimi;
            let osoite = "";

            let c = await sql.getCustomers(nimi, osoite);
            console.log("Next")
            let t = await sql.getCustomerTypesByLyhenne("YA");
            console.log("done")

            res.status = 200;
            res.json({ status: "OK", customers : c, types : t  });
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },

    fetchTypes: async (req, res) => {
        console.log("fetchTypes started ...");

        try {
            let lyhenne = req.query.lyhenne || '';

            let c = [];
            if ( !lyhenne )
                c = await sql.getCustomerTypes();
            else 
                c = await sql.getCustomerTypesByLyhenne(lyhenne);
                
            res.status = 200;
            res.json(c);
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },

}