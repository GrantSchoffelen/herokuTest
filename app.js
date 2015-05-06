var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');
var exec = require('exec-then');
var moment = require('moment');
var schedule = require('node-schedule');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var rule0 = new schedule.RecurrenceRule();
rule0.dayOfWeek = [0, new schedule.Range(0, 6)];
rule0.hour = 23
rule0.minute = [22, 23, 24, 25, 26, 27] ;

// var rule1 = new schedule.RecurrenceRule();
// rule1.dayOfWeek = [0, new schedule.Range(0, 6)];
// rule1.hour = 23;
// rule1.minute = 15;




var j = schedule.scheduleJob(rule0, function(){
  // var today = moment();
  console.log('hit')

  // console.log(today.format("YYYY-MM-DD HH:mm"))

   // dayCommit(today)
});

// var g = schedule.scheduleJob(rule1, function(){
//   var today = moment();

//   console.log(today.format("YYYY-MM-DD HH:mm"))

//    dayCommit(today)
// });


function dayCommit(date){ 

  fs.writeFile("newfile.js", date.format(), function(err) {
    if(err) {
      console.log('err1')
        return console.log(err);
    }

    console.log("The file was saved!");


}); 
exec('git add -A',
  function (error, stdout, stderr) {
    console.log('add')
    if (error !== null) {
      console.log('err2')
      console.log('exec error: ' + error);
    }
}).then(function(){
      exec("git commit --date='"+date.format("YYYY, DD, MM")+"' -m'"+date.format("YYYY, DD, MM")+"'",
  function (error, stdout, stderr) {
    console.log('commit')

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('err3')
    }
}).then(function(){
   exec('git push origin master', function(error, stdout, stderr){
      console.log('push')
    })
});

});


}
// var numFunction = function(){setInterval(function(){
//   if(counter>5){
//     return 
//   }
//   console.log(today.format('YYYY, DD, MM'), "hit")
//   dayCommit(today)
//   counter++
// }, 1000);
// }


module.exports = app;
