var mongoose = require("mongoose");

var IncomeSchema = new mongoose.Schema({
  total: Number,
  //outcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outcome" }],
  user: String,
});

var Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;
