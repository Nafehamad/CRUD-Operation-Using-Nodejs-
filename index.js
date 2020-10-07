
//configure required package
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const { json } = require('body-parser');
var app = express();
app.use(bodyparser.json());

//database configuration
var mysqlConnection = mysql.createConnection ({
host : 'localhost',
user : 'root',
password : '',
database : 'learners',
multipleStatements : true
});

//connect to database
mysqlConnection.connect ((err) => {
    if(err){
        console.log('connection failed'+ JSON.stringify(err,undefined,2));
    }
    else {
        console.log('connection success');
    }

});

//port configuration
const port = process.env.port || 8081 ;
app.listen(port, () => console.log(`app listen at port ${port}`));

//for get purpose
app.get('/learners' , (req, res) => {
mysqlConnection.query('SELECT * FROM learnerdetails', (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );


//for get specific purpose
app.get('/learners/:id/:name', (req, res) => {
mysqlConnection.query('SELECT * FROM learnerdetails WHERE learner_id=? AND learner_name=?',[req.params.id,req.params.name] , (err, rows, fields) => {
if (!err){
    res.send(rows);
}
else {
    console.log(err);
}
})
});


//for post purpose
app.post('/learners', (req,res) =>{
    let learner = req.body;
    learner_id=learner.learner_id;
    learner_name=learner.learner_name;
    learner_email=learner.learner_email;
    course_id=learner.course_id;
    

  let data = { learner_id: learner_id,  learner_name: learner_name,learner_email:learner_email, course_id:course_id};
  let sql = "INSERT INTO learnerdetails SET ?";
  mysqlConnection.query(sql,data, (err, rows, fields) => {
    if (!err){
        res.send(rows);
    }
    else {
        console.log(err);
    }
    
  });
});

//for update purpose
app.put('/learners', (req,res) =>{
    let learner = req.body;
    learner_id=learner.learner_id;
    learner_name=learner.learner_name;
    learner_email=learner.learner_email;
    course_id=learner.course_id;
    

  let data = {learner_name: learner_name,learner_email:learner_email, course_id:course_id};
  let sql = "UPDATE learnerdetails SET ?  WHERE  learner_id="+ learner_id;
  mysqlConnection.query(sql,data, (err, rows, fields) => {
    if (!err){
        res.send(rows);
    }
    else {
        console.log(err);
    }
    
  });
});


//for delete purpose
app.delete('/learners/:id', (req,res) => {
mysqlConnection.query('DELETE FROM learnerdetails WHERE learner_id='+req.params.id, (err, rows, fields) =>{
    if (!err){
        res.send(rows);
    }
    else {
        console.log(err);
    }
});
});