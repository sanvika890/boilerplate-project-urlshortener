require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
const urls=[];

app.post("/api/shorturl",function(req,res){
  const url = req.body.url
  dns.lookup(url,(err,data,family)=>{
    if(err===null){
      const random = Math.floor(Math.random(0,1)*100)
      urls.push({original_url : url, short_url : random})
      res.json({original_url : url, short_url : random})
    }else{
      res.json({ error: 'invalid url' })
    }
  })
})

app.get("/api/shorturl/:id",function(req,res){
  const url = urls.filter((item)=>item.short_url == req.params.id)[0].original_url
  res.redirect(url)
  
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
