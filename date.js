var fs = require('fs');
var exec = require('exec-then');
var schedule = require('node-schedule');
var moment = require('moment');

var today = moment("2014, 9, 1");
var setDate = moment("2014, 8, 3")

// var j = schedule.scheduleJob(today.format(), function(){
//    pushChanges(day)
//    day = today.format("YYYY, DD, MM").subtract(1, 'days')    
// });

function dayCommit(date){ 
  if(setDate > date ){
    console.log('done')
    return 
  }
  fs.writeFile("newfile.js", date.format("YYYY, DD, MM"), function(err) {
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

today = today.subtract(1, "days")

}






setInterval(function(){
  console.log(today.format('YYYY, DD, MM'), "hit")
  dayCommit(today)
}, 1000);

