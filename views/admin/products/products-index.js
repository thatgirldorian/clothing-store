const layout = require('../layout');

//pass an array of all the products we have
module.exports = ({ products }) => {
    const renderedProducts = products.map((product) => {
        return `
            <div>${product.title}</div>
        `
    }).join("")

    return layout({
        content: `
            <h1 class="title">Products</h1>
            ${renderedProducts}
        `
    })
}