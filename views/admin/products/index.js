const layout = require('../layout');

//pass an array of all the products we have
module.exports = ({ products }) => {
    const renderedProducts = products.map(product => {
        return `
            <tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>
            <a href="/admin/products/${product.id}/edit">
                <button class="button is-link">
                Edit
                </button>
            </a>
            </td>
            <td>
                <form method="post" action="/admin/products/${product.id}/delete">
                    <button class="button is-danger">Delete</button>
                </form>
            </td>
        </tr>
        `
    }).join('')

    return layout({
        content: `
            <div class="control">
            <h1 class="subtitle">Products</h1>  
            <a href="/admin/products/new" class="button new-product">New Product</a>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            ${renderedProducts}
            </tbody>
        </table>
        `
    })
}