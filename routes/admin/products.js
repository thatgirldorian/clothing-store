//require the expresss package
const express = require('express')


//create a new router for our products
const router = express.Router()

//this route will list all the products
router.get('admin/products', (req, res) => {

})

//this will show a form for creating a new product
router.post('admin/products/news', (req, res) => {

})

module.exports = router
