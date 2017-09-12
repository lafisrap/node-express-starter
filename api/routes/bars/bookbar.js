const Bars = require("../../models/bars");
const { getToday } = require('../../utils');

module.exports = function(req, res) {
  const { barid } = req.body;
  const { username } = req.user;
  const date = getToday();

  if (!barid) return res.json({ success: false, error: 'Please specify parameter \'barid\'.'})

  Bars.findOneAndUpdate(
    // Search for a bar today
    { barid, date }, 

    // Add username to array bookedby, ($push would also work but would eventually add it twice)
    { $addToSet: { bookedby: username } },

    // See the result
    (error, result) => {
      if (error) return res.json({ error: `Error saving booking: ${error}` });

      // Create a new doc if non was found
      if (!result) {
        const bar = new Bars({
          barid,
          date,
          bookedby: [username]
        });

        bar.save();
      }

      // Tell the client that all went fine
      res.json({ success: true });
    }
  );
};
