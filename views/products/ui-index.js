// const layout = require('./admin/layout');

//show all our products for sale
module.exports = ({ products }) => {
    const renderedProducts = products.map(product => {
        return `
            <li>${product.title} - ${product.price}</li>
        `
    }).join('');

    return `
        <ul>
            ${renderedProducts}
        </ul>
    `
}

