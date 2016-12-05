var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
// used to create, sign, and verify tokens
var jwt          = require('jsonwebtoken');

var config = {
    secret: 'I love hentai',
    config: {
        user: 'reader',
        database: 'cuisine',
        password: 'reader'
    }
};

var app = express();

/** CONFIG & CORE MIDDLEWARES **/

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('superSecret', config.secret);

// uncomment after placing your favicon in /assets
//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

app.use(logger('dev')); // logger
app.use(bodyParser.json()); // enables HTTP body to be parsed and stored in req.body
app.use(bodyParser.urlencoded({extended: true})); // HTTP body parser config
app.use(cookieParser()); // enables HTTP cookies to be parsed and stored in req.cookies
app.use(express.static(path.join(__dirname, 'assets'))); // enables the app to serve every file inside ./assets

/** ROUTER MIDDLEWARE **/

app.use('/', require('./app/routes/_root'));


/** ERROR MIDDLEWARES **/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
