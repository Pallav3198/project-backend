/* Imports */
const express = require('express');
const instamojo = require('instamojo-nodejs');
const cors = require('cors');
//*********************/
const API_KEY = 'test_941324feecbf0b0e79cd824403a';
const AUTH_KEY = 'test_997e542b2ef1ff4b6e8c7c157b3';
const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());
/*********************/
instamojo.setKeys(API_KEY,AUTH_KEY);
instamojo.isSandboxMode(true);
/*********************/
app.get('/',(req,res)=>{
   res.send(__dirname+'/payment.html');
})
app.post('/pay',(req,res)=>{
    let email = req.body.email;
    let amount = req.body.amount;
    console.log(`${email} and ${amount}`);
    let data = new instamojo.PaymentData();
    const redirect_url = "http://localhost:4200/success";
    data.setRedirectUrl(redirect_url);
    data.send_email = 'True';
    data.purpose = "MTX Jewelry Shopping";
    data.email = req.body.email;
    data.amount = req.body.amount;
    
    instamojo.createPayment(data,function(error,res){
        if(error){
            console.log(error);
        }
        else{
            console.log(res);
            // res.send("Please Check Your Mail to make payment")
        }
    })
})

//listen to the port
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});