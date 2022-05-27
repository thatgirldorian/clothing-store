const layout = require('../layout');

const { getError } = require('../../helpers')

//create our form layout for new products
module.exports = ({ errors }) => {
    return layout({ 
        content: `
            <form>
                <input placeholder="Title" name="" />
                <input placeholder="Price" name="" />
                <input type="file" name="image" />
            </form>
        
        `
    })

}