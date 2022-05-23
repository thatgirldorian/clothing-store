//require the necessary packages + database
const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();

//make our body parser reusable anywhere in our application
app.use(bodyParser.urlencoded({ extended: true }))


const port = 3000


//layout the routes for the application
app.get('/', (req, res) => {
    res.send(`
            <div>
            <form method="POST">
                <input name="email" placeholder="Your email" />
                <input name="password" placeholder="A password" />
                <input name="confirmPassword" placeholder="Confirm password" />
                <button>Sign up</button>
            </form>
        </div>
    `)
})


app.post('/', async (req, res) => {
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

    res.send('Account created!')
})


//have the application listen to requests
app.listen(port, () => {
    console.log('listening...')
})