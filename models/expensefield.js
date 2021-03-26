var mongoose = require("mongoose");

var ExpenseFieldSchema = new mongoose.Schema({
    user: String, 
    groceries: Number,
    utilities: Number,
    entertainment: Number,
    statement_id: { type: mongoose.Schema.Types.ObjectId, ref: "Statement" },
}) 

var ExpenseField = mongoose.model("ExpenseField", ExpenseFieldSchema);

module.exports = ExpenseField;