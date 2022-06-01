//require all the necessary files and dependencies
const express = require('express')
const cartsRepo = require('../repositories/carts')
const productsRepo = require('../repositories/products')
const showCartTemplate = require('../views/carts/show-cart')

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

    res.redirect('/cart')
})

//this route will render the shopping cart and all the items in it via a get request
router.get('/cart', async(req, res) => {
    //redirect user when they don't have a cart
    if (!req.session.cartId) {
        return res.redirect('/')
    }

    //if they do have a cart, display it
    const cart = await cartsRepo.getOne(req.session.cartId)

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id)

        item.product = product
    }

    res.send(showCartTemplate({ items: cart.items}))
})

//this route will add a delete button to the cart and remove items via a post request
router.post('/cart/products/delete', async(req, res) => {
    const { itemId } = req.body
    const cart = await cartsRepo.getOne(req.session.cartId)

    const items = cart.items.filter( item => item.id !== itemId)

    await cartsRepo.update(req.session.cartId, { items })

    res.redirect('/cart')
})

module.exports = router