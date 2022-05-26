const layout = require('../layout');

//add a function to get errors from validation
const getError = (errors, prop) => {
    try {
        return errors.mapped()[prop].msg
    } catch (err) {
        return ''
}
}
    //prop hee === "email" or password or ps confirmation error

//create a function that handles HTML template creation
module.exports = ({ req, errors }) => {
    return layout({ 
        content: `
        <div>
            Your ID is ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="Your email" />
                ${getError(errors, "email")}
                <input name="password" placeholder="A password" />
                ${getError(errors, "password")}
                <input name="confirmPassword" placeholder="Confirm password" />
                ${getError(errors, "confirmPassword")}
                <button>Sign up</button>
            </form>
        </div>
    `})
}