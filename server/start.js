var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

// importataan reitit

const toimipisteRoutes = require('./routes/toimipisteRoutes');
app.use(toimipisteRoutes);

const palveluRoutes = require('./routes/palveluRoutes');
app.use(palveluRoutes);

const asiakasRoutes = require('./routes/asiakasRoutes');
app.use(asiakasRoutes);

const majoitusRoutes = require('./routes/majoitusRoutes')
app.use(majoitusRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});