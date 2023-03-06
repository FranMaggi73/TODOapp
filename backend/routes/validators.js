import { check } from 'express-validator';
import usersRepo from '../repositories/usersRepository.js';

export default {
  requireEmail:
      check('email')
          .trim()
          .normalizeEmail()
          .isEmail()
          .withMessage('Must be a valid email')
          .custom(async (email) => {
              const existingUser = await usersRepo.getByEmail(email);
              if (existingUser) {
                  throw new Error('Email already in use');
              }
          }),
  requirePassword: 
      check('password')
          .trim()
          .isLength({ min: 8 })
          .withMessage('Must be at least 8 characters',),
  requirePasswordConfirmation:
      check('passwordConfirmation')
          .trim()
          .custom(async (passwordConfirmation, {req}) => {
              if(passwordConfirmation !== req.body.password){
                  throw new Error('Passwords must match')
              }
          }),
  checkEmail:
      check('email')
          .trim()
          .normalizeEmail()
          .isEmail()
          .withMessage('Invalid Email')
          .custom(async (email) => {
              const user = await usersRepo.getByEmail(email);
              if (!user) {
                  throw new Error('Email not found');
              }
          }),
  checkPassword:
      check('password')
          .trim()
          .custom(async (password, {req}) => {
              const user = await usersRepo.getByEmail(req.body.email);
              if(!user) {
                throw new Error('Invalid password');
              }
              const validPassword = await usersRepo.comparePasswords(
                user.password, 
                password
                );
                if (!validPassword) {
                  throw new Error('Invalid password');
              }            
          })
}