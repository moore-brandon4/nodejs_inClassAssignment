// to run code make sure npm install express --save then node index.js

let express = require('express');
let bodyParser = require ('body-parser');
let mongoose = require ('mongoose');
const ToDo=require ('./models/todo.model')


var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded( {extended : true}))

//connection to mongo

const mongoDB='mongodb+srv://admin:admin@cluster0.o4ixh.mongodb.net/todo?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise=global.Promise;
let db=mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error:   '));

let tasks=['wake up', 'eat breakfast','brs'];
let completed=[];


app.get('/', function (request, response){
    response.render('index', {tasks : tasks, completed : completed});
    //response.send('Hello World!');
});

app.post('/addToDo', function (request,response){
    let newTodo = new ToDo ({
        item: request.body.newTodo,
        done: false
    })
    newTodo.save(function (err,todo){
        if(err){
            console.log(err)
        }else{
            response.redirect('/');
        }
    });
    //tasks.push(request.body.newtodo);
    response.redirect('/');
});

app.post('/removeToDo', function (request,response){
    const remove = request.body.check;
    if(typeof remove === 'string'){
        ToDo.updateOne({item:remove}, {done:true}, function(err){
            if(err){
                console.log(err)
            }else{
                response.redirect('/');
            }
        })
        //tasks.splice( tasks.indexOf(remove),1);
        //completed.push(remove);
    }else if (typeof remove === "object"){
        for (var i=0; i< remove.length; i++){
            tasks.splice( tasks.indexOf(remove[i]),1);
            completed.push(remove[i]);
        }
        response.redirect('/');
    }
});

app.post('/deleteToDo', function (request,response){
    const deletetasks = request.body.delete;
    if(typeof deletetasks === 'string'){
        completed.splice( completed.indexOf(deletetasks),1);
    }else if (typeof deletetasks === "object"){
        for (var i=0; i< deletetasks.length; i++){
            completed.splice( completed.indexOf(deletetasks),1);
        }
    }
    response.redirect('/');
});

app.listen(3000, function(){
    console.log('App is running on port 3000!')
});