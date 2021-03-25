var mongoose = require("mongoose");

var Expenses = new mongoose.Schema({ 
 utilities: Number,
 groceries: Number,
 entertainment: Number,
})

var IncomeSchema = new mongoose.Schema({
  total: Number,
  expenses: [Expenses],
  savings: Number,
  user: String,
});

var Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;
