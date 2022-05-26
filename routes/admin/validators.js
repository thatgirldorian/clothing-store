const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

//export our validation from auth.js
module.exports = {
    requireEmail: check('email').trim().normalizeEmail().isEmail().withMessage('Please enter a valid email').custom(async email => {
        //check if someone has signed already signed up with a given email
        const existingUser = await usersRepo.getOneBy({ email })
        if (existingUser) {
            throw new Error('Email already in use')
        }
    }),
    requirePassword: check('password').trim().isLength({ min: 4, max: 20 }).withMessage('Please enter a password between 4 and 20 characters'),
    requirePasswordConfirmation: check('confirmPassword').trim().isLength({ min: 4, max: 20 }).withMessage('Please enter a password between 4 and 20 characters').custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Passwords must match')
        }
    })
}