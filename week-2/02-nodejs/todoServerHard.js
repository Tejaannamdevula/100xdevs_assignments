const express  = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const {v4:uuid4} = require('uuid');




const filePath = path.join(__dirname,'todo.json');
// /home/teja/Documents/github/100xdevs_assignments/week-2/02-nodejs/todo.json
// const filePath ="/home/teja/Documents/github/100xdevs_assignments/week-2/02-nodejs/todo.json";
console.log(filePath);
const app =express();
app.use(bodyParser.json());

function findIndex(arr, id){
    return arr.findIndex((todo) => todo.id === id);
};

async function readTodoFile(){
    try{
        const data = await fs.readFile(filePath,'utf8');
        return JSON.parse(data);
        console.log(data);
    }catch(err){
        throw new Error('unable to read todo file');
    }
} 

async function writeTodoFile(data){
    try{
        await fs.writeFile(filePath,JSON.stringify(data,null,2),'utf8');

    }catch(err){
        throw new Error('unable to write todo file');
    }
}

app.get('/todos',async(req,res)=>{
    try{
    const todo =  await readTodoFile();
    res.status(200).json(todo);
    }catch(err){
        res.status(500).send("Internal error occured");
    }

});

app.get('/todos/:id',async (req,res)=>{
    const id =req.params.id;
    const todo = await readTodoFile();
    const index = findIndex(todo, id);

    if(todo[index]){
        res.status(200).json(todo[index]);
    }else{
        res.status(404).send("Id not found");
    }

});


app.post('/todos',async (req,res)=>{
    let  todo = await readTodoFile();

    let newId;
    do{
        newId = uuid4();
    }while (todo.some((todo) => todo.id === newId));
    const newTodo = {
        id:newId,
        title:req.body.title,
        description:req.body.description
    }

    todo.push(newTodo);

    await writeTodoFile(todo);
    res.status(201).json(newTodo);


});

app.put('/todos/:id',async(req,res)=>{
    const todo = await readTodoFile();
    const id = req.params.id;
    const index = findIndex(todo,id);
    if(todo[index]){
        todo[index].title = req.body.title;
        todo[index].description = req.body.description;
        await writeTodoFile(todo);
        res.status(200).json(todo[index]);
    }else{
        res.status(404).send('Id not found');
    }

});

app.delete('/todos/:id',async(req,res)=>{
    const id = req.params.id;
    const todo = await readTodoFile();
    const index = findIndex(todo,id); 
    if(todo[index]){
        todo.splice(index,1);
        await writeTodoFile(todo);
        res.status(200).json({ message: 'Item deleted' }); 
    }else{
        res.status(404).send('Id Not Found');
    }
});

app.use('*',(req,res)=>{
    res.status(404).send();
});

// const port = 3000;
// app.listen(port,()=>{
//     console.log(`server is listening at ${port}`);
// });

module.exports = app;