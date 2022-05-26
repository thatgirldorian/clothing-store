//require out layout for creating reusable content/templates
const layout = require('../layout');

//require helper function
const { getError } = require('../../helpers')

module.exports = ({ errors }) => { 
    return layout({ 
    content: `
            <div class="container">
            <div class="columns is-centered">
            <div class="column is-one-quarter">
                <form method="POST">
                <h1 class="title">Log in</h1>
                    <div class="field">
                    <label class="label">Email</label>
                        <p class="control has-icons-left has-icons-right">
                            <input required class="input" type="email" placeholder="Email">
                            <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                            </span>
                            
                        </p>
                        <p class="help is-danger">${getError(errors, 'email')}</p>
                        </div>
                        <div class="field">
                        <label class="label">Password</label>
                        <p class="control has-icons-left">
                            <input required class="input" type="password" placeholder="Password">
                            <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        <p class="help is-danger">${getError(errors, 'password')}</p>
                        </div>
                        <div class="field">
                        <p class="control">
                            <button class="button is-primary">
                            Login
                            </button>
                        </p>
                    </div>
                </form>
                <a href="/signup">Need an account? Sign Up</a>
            </div>
            </div>
        </div>
    `})
}



{/* <div class="container">
            <div class="columns is-centered">
            <div class="column is-one-quarter">
                <form method="POST">
                <h1 class="title">Log in</h1>
                <div class="field">
                    
                    <input required class="input" placeholder="Email" name="email" />
                    
                </div>
                <div class="field">
                    
                    <input required class="input" placeholder="Password" name="password" type="password" />
                    
                </div>
                <button class="button is-primary">Submit</button>
                </form>
                <a href="/signup">Need an account? Sign Up</a>
            </div>
            </div>
        </div> */}