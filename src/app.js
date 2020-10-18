try{
  var express = require('express');
  var bodyParser = require('body-parser');
  var cors = require('cors');

}catch(error){
  console.error("ERROR are all the Dependencies installed?");
  console.log(error);
  process.exit(1);
}

var port = 4000;
var app = express(); 
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var sign_s3 = require('./controllers/sign_s3');

app.use('/sign_s3', sign_s3.sign_s3);

app.get('/get', function(req, res) {
  res.send('hello world');
});

app.listen(port);

console.log("start localhost:" + port )
