var express = require('express');
var ejs = require('ejs');
var port = 8080;
var app = express();
const Pool = require('pg').Pool
var cors = require('cors')
const sdk = require('api')('@candidapi/v1.0#gt6359l8nax80e');
const bodyParser = require("body-parser");    


app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
sdk.auth('237b55da00144f3fb2ce3fc3189cc537');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'newpass',
  port: 5432,
})

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to postgreSQL");
});


app.get("/", (req, res) => {
  res.sendFile("./index.html", {
      root: __dirname,
  });
});


app.get("/candid", (req, res) => {
  sdk.eligible({ein: '56-2618866', provider: 'apple'})
    .then(({ data }) => res.json(data))
    .catch(err => console.error(err));
});

app.post("/candid", (req, res) => {
  // console.log('ein', req.body.eIn)
  // console.log('Provider', req.body.provider)
  sdk.eligible({ein: `${req.body.eIn}`, provider: `${req.body.provider}`})
    .then(({ data }) => res.json(data))
    .catch(err => console.error(err));
});


app.listen(port, () => {
  console.log(`Listening to port ${port}`)
});
