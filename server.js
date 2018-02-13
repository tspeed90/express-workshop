var express = require('express');
var app = express();
var formidable = require('express-formidable');
var fs = require('fs');

app.use(formidable());
app.use(express.static('public'));

app.post('/create-post', function(req, res) {
  var post = req.fields.blogpost;
  var currentDate = Date.now();

  fs.readFile(__dirname + '/data/posts.json',  function (err, file) {
    if (!err) {
      var parsedFile = JSON.parse(file); 
      parsedFile[currentDate] = post;
      var fileToWrite = JSON.stringify(parsedFile);
      console.log(fileToWrite);
    }
    
    fs.writeFile(__dirname + '/data/posts.json', fileToWrite, function(err) {
      if (err) {
        console.log(err);
      }
      res.send({blogpost: post});
    });
  }); 
});

app.get('/get-posts', function (req, res) {
  var file = __dirname + '/data/posts.json';
    res.sendFile(file);
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000!');
});
