//require the fs module
const fs = require('fs')

//create a class that'll allow us store user data
class usersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error("Sorry! You have to provide a filename.");
        }

        
        this.filename = filename;
        //check to see if a file exists
        try {
            fs.accessSync(this.filename)
        } catch (error) {
            //create file it it doesn't exist
            fs.writeFileSync(this.filename, '[]')

        }
    }

    //implement methods for database usage
    async getAll() {
        //open the file called this.filename
        const contents = await fs.promises.readFile(this.filename, { encoding: 'utf8'})

        //Read the contents of the file
        fsPromise = fs.open(this.filename)
        //Parse the contents

        //Return the parsed data 

    }

}

const repo = new usersRepository('users.json')
