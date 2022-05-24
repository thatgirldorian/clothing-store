module.exports = ({ req }) => { 
    return `
        <div>
        You're now logged in and your ID is ${req.session.userId}.
        <form method="POST">
            <input name="email" placeholder="Your email" />
            <input name="password" placeholder="A password" />
            <button>Log in</button>
        </form>
    </div>
    `
}