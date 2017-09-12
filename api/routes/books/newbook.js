const Book = require("../../models/book");
const getToken = require('../../utils').getToken;

module.exports = function(req, res) {
  const token = getToken(req.headers);
  const { isbn, title, author, publisher } = req.body;
  if (token) {
    var newBook = new Book({ isbn, title, author, publisher });

    newBook.save(function(err) {
      if (err) {
        return res.json({ success: false, msg: 'Save book failed: ' + err });
      }
      res.json({success: true, msg: 'Successful created new book.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
};
