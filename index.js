//require the necessary packages
const express = require('express');
const bodyParser = require('body-parser');

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


app.post('/', (req, res) => {
    //use body-parser to parse and render form data
    console.log(req.body)
    res.send('Account created!')
})


//have the application listen to requests
app.listen(port, () => {
    console.log('listening...')
})