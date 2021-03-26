var Income = require("../models/income");
var User = require("../models/user");

var mongoose = require("mongoose");
var DashboardController = {
  Index: function (req, res) {

    var currentUser = req.session.user.email
    Income.find({
      user: currentUser
    }).lean()

      // .sort()
      //.populate({ path: "comments" })
      .exec(function (err, incomes) {
        if (err) {
          throw err;

        }
        console.log("string" + incomes[0].total)
        res.render("dashboard/index", { incomes: incomes, user: currentUser });
      });
  },
  New: function (req, res) {
    res.render("dashboard", {});
  },
  Create: function (req, res) {
    var income = new Income({
      total: req.body.total,
      savings: req.body.savings,
      user: req.session.user.email,
    });

    income.expenses.push({
      utilities: req.body.utilities,
      groceries: req.body.groceries,
      entertainment: req.body.entertainment,
    });


    console.log(income.expenses)
    console.log(income.total)
    console.log(req.body.total);
    console.log("mid check");

    console.log(req.session.user.email);

    console.log("trying to see the budget here")


    income.save(function (err) {
      if (err) {
        throw err;
      }
      console.log("before redirecting")

      res.status(201).redirect("/dashboard");
    });
  },


}

module.exports = DashboardController;
