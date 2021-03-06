const express = require('express')
const http = require('http')
const morgan = require('morgan')
const hostname ='localhost';
const port= 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var config = require('./config');
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

const app = express();
const bodyParser = require('body-parser')
app.use(morgan('dev'))
app.use(bodyParser.json());
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
  }));
  var passport = require('passport');
  var authenticate = require('./authenticate');

  app.use(passport.initialize());
app.use(passport.session());

const userrouter = require('./routes/user')
app.use('/users', userrouter);

 function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}

app.use(auth);

const dishrouter = require('./routes/dishRouter')
app.use('/dishes', dishrouter);

const promoRouter = require('./routes/promoRouter')
app.use('/promotions', promoRouter);

const leaderRouter = require('./routes/leaderRouter')
app.use('/leaders', leaderRouter);

const server = http.createServer(app);


server.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}/`);
});

