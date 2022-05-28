const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');


//export our validation from auth.js
module.exports = {
    requireTitle: check('title').trim().isLength({ min: 5, max: 40 }).withMessage('Title must be between 5 and 40 characters.'),

    requirePrice: check('price').trim().toFloat().isFloat({ min: 1 }).withMessage('Please enter a valid price'),

    requireEmail: check('email').trim().normalizeEmail().isEmail().withMessage('Please enter a valid email').custom(async email => {
        //check if someone has signed already signed up with a given email
        const existingUser = await usersRepo.getOneBy({ email })
        if (existingUser) {
            throw new Error('Email already in use')
        }
    }),

        requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters')
        .custom(async (confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Passwords must match');
        }
        }),

    requireValidEmail: check('email').trim().normalizeEmail().isEmail().withMessage('Please enter a valid email').custom(async (email) => {
        const savedUser = await usersRepo.getOneBy({ email })
        if (!savedUser) {
        throw new Error('Email not found.')
}
}),

    requireValidPassword: check('password').trim().custom(async (password, {req}) => {
        const savedUser = await usersRepo.getOneBy({ email: req.body.email })
        //handle the case where a user doesn't exist
        if (!savedUser) {
            throw new Error('Invalid password')
        }
        const validPassword = await usersRepo.comparePasswords(
            savedUser.password, 
            password
        )
        //check if passwords match 
        if (!validPassword) {
            throw new Error('Invalid password.')
        }
    })
}