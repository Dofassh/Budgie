var mongoose = require("mongoose");

var StatementSchema = new mongoose.Schema({
  income: Number,
  expensefields: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExpenseField" }],
  savings: Number,
  user: String,
});

// StatementSchema.methods.totalexpenses = function() { //assigned anonymous function
// return 100;
// }
// StatementSchema.methods.remainingbalance = function() { 
//   return 40;
// }

// StatementSchema.virtual('totalexpenses').get(function() {
//   return 100;
// });
// StatementSchema.virtual('remainingbalance').get(function() {
//   return 50;
// });

var Statement = mongoose.model("Statement", StatementSchema);

module.exports = Statement;
