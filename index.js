//require the necessary packages + database
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const req = require('express/lib/request');
const authRouter = require('./routes/admin/auth');


const app = express();

//make our body parser & cookie session packages reusable anywhere in our application
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ 
    keys: ['vhvhvvahgcvagcvka7767']
}))
app.use(authRouter)
//use the sub-router we created above


//have the application listen to requests
app.listen(3000, () => {
    console.log('listening...')
})