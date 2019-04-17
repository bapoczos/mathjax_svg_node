// to run this type in the termiinal:
//node svg-metadata-pb-v4.js
// then open
// http://localhost:8080/?tex=\begin{vmatrix}%20\int_a^b(f(x)dx)%20%26%20\mathbf{j}%20\\%20\sin(x)%20%26%20\cos(y)%20\end{vmatrix}

var tape = require('tape');
var mjAPI = require("../lib/main.js");
var jsdom = require('jsdom').jsdom;
var url = require('url');


var express = require('express');
var cors = require('cors');

var app = express();

const fs = require('fs') 


tape('the SVG output should add dimensions and styles', function(t) {
  t.plan(3);

app.use(cors());

app.get('/', handler);

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});




function handler(req,res){  
  mjAPI.start();
	
  //res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  res.writeHead(200, {'Content-Type': 'text/html'  });
  
  console.log(req.url);
  
  var q = url.parse(req.url, true).query;
  
  //var q = url.parse(encodeURIComponent(req.url), true).query;
  
  var reqtex = q.tex; // http://localhost:8080/?tex='/sin(x)'
  
  
  
  mjAPI.typeset({
    ex: 16,
    math: reqtex,
    format: "TeX",
    svg: true
  }, function(data) {
    t.ok(data.width, 'Width is present');
    t.ok(data.height, 'Height is present');
    t.ok(data.style, 'Style is present');
    console.log(data.svg);
    console.log(data.width);
    console.log(data.height);
	  
    fs.writeFile('Output.svg', data.svg, (err) => { 
	// In case of a error throw err. 
	if (err) throw err; 
	}) 
    res.end(data.svg);
  })
};


/*
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/


  
//http://localhost:8080/?tex=\begin{vmatrix}%20\int_a^b(f(x)dx)%20%26%20\mathbf{j}%20\\%20\sin(x)%20%26%20\cos(y)%20\end{vmatrix}

});



  


