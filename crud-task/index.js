const express = require('express');
const app = express();
var mysql = require('mysql');
const bodyParser = require("body-parser");
app.use(bodyParser.json());


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

conn.connect((function (err){
    if(err)throw err;
    console.log("connected")
}));

app.get('/',(req,res) =>{
    res.send("you are in the server")
});

app.get('/user',(req,res)=>{

    conn.query("SELECT * FROM user",function(err,result,row){
        if(err)throw err;
        res.send(result);
    })
 
});

app.post('/name',(req,res)=>{

    var name  = req.body.name;
    res.send(name);
 
 });
 
app.post('/add',(req,res)=>{
 
     var name  = req.body.name;
     
     var sql= "INSERT INTO user(Name)VALUES('"+name+"')";
     conn.query(sql,function(err,result){
         if(err) throw err;
         res.send("Data Entered Succesfully");
     })
  
  });
app.put('/edit/:id',(req,res)=>{
    var edit = req.body

    var sql= "UPDATE user SET name='"+edit.name+"'WHERE id =''"+req.params.id;
    conn.query(sql,function(err,result){
        if(err) throw err;
        res.send("Data Updated");
    });

})

 
  app.post('/delete',(req,res)=>{
 
     var name  = req.body.name;
     
     conn.query("DELETE from user WHERE Name = '"+name+"'",function(err,result,row){
         if(err)throw err;
         res.send("Deleted Succesfully");
     })
     
  
  });
 

const port = process.env.port || 3305;

app.listen(port,() =>{
    console.log("server connected",port)
});