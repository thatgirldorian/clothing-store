//require the expresss package
const express = require('express')
const multer  = require('multer')
const { handleErrors, requireAuth } = require('./middlewares')
const productsRepo = require('../../repositories/products')
const newProductTemplate = require('../../views/admin/products/new-product')
const allProductsTemplate = require('../../views/admin/products/products-index')
const editProductTemplate = require('../../views/admin/products/edit-product')
const { requireTitle, requirePrice } = require('./validators')


//create a new router for our products
const router = express.Router()
//add a middleware function that'll point to the storage for the image with Multer 
const upload = multer({ storage: multer.memoryStorage() })

//this route will list all the products
router.get('/admin/products', requireAuth, async (req, res) => {

    const products = await productsRepo.getAll()
    res.send(allProductsTemplate({products}))
})

//this will show a form for creating a new product
router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(newProductTemplate({}))
})

//this will deal with form submission
router.post('/admin/products/new', requireAuth, upload.single('image'), 
    [requireTitle, requirePrice], 
    handleErrors(newProductTemplate),
    async (req, res) => {

        const image = req.file.buffer.toString('base64')
        const { title, price } = req.body
        await productsRepo.create({ title,price, image })
        
        res.send('Product added successfully!')
})

//this route will get a specific product by ID
router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    const product = await productsRepo.getOne(req.params.id)

    //error handling for when a product does not exist
    if (!product) {
        return res.send('Product not found')
    }

    //render a product when found
    res.send(editProductTemplate({product}))
})

//this route will post an updated product
router.post('/admin/products/:id/edit', requireAuth, async (req, res) => {
    
})



module.exports = router
