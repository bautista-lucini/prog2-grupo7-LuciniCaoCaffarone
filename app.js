var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const db = require('./database/models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: "Tm socks",
  resave: false,
  saveUninitialized: true
}));
//
//app.use(function(req, res, next) {
  //console.log("Middleware - req.session.userId:", req.session.userId);
  //if (req.session.userId != undefined) {
   //   res.locals.user = req.session.userId;
  //} else {
   //   res.locals.user = null;
 // }
 // return next();
//});

app.use(function(req, res, next) {
  if (req.cookies.usuarioRecordado && !req.session.userId) {
      db.Usuario.findByPk(req.cookies.usuarioRecordado)
          .then(function(user) {
              if(user) {
                req.session.userId = user.id;
                req.session.user = user;
                res.locals.user = user;
              }
              next();
          })
  } else{
    if(req.session.userId){
      db.Usuario.findByPk(req.session.userId)
        .then(function(user) {
            res.locals.user = user;
            next();
        })
  } else {
      res.locals.user = null;
      next();
  }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;