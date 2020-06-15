const Habits = require("../models/habits");
const moment = require("moment");

module.exports.home = function (req, res) {
  //getting all habits and sorting according to their creation time .
  Habits.find({})
    .sort("-createdAt")
    .exec(function (err, Habit) {
      if (err) {
        console.log("errir ", err);
        return;
      }

      const date = moment().calendar();
      const formatedDate = moment(Habit.createdAt).format("YYYYMMDD");
      // console.log(formatedDate);
      // Habit.sort(createdAt);
      // console.log(Habit.length);
      const age = moment(formatedDate, "YYYYMMDD").fromNow(); //calculating the age of the habit
      return res.render("home", {
        habits: Habit,
        date: date,
        age: age,
        totalHabits: Habit.length,
      });
    });
};

//creating a new habit
module.exports.create = function (req, res) {
  //Finding the dates of days in a week
  const days = {};
  for (let i = 0; i < 7; i++) {
    let dateFrom = moment().subtract(i, "d").format("DD-MM-YY");
    days[dateFrom] = "";
  }
  //  days.reverse();
  console.log(days);

  //adding the habit to DB
  Habits.create(
    {
      habit: req.body.habit,
      days: days,
      createdTime: moment().format("LT"),
    },
    function (err, newHabit) {
      if (err) {
        console.log("error occured while createing a habit ", err);
        return;
      }
      console.log(newHabit);
      return res.redirect("back");
    }
  );
};

//Deleting a habit From the DB
module.exports.delete = function (req, res) {
  console.log(req.params.id);
  Habits.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log("could not delete ");
      return;
    }
    return res.redirect("/");
  });
};
