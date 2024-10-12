var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// connect models to MongoDB
const mongoose = require('mongoose');
require('./models/users');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Cấu hình swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./configSwagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// /api-docs: Là đường link dẫn tới file document swagger
// Chỉ cần gửi link domain/api-docs cho front-end để xử lý API
// có thể đổi đường dẫn /api-docs

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect database MongoDB
mongoose.connect('mongodb+srv://BanBan:BanBan2805@cluster0.vccez.mongodb.net/Demo')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
