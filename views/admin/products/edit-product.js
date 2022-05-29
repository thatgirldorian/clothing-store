const layout = require('../layout');

// const { getError } = require('../../helpers')

//create our form layout for new products
module.exports = ({ product }) => {
    return layout({ 
        content: `
            <h1>Edit Product</h1>
            <form method="post">
                <input name="title" value="${product.title}" />
                <input name="price" value="${product.price}" />
                <input name="image" type="file" />
                <button type="submit">Update</button>
            </form>
        `
    })

}