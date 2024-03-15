const express = require("express")
const mysql = require("mysql")
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "auth_db"
})


//api

//post

app.post("/api/signup", (req,res) =>{
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,  
        req.body.email, 
        req.body.password
    ]
    db.query(sql,[values], (err, data)=>{
        if(err){      
            console.log(err,'aaaaaa') 
           return res.send("User not created!")            
        }else {
            console.log('result');
            return res.json(data);
         
        }
    })  

});

//get

app.get('/api/login', (req, res) => {
    const sql = 'SELECT * FROM login';
    db.query(sql, (err, result) => {
        if (err) throw err;  
        res.send(result);
    })
});


//post

app.post('/api/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ? ";
    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
        if(err){
            return res.status(400).json("Error");
        }
        if(data?.length > 0){
            return res.json("success")
        }else {
            return res.status(400).json("bad request")
        }
        
    })
});


app.listen(8081, () => console.log("Server is running on port 8081"))






