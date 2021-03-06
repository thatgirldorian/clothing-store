//require our layout
const layout = require('../ui-layout')

module.exports = ({ items }) => {
    //render total price of products
    let totalPrice = 0;
    for (let item of items) {
        totalPrice += item.quantity * item.product.price
    }

    const renderedItems = items.map(item => {
        return `
            <div class="cart-item message">
            <h3 class="subtitle">${item.product.title}</h3>
            <div class="cart-right">
            <div>
                $${item.product.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
                $${item.product.price * item.quantity}
            </div>
            <div class="remove">
                <form method="POST" action="/cart/products/delete">
                    <input hidden value="${item.id}" name="itemId">
                    <button class="button remove-btn">                  
                        <span class="icon is-small">
                        <i class="fas fa-times"></i>
                        </span>
                    </button>
                </form>
            </div>
            </div>
        </div>
        `
    }).join('')

    return layout({ 
        content:`
            <div id="cart" class="container">
            <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
                <h3 class="subtitle"><b>Shopping Cart</b></h3>
                <div>
                ${renderedItems}
                </div>
                <div class="total message">
                    <div class="message-header">Total</div>
                    <h1 class="title total-price">$${totalPrice}</h1>
                    <button class="button buy-btn">Buy</button>
                </div>
            </div>
            <div class="column"></div>
            </div>
        </div>
        `
    })
}