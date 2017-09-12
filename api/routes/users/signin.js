const jwt = require('jsonwebtoken');
const User = require("../../models/user");

console.assert(process.env.JWT_SECRET, "Environment variable JWT_SECRET has to be set.");

// createUserToken creates the user token the client will use to authenticate himself 
const createUserToken = (err, isMatch, user, res) => {
  if (isMatch && !err) {

    // Translate user document to JSON and add JWT token
    user = user.toJSON();
    user.token = 'bearer ' + jwt.sign(user, process.env.JWT_SECRET);

    res.json({ success: true, user });
  } else {
    res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
  }  
}

// authenticate checks if there is a user and if the password is right
const authenticate = (err, user, password, res) => {
  if (err) throw err;

  if (!user) {
    res.send({ success: false, msg: 'Authentication failed. User not found.' });
  } else {
    user.comparePassword(password, (err, isMatch) => createUserToken(err, isMatch, user, res));
  }
}

// Gets the user from the database
module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => authenticate(err, user, password, res));
};