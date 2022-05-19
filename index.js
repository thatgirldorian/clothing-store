//require the necessary packages
const express = require('express');

const app = express();

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
    req.on('data', data => {
        //make the accepted data into an object
        const parsedInfo = data.toString('utf8').split('&')
        const formData = {}
        for (let pair of parsedInfo) {
            const [key, value] = pair.split('=')
            formData[key] = value
        }
        console.log(formData);
    })
    res.send('Account created!')
})

//have the application listen to requests
app.listen(port, () => {
    console.log('listening...')
})