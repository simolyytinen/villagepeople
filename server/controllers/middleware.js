var sql = require('../db/asiakasSQL');
var jwt = require('jsonwebtoken');

module.exports = {

    authenticate: async (req, res) => {
        try {
            // JWT = JSON web token 

            const username = req.body.username;
            const password = req.body.password;
  
            if ( username == 'admin' && password == 'admin')
            {
                // admin käyttäjä
                console.log("Admin-tunnus ja salasana oikein");
                let token = jwt.sign({admin: true, user: username}, "tosi-salainen-avain")
            
                res.status = 200;
                res.json({token: token});
                
            }
            else if ( username !== "admin")
            {
                // tarkistetaan kannasta löytyykö pari
                // username = sähköposti
                // password = etunimi
            
                // peruskäyttäjä
                let asiakas = await sql.getAsiakkaat("%", password, "%", username);
                
                if (asiakas.length == 0) {
                    console.log("Virheellinen tunnus ja salasana")
                    res.statusCode = 401;
                    res.json({error: "Virheellinen tunnus ja salasana"})
                }
                else {
                    console.log("Tunnus ja salasana oikein");
                    let token = jwt.sign({admin: false, user: username, id: asiakas[0].asiakas_id}, "tosi-salainen-avain")
            
                    res.statusCode = 200;
                    res.json({token: token, id: asiakas[0].asiakas_id});
                    
                }   
            }
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },
}