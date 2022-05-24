//create a function that handles HTML template creation
module.exports = ({ req }) => {
    return  `
    <div>
    Your ID is ${req.session.userId}
    <form method="POST">
        <input name="email" placeholder="Your email" />
        <input name="password" placeholder="A password" />
        <input name="confirmPassword" placeholder="Confirm password" />
        <button>Sign up</button>
    </form>
    </div>
    `
}