//require out layout for creating reusable content/templates
const layout = require('../layout');

module.exports = ({ req }) => { 
    return layout({ 
    content: `
    <div>
        You're now logged in and your ID is ${req.session.userId}.
        <form method="POST">
            <input name="email" placeholder="Your email" />
            <input name="password" placeholder="A password" />
            <button>Log in</button>
        </form>
    </div>  
    `})
}