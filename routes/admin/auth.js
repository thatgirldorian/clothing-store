//require important files
const express = require('express')

const { handleErrors } = require('./middlewares')
const usersRepo = require('../../repositories/users')
const signupTemplate = require('../../views/admin/auth/signup')
const loginTemplate = require('../../views/admin/auth/login')

//require in validation
const { requireEmail, requirePassword, requirePasswordConfirmation, requireValidEmail, requireValidPassword } = require('./validators')


//create a sub-router
const router = express.Router()

//layout the routes for the application
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }))
})

router.post('/signup', [requireEmail, 
    requirePassword, 
    requirePasswordConfirmation], 
    handleErrors(signupTemplate),
    async (req, res) => {
        //do the signup validation logic 
        const { email, password } = req.body 
        //use cookie-based auth in our app by creating a user to represent each person
        const user = await usersRepo.create({ email, password })
        //store the user's id inside the users cookie via cookie-session
        req.session.userId = user.id

        res.redirect('/admin/products')
})


router.get('/logout', (req, res) => {
    req.session = null
    res.send('You are now logged out.')
})

router.get('/login', (req, res) => {
    res.send(loginTemplate({}))
})

router.post('/login', [
    requireValidEmail, requireValidPassword],
    handleErrors(loginTemplate),
    async (req, res) => {
        const { email} = req.body
        //use cookie-based auth in our app by creating a user to represent each person
        const user = await usersRepo.getOneBy({ email })
        //store the user's id inside the users cookie via cookie-session
        req.session.userId = user.id

        res.redirect('/admin/products')
    
})

module.exports = router;
