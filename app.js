
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionsRouter = require('./routes/sessions');
var signupRouter = require('./routes/signup');
var dashboardRouter = require('./routes/dashboard');
var app = express();

// view engine setup
app.engine('hbs' , hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// register handlebars helpers
var expressHandlebars = hbs.create()

expressHandlebars.handlebars.registerHelper('totalExpenses', function(expenseFields) {
  return expenseFields.reduce(function(result, nextExpense) {
    return result + nextExpense.groceries + nextExpense.entertainment + nextExpense.utilities;
},  0 )
})

// helpers for differnent expenses
expressHandlebars.handlebars.registerHelper('totalGroceriesExpenses', function(expenseFields) {
  return expenseFields.reduce(function(result, nextExpense) {
    return result + nextExpense.groceries;
  }, 0)
})

expressHandlebars.handlebars.registerHelper('totalUtilitiesExpenses', function(expenseFields) {
  return expenseFields.reduce(function(result, nextExpense) {
    return result + nextExpense.utilities;
  }, 0)
})

expressHandlebars.handlebars.registerHelper('totalEntExpenses', function(expenseFields) {
  return expenseFields.reduce(function(result, nextExpense) {
    return result + nextExpense.entertainment;
  }, 0)
})

expressHandlebars.handlebars.registerHelper('remainingBalance', function(statement) {
  console.log(statement)
  console.log(statement.expensefields)

  var totalExpenses = statement.expensefields.reduce(function(result, nextExpense) {
    console.log("first")
      return result + nextExpense.groceries + nextExpense.entertainment + nextExpense.utilities;
  }, 0 )
  console.log("second")

return statement.income - statement.savings - totalExpenses;
})
console.log("third")


// The income and saving belong to your statement object, not the expensefields.
// You'll need to pass in the expense object instead and access the expenseFields in your handlebars helper.
// Inside the handlebars helper, you'll need to re-calculate totalExpenses before doing the maths

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));
var sessionChecker = (req, res, next) => {
  if (!req.session.user || !req.cookies.user_sid) {
      res.redirect('/login');
  } else {
      next();
  }
};

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', sessionsRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', sessionChecker, dashboardRouter);


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
