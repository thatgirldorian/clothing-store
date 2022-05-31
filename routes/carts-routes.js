//require all the necessary files and dependencies
const express = require('express')

const router = express.Router()

//this route will add a product to the cart via a post request
router.post('/cart/products', (req, res) => {
    //figure if we have to add a cart for a customer
    if (!req.session.cardId) {
        //no car
    }

    //increment existing item or add a new one

    res.send('Product added to cart!')
})

//this route will render the shopping cart and all the items in it via a get request
router.get('/cart', (req, res) => {

})

//this route will dd a delete button to the cart and remove items via a post request
router.post('/cart/delete', (req, res) => {

})

module.exports = router