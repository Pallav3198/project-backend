const Sequelize = require('sequelize');
const dbConfig = require('../dbConfig/dbConfig');
const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors());
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.pool.min,
    dialect: dbConfig.dialect,
    pool:{
    max: dbConfig.pool.max,
    min:dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
    }
});
sequelize.authenticate().then(()=>console.log('Connected to database successfully'))
.catch((err)=>console.log(err))
//create table
let users_table = sequelize.define('users',{
    email:Sequelize.STRING,
    username:Sequelize.STRING,
    password:Sequelize.STRING
},{timestamps:false,freezeTableName:true});
users_table.sync({force:false}).then(()=>console.log('Table Created Successfully!'))
.catch((err)=>console.log(err));

/* GET ALL USERS */
app.get('/allusers',(req,res)=>{
    users_table.findAll({raw:true})
    .then((data)=>res.send(data))
    .catch((err)=>{
        console.log(err);
        console.log('Could not fetch details of users!');
    })
})
/* GET ALL USERS BY USERNAME */
app.get('/usersByUsername/:username',(req,res)=>{
    let username = req.params.username;
    users_table.findAll({where:{username:username},raw:true})
    .then ((data)=>{
        console.log(data);
        res.send(data);
    })
})
/* GET ALL USERS BY EMAIL ID */
app.get('/usersByEmail/:email',(req,res)=>{
    let email = req.params.email;
    users_table.findAll({where:{email:email},raw:true})
    .then ((data)=>{
        console.log(data);
        res.send(data);
    })
})
/* Insert user */
app.use(express.json());

app.post('/insertUser',(req,res)=>{
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
     let userObj = users_table.build({email:email,username:username,password:password})
     userObj.save().then((data)=>{
         console.log(`Records Added Sucessfully##### ${data}`)
         res.send(data);
        })
     .catch((err)=>console.log(err))
})
/*Update Details*/
app.put('/updateUser',(req,res)=>{
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    users_table.update(
        {
            email: email,
            username:username,
            password:password
        },{where:{email:email}}
    )
    // res.send(users_table.id)
    res.send(res.body);
})
/*DELETE RECORDS */
app.delete('/delete/:email',(req,res)=>{
    let email = req.params.email;
    users_table.destroy({where:{email:email}})
    .then((data)=>{
        console.log(data);
        res.send('Records Deleted!');
    }).catch((err)=>{
        console.log(err);
    })
})
//listen to port
app.listen(port);