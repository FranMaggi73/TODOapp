import express from 'express';
import bodyParser from 'body-parser';

import usersDB from '../db/usersDB.js';

import validators from './validators.js';
import middlewares from './middlewares.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/signout', (req, res) => {
  req.session.userId = null;
  res.redirect('/')
});

router.get('/cookie', async (req, res) => {
  const email = req.session.userId;
  const exists = await usersDB.Get(email);
  if(!exists.length) {
    res.json({ token: null })
    return
  }
  res.json({
    user: email
  })
});

router.post('/signin',
  [validators.checkEmail, validators.checkPassword],
  middlewares.handleErrors(),
  async (req, res) => {
    const { email } = req.body;
    req.session.userId = email;
    res.json({
      user: email
    });
  }
);

router.post('/signup',
  [validators.requireEmail, validators.requirePassword, validators.requirePasswordConfirmation],
  middlewares.handleErrors(),
  async (req, res) => {
    const { email, password } = req.body;
    await usersDB.Get(email);
    await usersDB.Insert({ email, password, todos:[] });
    req.session.userId = email;
    res.json({
      user: email
    })
  }
);

export default router