var Statement = require("../models/statement");
var User = require("../models/user");

var mongoose = require("mongoose");
var DashboardController = {
  Index: function (req, res) {

    var currentUser = req.session.user.email
    Statement.find({
      user: currentUser
    }).lean()

      // .sort()
      //.populate({ path: "comments" })
      .exec(function (err, statements) {
        if (err) {
          throw err;

        }
        res.render("dashboard/index", { statements: statements, user: currentUser });
      });
  },
  New: function (req, res) {
    res.render("dashboard", {});
  },
  Create: function (req, res) {
    var statement = new Statement({
      income: req.body.income,
      savings: req.body.savings,
      user: req.session.user.email,
    });

    statement.expenses.push({
      utilities: req.body.utilities,
      groceries: req.body.groceries,
      entertainment: req.body.entertainment,
    });


    console.log(statement.expenses)
    console.log(statement.income)
    console.log(req.body.income);
    console.log("mid check");

    console.log(req.session.user.email);

    console.log("trying to see the budget here")


    statement.save(function (err) {
      if (err) {
        throw err;
      }
      console.log("before redirecting")

      res.status(201).redirect("/dashboard");
    });
  },


}

module.exports = DashboardController;
