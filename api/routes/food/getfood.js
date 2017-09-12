const Food = require("../../models/food");

module.exports = function(req, res) {
  Food.find(function (err, food) {
    if (err) return next(err);
    res.json(food);
  });
};
