const mongoose = require('mongoose');

const moment = require('moment');




const habitSchema = new mongoose.Schema({

    habit:{
        type:String,
        required:true
    },
    days:[],
   streak:{
       type: Number,
       default:0
   },
   createdTime:{
     type:String,
     require:true
   }

},
{
    timestamps:true
})


const Habits = mongoose.model('Habits',habitSchema);
module.exports = Habits