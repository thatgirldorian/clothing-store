//require the necessary packages + database
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

//link our public files 
app.use(express.static('public'))

//make our body parser & cookie session packages reusable anywhere in our application
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ 
    keys: ['vhvhvvahgcvagcvka7767']
}))
app.use(authRouter)
app.use(productsRouter)
//use the sub-routers we created above


//have the application listen to requests
app.listen(3000, () => {
    console.log('listening...')
})