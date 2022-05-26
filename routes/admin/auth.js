//require important files
const express = require('express')
const { check, validationResult } = require('express-validator')
const usersRepo = require('../../repositories/users')
const signupTemplate = require('../../views/admin/auth/signup')
const loginTemplate = require('../../views/admin/auth/login')

//require in validation
const { requireEmail, requirePassword, requirePasswordConfirmation } = require('./validators')


//create a sub-router
const router = express.Router()

//layout the routes for the application
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }))
})


router.post('/signup', [
    //use express-validator to sanitize & validate sign-ups
    requireEmail, 
    requirePassword, 
    requirePasswordConfirmation
], 
    async (req, res) => {
    //pass back the validation results
    const errors = validationResult(req)
    console.log(errors)

    //do the signup validation logic 
    const { email, password, confirmPassword } = req.body 

    //use cookie-based auth in our app by creating a user to represent each person
    const user = await usersRepo.create({ email, password })
    //store the user's id inside the users cookie via cookie-session
    req.session.userId = user.id

    res.send('Account created!')
})


router.get('/logout', (req, res) => {
    req.session = null
    res.send('You are now logged out.')
})

router.get('/login', (req, res) => {
    res.send(loginTemplate({req}))
})

router.post('/login', async (req, res) => {
    const { email, password} = req.body

    const savedUser = await usersRepo.getOneBy({ email })
    if (!savedUser) {
        return res.send(`Error: Email not found.`)
    }

    const validPassword = await usersRepo.comparePasswords(
        savedUser.password, 
        password
    )

    //check if passwords match 
    if (!validPassword) {
        return res.send(`Error: Invalid password.`)
    }

    //use cookie-based auth in our app by creating a user to represent each person
    const user = await usersRepo.create({ email, password })
    //store the user's id inside the users cookie via cookie-session
    req.session.userId = user.id

    res.send("You're logged in successfully!")
})

module.exports = router;
