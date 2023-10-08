import express  from "express";
import bodyParser from "body-parser";

const port = 3000;

const app= express();

app.get("/", (req, res)=>{
 res.send("hello");
})


app.listen( port, ()=>{
    console.log(" server on port", port)
});