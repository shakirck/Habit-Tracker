const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/habit-tracker');

const db = mongoose.connection;

//When an error occurs while trying to connect a database
db.on('error',console.error.bind(console,'Error Occured While Connecting to Database'));


db.once('open',function(){
    console.log("Successfully Connected To Database");
});

module.exports = db;