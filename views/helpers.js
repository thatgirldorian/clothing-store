module.exports = {
    //add a function to get errors from validation
        getError(errors, prop) {
        try {
            return errors.mapped()[prop].msg
        } catch (err) {
            return ''
        }
    }
    //prop here === "email" or password or ps confirmation error
}