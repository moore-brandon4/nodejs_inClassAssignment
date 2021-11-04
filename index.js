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
    tasks.push(request.body.newtodo);
    response.redirect('/');
});

app.post('/removeToDo', function (request,response){
    const remove = request.body.check;
    if(typeof remove === 'string'){
        tasks.splice( tasks.indexOf(remove),1)
    }else if (typeof remove === "object"){
        for (var i=0; i< remove.length; i++){
            tasks.splice( tasks.indexOf(remove),1)
        }
    }
    response.redirect('/');
});

app.post('/deleteToDo', function (request,response){
    response.send('world');
});

app.listen(3000, function(){
    console.log('App is running on port 3000!')
});