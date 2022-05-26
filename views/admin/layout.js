module.exports = ({ content }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Oval - Online Clothing Store</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link href="/css/style.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css" integrity="sha512-HqxHUkJM0SYcbvxUw5P60SzdOTy/QVwA1JJrvaXJv4q7lmbDZCmZaqz01UPOaQveoxfYRv1tHozWGPMcuTBuvQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>

        <body class="admin">
            <header>
            <nav class="navbar navbar-bottom">
                <div class="container navbar-container">
                <div>
                    <a href="/admin/products">
                    <h3 class="title">Admin Panel</h3>
                    </a>
                </div>
                <div class="navbar-item">
                    <div class="navbar-buttons">
                    <div class="navbar-item">
                        <a href="/admin/products"><i class="fa fa-star"></i> Products</a>
                    </div>
                    </div>
                </div>
                </div>
            </nav>
            </header>
            <div class="container">
            ${content}
            </div>
        </body>
        </html>
    `
}

