//require all the necessary files and dependencies
const express = require('express')
const cartsRepo = require('../repositories/carts')

const router = express.Router()

//this route will add a product to the cart via a post request
router.post('/cart/products', async(req, res) => {
    //figure if we have to add a cart for a customer

    let cart
    if (!req.session.cartId) {
        //no cart?
        cart = await cartsRepo.create({ items: [] })
        req.session.cartId = cart.id

    } else {
        //a cart is available, get it from the cart repository
        cart = await cartsRepo.getOne(req.session.cartId)
    }
    //increment existing item or add a new one to the items array
    const existingItem = cart.items.find(item => item.id === req.body.productId)
    if (existingItem) {
        existingItem.quantity++
    } else {
        cart.items.push({ id: req.body.productId, quantity: 1})
    }

    //update the customer's cart
    await cartsRepo.update(cart.id, {
        items: cart.items
    })

    res.send('Product added to cart!')
})

//this route will render the shopping cart and all the items in it via a get request
router.get('/cart', (req, res) => {

})

//this route will dd a delete button to the cart and remove items via a post request
router.post('/cart/delete', (req, res) => {

})

module.exports = router