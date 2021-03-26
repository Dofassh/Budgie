var mongoose = require("mongoose");

var ExpenseFieldSchema = new mongoose.Schema({
    user: String, 
    groceries: {type:Number, default: 0},
    utilities: {type: Number, default: 0},
    entertainment: {type: Number, default: 0},
    statement_id: { type: mongoose.Schema.Types.ObjectId, ref: "Statement" },
}) 

var ExpenseField = mongoose.model("ExpenseField", ExpenseFieldSchema);

module.exports = ExpenseField;