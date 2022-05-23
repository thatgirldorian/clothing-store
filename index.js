//require the necessary packages + database
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');


const app = express();

//make our body parser & cookie session packages reusable anywhere in our application
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ 
    keys: ['vhvhvvahgcvagcvka7767']
}))


const port = 3000


//layout the routes for the application
app.get('/signup', (req, res) => {
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

app.get('/login', (req, res) => {

})


app.post('/signup', async (req, res) => {
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


app.get('/signout', (req, res) => {
    req.session = null
    req.send('You are now logged out.')
})


//have the application listen to requests
app.listen(port, () => {
    console.log('listening...')
})