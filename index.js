// require all things

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require('mustache-express');
const passport = require('passport');
const session = require('express-session');
//const auth = require('./services/auth.js');
const cookieParser = require('cookie-parser');

// Config and Middleware
const app = express();
const PORT = process.env.PORT || 4000;


// To wire up the mustache templating engine with express and declare a views and
 // public directories to be accessible from our app add the following lines below 
 // where the app is initialized.

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// set up session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// ====================================================================
// PASSPORT STUFF
//const passport = require('passport');
const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

// END PASSPORT STUFF


// link up the morgan and bodyParser middlewares so we get nice logging
 // when we run the server and so we can parse request body data.

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const destinationRouter = require('./controllers/destination');
app.use('/', destinationRouter);

app.get('/', (req, res) => {
  res.render('main');
});

//  catchall for any wayward web requests.
app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});

// ______________________________________________________



// set up the user controller

const userRouter = require('./controllers/users.js');
app.use('/users', userRouter);

// Set up error handling middleware (notice that this is the LAST thing we do)
app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});

// _________________________________________________________
// kick off the server by listening to the port declared from before

app.listen(PORT, () => { console.log("Server started on " + PORT); });

