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
require("dotenv").config();


function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

function adminMiddleware(req, res, next) {
  if(req.isAuthenticated() && req.user.admin == 1) return next();
  res.redirect("/rotativos");
}


const app = express();

// view engine setup

app.engine("handlebars", handlebars.engine({defaultLayout: "main", runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true
}}));

app.set("views", path.join(__dirname, 'src', 'views'))
app.set("view engine", "handlebars");

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
app.use('/users', authenticationMiddleware, adminMiddleware, usersRouter);
app.use('/vagas', authenticationMiddleware, vagasRouter);
app.use("/mensalistas", authenticationMiddleware, mensalistaRouter);
app.use('/rotativos', authenticationMiddleware, rotativoRouter);


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
