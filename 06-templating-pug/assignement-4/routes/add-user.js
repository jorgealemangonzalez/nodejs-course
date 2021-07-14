const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
  res.render('add-user', { pageTitle: 'Add User', path: '/' });
});

router.post('/', (req, res, next) => {
  users.push({ name: req.body.name });
  res.redirect('/users');
});

exports.routes = router;
exports.users = users;
