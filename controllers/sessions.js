const User = require("../models/user");

var SessionsController = {
    New: function (req, res) {
        res.render('sessions/new');
    },

    Create: function (req, res) {
        const { email, password } = req.body;
        const user = User.findOne({ email, password }).then(function(user){
            if (user.password == password) {
                req.session.user = user;
                res.redirect('/dashboard')
            }
        })
    }
};
    module.exports = SessionsController;