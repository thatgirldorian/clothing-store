//require the necessary packages
const express = require('express');

const app = express();
const port = 3000

//layout the routes for the application
app.get('/', (req, res) => {
    res.send(`
    <div>
    <form method="post" action='/'>
        <input name="email" placeholder="Your email">
        <input name="password" placeholder="A password">
        <input name="confirmPassword" placeholder="Confirm password">
        <button type="button">Sign up</button>
    </form>
</div>
    `)
})

app.post('/', (req, res) => {
    req.on('data', data => {
        console.log(data)
    })
    res.send('Account created!')
})

//have the application listen to requests
app.listen(port, () => {
    console.log('listening...')
})