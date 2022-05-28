//require the expresss package
const express = require('express')
const multer  = require('multer')
const { handleErrors } = require('./middlewares')
const productsRepo = require('../../repositories/products')
const newProductTemplate = require('../../views/admin/products/new-product')
const allProductsTemplate = require('../../views/admin/products/products-index')
const { requireTitle, requirePrice } = require('./validators')



//create a new router for our products
const router = express.Router()
//add a middleware function that'll point to the storage for the image with Multer 
const upload = multer({ storage: multer.memoryStorage() })

//this route will list all the products that exist in the store
router.get('/admin/products', async (req, res) => {
    const products = await productsRepo.getAll()
    res.send(allProductsTemplate({ products}))
})

//this will show a form for creating a new product
router.get('/admin/products/new', (req, res) => {
    res.send(newProductTemplate({}))
})

//this will deal with form submission
router.post('/admin/products/new', upload.single('image'), [requireTitle, requirePrice], 
    handleErrors(newProductTemplate),
    async (req, res) => {

        const image = req.file.buffer.toString('base64')
        const { title, price } = req.body
        await productsRepo.create({ title,price, image })
        
        res.send('Product added successfully!')
})



module.exports = router
