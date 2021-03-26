var mongoose = require("mongoose");

// var Expenses = new mongoose.Schema({ 
//  utilities: Number,
//  groceries: Number,
//  entertainment: Number,
// })

var StatementSchema = new mongoose.Schema({
  income: Number,
  expensefields: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExpenseField" }],
  savings: Number,
  user: String,
});

var Statement = mongoose.model("Statement", StatementSchema);

module.exports = Statement;
