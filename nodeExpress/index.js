const express = require('express')
const http = require('http')
const morgan = require('morgan')
const hostname ='localhost';
const port= 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const url = 'mongodb://localhost:27017/conFusion1';
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
function auth (req, res, next) {
    console.log(req.session);

    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');                        
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            req.session.user = 'admin';
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.session.user === 'admin') {
            console.log('req.session: ',req.session);
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
}
  
app.use(auth);

const dishrouter = require('./routes/dishrouter')
app.use('/dishes', dishrouter);

const promoRouter = require('./routes/promoRouter')
app.use('/promotions', promoRouter);

const leaderRouter = require('./routes/leaderRouter')
app.use('/leaders', leaderRouter);

const server = http.createServer(app);

server.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}/`);
});

