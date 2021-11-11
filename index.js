// to run code make sure npm install express --save then node index.js

import fetch from 'node-fetch';

const response = await fetch('https://github.com/');
const body = await response.text();

console.log(body);

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
    ToDo.find(function(err,todo){
        if(err){
            console.log(err);
        }else{
            tasks=[];
            completed=[];
            for(let i=0; i < todo.length; i++){
                if(todo[i].done){
                    completed.push(todo[i]);
                }else{
                    tasks.push(todo[i]);
                }
            }
            response.render('index', {tasks : tasks, completed : completed});
        }
    })
    //response.render('index', {tasks : tasks, completed : completed});
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
    //response.redirect('/');
});

app.post('/removeToDo', function (request,response){
    const remove = request.body.check;
    if(typeof remove === 'string'){
        ToDo.updateOne({_id:remove}, {done:true}, function(err){
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
            ToDo.updateOne({_id:remove[1]}, {done:true}, function(err){
                if(err){
                    console.log(err)
                }
        //for (var i=0; i< remove.length; i++){
            //tasks.splice( tasks.indexOf(remove[i]),1);
            //completed.push(remove[i]);
        })
        //response.redirect('/');
     }
     response.redirect('/');
    }
});

app.post('/deleteToDo', function (request,response){
    const deleteTask = request.body.delete;
    if(typeof deleteTask === 'string'){
        //completed.splice( completed.indexOf(deleteTask),1);
        ToDo.deleteOne({_id: deleteTask}, function(err){
            if(err){
                console.log(err);
            }
            response.redirect('/');
        })
    }else if (typeof deleteTask === "object"){
        for (var i=0; i< deleteTask.length; i++){
            //completed.splice( completed.indexOf(deleteTask),1);
        
            ToDo.deleteOne({_id: deleteTask[i]}, function(err){
                if(err){
                    console.log(err);
                }
            })
        }
        response.redirect('/');
    }
    
});

app.listen(3000, function(){
    console.log('App is running on port 3000!')
});