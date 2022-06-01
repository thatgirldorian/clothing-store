//require all of our needed packages and modules
const express = require('express')
const productsRepo = require('../repositories/products')
const productsIndexTemplate = require('../views/products/index')

//create our router
const router = express.Router()

//this route will show all the products for the customer in the UI on our homepage
router.get('/', async (req, res) => {
    const products = await productsRepo.getAll()
    res.send(productsIndexTemplate({products}))
})

module.exports = router