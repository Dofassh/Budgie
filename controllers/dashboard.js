var Statement = require("../models/statement");
var User = require("../models/user");
var ExpenseField = require("../models/expensefield");
var mongoose = require("mongoose");

var DashboardController = {
  Index: function (req, res) {

    var currentUser = req.session.user.email
    var displayUser = req.session.user.username

    Statement.find({
      user: currentUser,
    }).lean()

      // .sort()
      .populate({ path: "expensefields" })
      .exec(function (err, statements) {
        if (err) {
          throw err;

        }
        res.render("dashboard/index", { statements: statements, user: displayUser});
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
      month: req.body.month,
    });

    // statement.expenses.push({
    //   utilities: req.body.utilities,
    //   groceries: req.body.groceries,
    //   entertainment: req.body.entertainment,
    // });

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

  ExpenseField: function (req, res) {
    var expensefield = new ExpenseField({ 
      user: req.session.user.email,
      groceries: req.body.groceries,
      utilities: req.body.utilities,
      entertainment: req.body.entertainment,
      statement_id: req.body.id,
    });
    console.log("after creating expense fields")
    expensefield
    .save()
    .then(function (result) {
      console.log("is this working?")
      return Statement.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(req.body.id)},
        {$push: { expensefields: result._id } }
      );
    })
    .then(function () {
      console.log("updated");
      res.redirect("/dashboard");
    });
  },

}

module.exports = DashboardController;
