//add a validator function to use throughout the application
const { validationResult } = require('express-validator')

module.exports = {
    handleErrors (templateFunction) { 
        //return a function that execute every time a request is made
        return (req, res, next) => {
            const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.send(templateFunction({ errors }))
                }

                //if we don't have any errors
                next()
            }
    },

    //add another middleware function to disallow non-users 
    requireAuth(req, res, next) {
        //disallow non-users from seeing this route 
    if (!req.session.userId) {
        return res.redirect('/login')
    }
    next()
    }
}