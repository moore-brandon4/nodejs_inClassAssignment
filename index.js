var express = require('express');
var bodyParser = require ('body-parser');

var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded( {extended : true}))

var tasks=['wake up', 'eat breakfast'];
var completed=[];


app.get('/', function (request, response){
    response.render('index', {tasks : tasks, completed : completed});
    //response.send('Hello World!');
});

app.post('/addToDo', function (request,response){
    response.send('hello');
});

app.post('/removeToDo', function (request,response){
    response.send('world');
});

app.listen(3000, function(){
    console.log('App is running on port 3000!')
});