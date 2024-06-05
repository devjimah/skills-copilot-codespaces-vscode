// Create web server 
// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the path to the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Path: comments.js
// Create a variable to store the comments
var comments = [];

// Path: comments.js
// Read the comments from the file
fs.readFile('comments.json', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});

// Path: comments.js
// Create the route for the home page
app.get('/', function(req, res) {
  res.render('index', {comments: comments});
});

// Path: comments.js
// Create the route for the comments
app.post('/comments', function(req, res) {
  var comment = {
    name: req.body.name,
    message: req.body.message
  };
  
  comments.push(comment);
  
  fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Path: comments.js
// Start the server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});