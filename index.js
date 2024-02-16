require('dotenv').config();
const dns = require('node:dns')
const express = require('express');
const cors = require('cors');
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Basic Configuration
const port = process.env.port || 3000;


app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl",function(req,res){
  const url = req.body.url
  dns.lookup(url,(err,data,family)=>{
    if(err===null){
      const random = Math.floor(Math.random(0,1)*100)
      app.get("/api/shorturl/"+random,function(req,res){
        res.redirect(url)
      })
      res.json({original_url : url, short_url : random})
    }else{
      res.json({ error: 'invalid url' })
    }
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
