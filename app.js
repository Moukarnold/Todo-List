import express  from "express";
import bodyParser from "body-parser";

const app= express();
const port = 3000;

const toDoList = [];

function createTasks(req, res, next){
    const theDay = req.body.date;
    const theTime= req.body.time;
    const theTask = req.body.task;
    
    if( theTask && theDay && theTime) {
        toDoList.push({
            date: theDay,
            time: theTime,
            task: theTask,
          });

          res.locals.toDoList= toDoList;
    
    }  
  
    next();
}



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(createTasks);

app.get("/", (req, res)=>{
 res.render("toDo",{tasks: toDoList});
});

app.get("/workList", (req, res)=>{

  const requestedDate = req.query.date;
  const requestedTasks = toDoList.filter((task)=>task.date === requestedDate ) 
  
  res.render("workList", { tasks: requestedTasks, date: requestedDate });

})

app.post("/",(req, res)=>{
    
  res.render("toDo",{tasks: toDoList});
  
});





app.listen( port, ()=>{
    console.log(" server on port", port);
});