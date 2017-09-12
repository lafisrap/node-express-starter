const Bars = require("../../models/bars");
const { getToday } = require('../../utils');

module.exports = function(req, res) {
  const { barid } = req.body;
  const { username } = req.user;
  const date = getToday();

  if( !barid ) return res.json({ success: false, error: 'Please specify parameter \'barid\'.'})

  Bars.findOneAndUpdate({
    barid, date 
  }, {
    $pull: { 
      bookedby: username
    }
  }, function (err) {
    if (err) res.json({ error: `Error saving booking.` });
    else res.json({ success: true });
  });
};
