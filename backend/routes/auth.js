import express from 'express';
import bodyParser from 'body-parser';

import usersRepo from '../repositories/usersRepository.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/signout', (req, res) => {
  console.log(req.session)
  req.session = null;
  console.log(req.session)
  res.sendStatus(200)
})

router.get('/cookie', async (req, res) => {
  const email = req.session.userId
  const exists = await usersRepo.getByEmail(email);
  if(!exists) {
    res.json({ token: null })
    return
  }
  res.json({
    token: email
  })
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const userExists = await usersRepo.validUser(email, password);
  if (userExists) {
    req.session.userId = email;
    res.json({
      token: email
    })
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  await usersRepo.createUser(email, password);
  req.session.userId = email;
  res.json({
    token: email
  })
})

export default router