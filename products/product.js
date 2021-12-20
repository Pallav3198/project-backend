const dbConfig = require('../dbConfig/dbConfig');
const express = require('express');
const Sequelize = require('sequelize');
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
//create and define table
let products_table = sequelize.define('products',{
    title:Sequelize.STRING,
    type:Sequelize.STRING,
    discription:Sequelize.STRING,
    price:Sequelize.INTEGER,
    rating:Sequelize.INTEGER,
    imageUrl:Sequelize.STRING
},{timestamps:false,freezeTableName:true});
products_table.sync({force:false}).then(()=>{
    console.log('Table Created Successfully!');
     //****DB Work goes here****
    //   products_table.bulkCreate([
    //       //sets
    //       {id:4,title:'Jaipuri Set',type:'Set',discription:'Exclusive from Rajasthan',price:44500,rating:5,imageUrl:'https://i.ibb.co/r6nMJph/jaipuri-Set.jpg'},
    //       {id:1,title:'Choker Set',type:'Set',discription:'Exclusive Collection',price:23400,rating:4,imageUrl:'https://i.ibb.co/QQnGGHw/choker-Set.jpg'},
    //       {id:2,title:'Flower Set',type:'Set',discription:'Exclusive Collection',price:26400,rating:3,imageUrl:'https://i.ibb.co/M9yccd2/flower-Set.jpg'},
    //       {id:3,title:'Golden Set',type:'Set',discription:'Best for Festive Occasions',price:25600,rating:4,imageUrl:'https://i.ibb.co/r6nMJph/jaipuri-Set.jpg'},
    //       {id:5,title:'Mysore Set',type:'Set',discription:'Exclusive from Mysore',price:65000,rating:5,imageUrl:'https://i.ibb.co/ThRr8s8/southSet.jpg'},
    //       //earrings
    //       {id:6,title:'Stylish Earrings',type:'Earring',discription:'Delhi Style',price:6500,rating:4,imageUrl:'https://i.ibb.co/HqYL0zW/AEarring.jpg'},
    //       {id:7,title:'Blue Diamond Earrings',type:'Earring',discription:'Daily Wear',price:5700,rating:4,imageUrl:'https://i.ibb.co/rwf45Tv/blue-Earring.jpg'},
    //       {id:8,title:'Butterfly Earrings',type:'Earring',discription:'Durable and Long Lasting Polish',price:4500,rating:3,imageUrl:'https://i.ibb.co/6NrcWt9/butterfly-Earring.jpg'},
    //       {id:9,title:'Holy Cross Earrings',type:'Earring',discription:'Long Lasting Polish',price:2200,rating:3,imageUrl:'https://i.ibb.co/C19ngv8/cross-Earring.jpg'},
    //       {id:10,title:'Diamond Earrings',type:'Earring',discription:'Fancy Style',price:4000,rating:4,imageUrl:'https://i.ibb.co/WVdQjNR/diamond-Earring.jpg'},
    //       {id:11,title:'Drop Style Earrings',type:'Earring',discription:'Exclusive Limited Collection',price:2300,rating:4,imageUrl:'https://i.ibb.co/ZM5H7qB/drop-Earring.jpg'},
    //       //necklaces
    //       {id:12,title:'Drop Style Necklace',type:'Necklace',discription:'Exclusive Limited Collection',price:67000,rating:4,imageUrl:'https://i.ibb.co/HDz6Vct/drop-Necklace.jpg'},
    //       {id:13,title:'Flower Style Necklace',type:'Necklace',discription:'Specially Made Design',price:76900,rating:4,imageUrl:'https://i.ibb.co/xCZD4pd/flower-Necklace.jpg'},
    //       {id:14,title:'Golden Necklace',type:'Necklace',discription:'Hyderabad Collection',price:45000,rating:5,imageUrl:'https://i.ibb.co/7RMRf3R/gold-Necklace.jpg'},
    //       {id:15,title:'Queen Necklace',type:'Necklace',discription:'Limited Collection',price:26000,rating:4,imageUrl:'https://i.ibb.co/YfKmS29/queen-Necklace.jpg'},
    //       {id:16,title:'Red Necklace',type:'Necklace',discription:'Red Alert Collection',price:56000,rating:5,imageUrl:'https://i.ibb.co/v3VbYRm/red-Necklace.jpg'},
    //       //bangles
    //       {id:18,title:'Arrow Style Bangles',type:'Bangles',discription:'Exclusive Bangle Collection',price:2800,rating:4,imageUrl:'https://i.ibb.co/px70Qwz/arrow-Bangles.jpg'},
    //       {id:19,title:'Golden Bangles',type:'Bangles',discription:'Punjabi Collection',price:6800,rating:4,imageUrl:'https://i.ibb.co/hVJf370/golden-Bangles.jpg'},
    //       {id:20,title:'Stylish Bangles',type:'Bangles',discription:'',price:7100,rating:3,imageUrl:'https://i.ibb.co/mNHr3HW/stylish-Bangles.jpg'},

    //   ]).then((data)=>{console.log("records added successfully!")}).catch((err)=>console.log(err));
     //****DB Work Ends Here****
}).catch((err)=>console.log(err))

app.get('/allProducts',(req,res)=>{
    products_table.findAll({raw:true})
    .then((data)=>{
        console.log(data);
        res.send(data);
    })
})


//listen to the port
app.listen(3500);