const User = require("../models/user");

var SignupController = {
    Index: function (req, res) {
      res.render("signup/index");
    },

    Create: function (req, res) {
      var user = new User({ username: req.body.username, email: req.body.email, password: req.body.password })
      user.save(function (err) {
        if (err) {
          let error = err.errors
          res.render("login/index", {
            message: error.email.properties.message,
          });
        } else {
          res.status(201).redirect("/login");
        }      
      });
    }
  }

  
    module.exports = SignupController;
  