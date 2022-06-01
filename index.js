//require the necessary packages + database
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products-routes');
const productsUIRouter = require('./routes/products-ui')
const cartsRouter = require('./routes/carts-routes')

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
app.use(productsUIRouter)
app.use(cartsRouter)
//use the sub-routers we created above


//have the application listen to requests
app.listen(process.env.PORT || 3000), () => {
    console.log('listening...')
}

