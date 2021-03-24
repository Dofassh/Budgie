var Income = require("../models/income");
//var Outcome = require("../models/outcome");
var mongoose = require("mongoose");

var DashboardController = {
  Index: function (req, res) {
    Income.find()
      .sort()
      //.populate({ path: "comments" })
      .exec(function (err, incomes) {
        if (err) {
          throw err;
        }
        res.render("dashboard/index", { income: incomes });
      });
  },

  New: function (req, res) {
    res.render("dashboard/new", {});
  },
  
  Create: function (req, res) {
    console.log(req.session.user.email);
    var income = new Income({
      income: req.body.income,
      user: req.session.user.email,
    });
    console.log(income)
    console.log("trying to see the budget here")


    income.save(function (err) {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/dashboard");
    });
  },


}

module.exports = DashboardController;