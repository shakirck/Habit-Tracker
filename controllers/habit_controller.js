const Habits = require("../models/habits");
const moment = require("moment");
const { weekdays } = require("moment");

module.exports.showDetails = function (req, res) {
  // console.log(req.params);
  
  //finding the habit from the  id got from the url parameters
  Habits.findOne({ _id: req.params.id }, function (err, habit) {
    const weekdays = []; //for storing the date
    const weekDayNames = []; //for storing the day
    for (let i = 0; i < 7; i++) {
      let dateFrom = moment().subtract(i, "d").format("YYYY-MM-DD");
      weekdays.push(dateFrom);
      console.log(dateFrom);
      weekDayNames.push(moment(dateFrom).format("dddd"));
    }
    weekdays.reverse();
    weekDayNames.reverse();

    const taskStatus = habit.days[0]; //getting the completed or not completed status
    if (err) {
      console.log("error while finding a habit");
      return res.redirect("back");
    }
    res.render("habit", {
      habit: habit,
      days: weekdays,
      taskStatus: taskStatus,
      weekDayNames: weekDayNames,
    });
  });
};

//update the completed and not completed  status in DB
module.exports.update = async function (req, res) {
  //find the habit by id from the parameter
  const currItem = await Habits.findById(req.params.id);
  let currDay = currItem.days[0]; //finding the day in which the status to by updated

  currDay[req.params.day] = req.params.value; //changing the status  according to the parmeter value

  let updatedWork = currDay;

  //updating the database
  Habits.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        days: updatedWork,
      },
    },
    { new: true },
    function (err, newhabit) {
      return res.redirect("back");
    }
  );
};
