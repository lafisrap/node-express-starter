const { expect } = require('chai')
const rewire = require('rewire')
const jwt = require('jsonwebtoken');
const signin = rewire('./signin')
const User = require("../../models/user");
const createUserToken = signin.__get__('createUserToken')

describe ('signin.js', () => {
  describe ('createUserToken()', () => {
    let success, msg, user = null;
    const res = {
      send: res => { success = res.success; msg = res.msg; },
      json: res => { success = res.success; user = res.user; }
    }

    it ('doesn`t authenticate on error', () => {
      createUserToken( true, null, null, res );

      expect (success).to.equal(false);
      expect (msg).to.equal('Authentication failed. Wrong password.');
    });

    it ('creates a token', (done) => {
      User.findOne({ username: "Michael10" }, (err, user_) => {              
        createUserToken( false, true, user_, res );

        if (!success) done('success !== true');
        else if (user.email !== 'a@aa.aa') done('email !== `a@aa.aa`');
        else if (!user.token || !user.token.length) done('User token was not created.');
        else if (user.token.length !== 167) done('Wrong token produced.');
        else done();
      });
    });
  });
})
