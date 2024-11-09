const express = require('express');
const path = require('path')
const app = express(), 
            bodyParser=require('body-parser');
            port=8081;

const publicPath = path.join(__dirname+ '/../assignment8/dist/assignment8');
app.use(express.static(publicPath));

const axios = require('axios');
let api_key = 'YOUR_KEY';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/get_search', (req, res) => {

  let key = req.query.keyword;
  let dist = req.query.distance;
  let cat = req.query.category;
  let lat = req.query.lat;
  let lon = req.query.lon;
  let limit = 10;

  dist = parseInt(dist)*1609.344;
  // console.log(key, dist, cat, lat, lon);

  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`
    },
    params: {
      'term': key,
      'longitude': lon,
      'latitude': lat,
      'radius': parseInt(dist),
      'categories': 'cat',
      'limit': limit
    }
  };

  let url = 'https://api.yelp.com/v3/businesses/search';

  axios.get(url,config)
  .then(function(response) {
    // console.log('Done!');
    res.send(response['data']);
  });
});

app.get('/get_business', (req, res) => {

    let id = req.query.id;
    const config = {
      headers: {
        Authorization: `Bearer ${api_key}`
      }
    };

    let url = `https://api.yelp.com/v3/businesses/${id}`;

    result={};

    axios.get(url,config)
    .then(function(response) {

      if(response['data']['name']!=""){
        result['name']=response['data']['name'];
      }
      if(response['data']['location']['display_address']!=""){
        result['Address']=response['data']['location']['display_address'];
      }
      if(response['data']['categories']!=""){
        let str="";
        response['data']['categories'].forEach(element => {
          if(element['title']!=""){
            str += element['title']+'|';
          }
        });
        result['Category']=str.substring(0,str.length-1);
      }

      if(response['data']['phone']!=""){
        result['Phone']=response['data']['phone'];
      }
      if(response['data']['price']!=""){
        result['Price']=response['data']['price'];
      }
      if(response['data']['is_closed']!=null){
        if(response['data']['is_closed']===true){
          result['Status']="true";
        }
        else{
          result['Status']="false";
        }
      }
      if(response['data']['url']!=""){
        result['Url']=response['data']['url'];
      }
      if(response['data']['photos']!=""){
        result['Photos']=response['data']['photos'];
      }
      if(response['data']['coordinates']!=""){
        result['lat']=response['data']['coordinates']['latitude'];
        result['lon']=response['data']['coordinates']['longitude'];
      }
      res.send(JSON.stringify(result));
    });
});

app.get('/get_autocomplete', (req, res) => {
  let word = req.query.word;
  let lat = req.query.lat;
  let lon = req.query.lon;

  // console.log(word, lat, lon);

  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`
    },
    params: {
      'text': word,
      'latitude': lat,
      'longitude': lon
    }
  };

  let url = 'https://api.yelp.com/v3/autocomplete';

  let result = [];
  axios.get(url,config)
  .then(function(response) {

    response['data']['terms'].forEach(element => {
      result.push(element['text']);
    });
    response['data']['businesses'].forEach(element => {
      if(element['name'] != null){
        result.push(element['name']);
      }
      if(element['text'] != null){
        result.push(element['text']);
      }
    });
    response['data']['categories'].forEach(element => {
      if(element['title'] != null){
        result.push(element['title']);
      }
    });

    res.send(result);
  });

});

app.get('/get_reviews', (req, res) => {
  let id = req.query.id;
  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`
    }
  };

  let url = `https://api.yelp.com/v3/businesses/${id}/reviews`;

  axios.get(url,config)
    .then(function(response) {
      res.send(response['data']['reviews']);
  });
});

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname+ '/../assignment8/dist/assignment8/index.html'));
  
});

app.listen(8081, () => console.log("Listening on port 8081"));
