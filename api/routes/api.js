'use strict'; 
const express = require('express');
const passport = require('passport');
require('../config/passport')(passport);

const router = express.Router();

const writeHeaders = (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
    'Access-Contrl-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400'
  };

  // set header to handle the CORS
  res.writeHead(200, headers);
  res.end();
};

router.post('/bookbar', passport.authenticate('jwt', { session: false }), require('./bars/bookbar'));
router.post('/unbookbar', passport.authenticate('jwt', { session: false }), require('./bars/unbookbar'));
router.post('/signup', require('./users/signup'));
router.post('/signin', require('./users/signin'));
//router.post('/book', passport.authenticate('jwt', { session: false }), require('./books/newbook'));
//router.post('forgot', null);
//router.post('reset', null);
//router.post('verifyLink', null);

router.get('/getbars', require('./bars/getbars'));
//router.get('/food', require('./food/getfood'));
//router.get('/book', passport.authenticate('jwt', { session: false }), require('./books/getbook'));

router.options('/getbars', writeHeaders); 
router.options('/bookbar', writeHeaders); 
router.options('/unbookbar', writeHeaders); 
router.options('/signin', writeHeaders); 
router.options('/signup', writeHeaders); 

module.exports = router;