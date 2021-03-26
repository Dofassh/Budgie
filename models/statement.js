var mongoose = require("mongoose");

var Expenses = new mongoose.Schema({ 
 utilities: Number,
 groceries: Number,
 entertainment: Number,
})

var StatementSchema = new mongoose.Schema({
  income: Number,
  expenses: [Expenses],
  savings: Number,
  user: String,
});

var statement = mongoose.model("statement", StatementSchema);

module.exports = statement;
