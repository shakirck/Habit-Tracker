const express = require('express');
const app = express();
const PATH = require('path');
const PORT = 5000;
const router=require('./routes');
const db = require('./config/mongoose');



app.use(express.urlencoded({extended:true}));

//static files
app.use(express.static('./assets'));

//Router
app.use('/',router);

//view engine 
app.set('view engine','ejs');
app.set('views',PATH.join(__dirname,'/views'));

//Listening to the port
app.listen(PORT,function(err){
 if(err){
     console.log('Error Starting The Server');
     return;
 }
 console.log('app is running on ',PORT);  
})