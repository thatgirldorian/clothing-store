//require the Repository class 
const Repository = require('./repository')

class productsRepository extends Repository {
    
}

//create an instance of a repository
module.exports = new productsRepository('products.json')