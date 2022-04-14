var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');



app.use(bodyParser.json());

var port = 3004;
var hostname = "127.0.0.1";

var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

// Autentikointi
const middlewareRoutes = require('./routes/mRoutes');
app.use(middlewareRoutes);

// Error luokka
function error(status, msg) {
  // Error on geneerinen JS-luokka virheitä varten
  var err = new Error(msg);
  err.status = status;
  return err;
}

// Autorisointi
// /api/a alkusiin palveluihin pääsee vain admin käyttäjä

app.use('/api/a', function(req, res, next){

  // Tämä tarkoittaa sitä, että jokaisessa kutsussa tulee api-key query-parametri
  // josta se tarkistetaan AINA ennen jokaista kutsua joka on muodossa /api/xxxx 
  console.log("headers:", req.headers);
  
  if ( !req.headers.authorization)
  {
      // header puuttuu -> virhe
      return next(error(401, 'Authorization header puuttuu!'));
  }
  else {
      const data = req.headers.authorization;

      console.log("authorization:", data);

      // An application can support multiple authentication schemes (Bearer, Basic, Digest), so it's always recommended to check the
      // authentication schema first.
      const authorization = data.split(' ');
      if ( authorization[0] == "Bearer")
      {
          // Tarkistetaan token

          const token = authorization[1];
          const tokenData = jwt.verify(token, "tosi-salainen-avain");

          if ( tokenData.admin === true)
              return next();
          else 
              return next(error(401, 'Käyttöoikeus ei riitä'));
      }
      else {
        return next(error(401, 'authorization scheme väärin!'));
      }
      
  }
});

// importataan reitit

const toimipisteRoutes = require('./routes/toimipisteRoutes');
app.use(toimipisteRoutes);

const palveluRoutes = require('./routes/palveluRoutes');
app.use(palveluRoutes);

const asiakasRoutes = require('./routes/asiakasRoutes');
app.use(asiakasRoutes);

const majoitusRoutes = require('./routes/majoitusRoutes')
app.use(majoitusRoutes);

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});