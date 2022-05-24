//require important files
const express = require('express')
const usersRepo = require('../../repositories/users')

//create a sub-router
const router = express.Router()

//layout the routes for the application
router.get('/signup', (req, res) => {
    res.send(`
            <div>
            Your ID is ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="Your email" />
                <input name="password" placeholder="A password" />
                <input name="confirmPassword" placeholder="Confirm password" />
                <button>Sign up</button>
            </form>
        </div>
    `)
})


router.post('/signup', async (req, res) => {
    //do the signup validation logic 
    const { email, password, confirmPassword } = req.body 

    //check if someone has signed already signed up with a given email
    const existingUser = await usersRepo.getOneBy({ email })
    if (existingUser) {
        return res.send(`Error: Already signed up with ${email}.`)
    }

    //check if passwords match 
    if (password !== confirmPassword) {
        return res.send(`Error: Passwords must match.`)
    }

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
    res.send(`
    <div>
    You're now signed in and your ID is ${req.session.userId}.
    <form method="POST">
        <input name="email" placeholder="Your email" />
        <input name="password" placeholder="A password" />
        <button>Log in</button>
    </form>
</div>
    `)
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
