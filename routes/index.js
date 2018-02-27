var express = require('express');
var open = require("open");

//modulos que requerimos para el scraper
const request = require("tinyreq"),
  cheerio= require("cheerio");


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*GET for information of conpany for google---alvaro---*/
router.get('/mocainfconpany', function(req, res, next) {
  var empresas = req.query.empresa || '';
  //res.render('index', { title: empresas });
  //------------------------------------------
  //E M P E S A M O S - - S C R A P E R
  //const base_url='https://www.google.com/search?client=windows&channel=fs&q=acex&ie=utf-8&oe=utf-8';//el link original
  const base_url='https://www.google.com/search?client=windows&channel=fs&q='+empresas+'&ie=utf-8&oe=utf-8';
  var lista=[];
  var alvaro;
  request(base_url, function(err, body) {
    const $ = cheerio.load(body);

    $('cite').each(function(i,elem){
      lista[i]=$(this).text();
      lista.join(',');
    });
    alvaro=lista[0];
    console.log(alvaro);
    /*res.statusCode = 302;
    res.setHeader("Location", alvaro);
    res.end();*/
    res.render('index', { title: empresas });
    //res.open("http://www.google.com");
});
  //console.log(alvaro);
  //res.render('index', { title: empresas });
});


module.exports = router;
