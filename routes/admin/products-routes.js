//require the expresss package
const express = require('express')
const { validationResult } = require('express-validator')
const multer  = require('multer')
const productsRepo = require('../../repositories/products')
const newProductTemplate = require('../../views/admin/products/new-product')
const { requireTitle, requirePrice } = require('./validators')


//create a new router for our products
const router = express.Router()
//add a middleware function that'll point to the storage for the image with Multer 
const upload = multer({ storage: multer.memoryStorage() })

//this route will list all the products
router.get('/admin/products', (req, res) => {

})

//this will show a form for creating a new product
router.get('/admin/products/new', (req, res) => {
    res.send(newProductTemplate({}))
})

//this will deal with form submission
router.post('/admin/products/new', [requireTitle, requirePrice], upload.single('image'), (req, res) => {
    const errors = validationResult(req)
    
    console.log(req.file)
    
    res.send('Product added successfully!')
})



module.exports = router
