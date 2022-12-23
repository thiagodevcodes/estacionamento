const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const rotativoRouter = require('./src/routes/rotativo');
const usersRouter = require('./src/routes/users');
const loginRouter = require('./src/routes/login');
const mensalistaRouter = require("./src/routes/mensalista");
const vagasRouter = require("./src/routes/vagas");
const middlewares = require("./src/middlewares/middleware");
require("dotenv").config();


const app = express();

// view engine setup

app.set("views", path.join(__dirname, 'src', 'views'))
app.set("view engine", "ejs");

app.use( function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
 next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('./auth')(passport);

app.use(session({  
  secret: '123',//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,

}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
  res.locals.user = req.user || null;
  next()
})

app.use('/', loginRouter);
app.use('/users', middlewares.authenticationMiddleware, middlewares.adminMiddleware, usersRouter);
app.use('/vagas', middlewares.authenticationMiddleware, vagasRouter);
app.use("/mensalistas", middlewares.authenticationMiddleware, mensalistaRouter);
app.use('/rotativos', middlewares.authenticationMiddleware, rotativoRouter);


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
