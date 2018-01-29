// require all things

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require('mustache-express');
const destinationRouter = require('./controllers/destination');

// Config and Middleware
const app = express();
const PORT = process.env.PORT || 3000;


// To wire up the mustache templating engine with express and declare a views and
 // public directories to be accessible from our app add the following lines below 
 // where the app is initialized.

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// link up the morgan and bodyParser middlewares so we get nice logging
 // when we run the server and so we can parse request body data.

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('main');
});

app.use('/destination', destinationRouter);

//  catchall for any wayward web requests.
app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});


// kick off the server by listening to the port declared from before

app.listen(PORT, () => { console.log("Server started on " + PORT); });

