const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/url', (req, res) => {
  const uri = "mongodb+srv://akjha992:akjha%40123@cluster0-e15zh.mongodb.net/mydb?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
      const collection = client.db("mydb").collection("got");
      collection.find().toArray(function(err, docs) {
        console.log(docs[0]);
        res.send(docs[0]);
        db.close()
      })
    client.close();
  });
});
app.post('/setUrl', function(req, res) {
  var url = req.body.url;
  console.log(url); 
  const uri = "mongodb+srv://akjha992:akjha%40123@cluster0-e15zh.mongodb.net/mydb?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
      const collection = client.db("mydb").collection("got");
      collection.updateOne({'title':'GOT'}, {$set:{'url':url}}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
      client.close();
      res.send('set successfully');
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
