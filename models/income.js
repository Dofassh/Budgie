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
  //outcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outcome" }],
  user: String,
});

var Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;


// var Comments = new Schema({
//     title     : String
//   , body      : String
//   , date      : Date
// });

// var BlogPost = new Schema({
//     author    : ObjectId
//   , title     : String
//   , body      : String
//   , date      : Date
//   , comments  : [Comments]
//   , meta      : {
//         votes : Number
//       , favs  : Number
//     }
// });

// mongoose.model('BlogPost', BlogPost);
