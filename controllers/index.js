var HomeController = {
    Index: function(req, res) {
      res.render('index', { title: 'Budgie' });
    }
  };
  
  module.exports = HomeController;