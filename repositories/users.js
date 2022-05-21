//require the fs module
// const { use } = require('express/lib/application');
// const fs = require('fs')
const crypto = require('crypto')

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
        } catch (err) {
            //create file it it doesn't exist
            fs.writeFileSync(this.filename, '[]')
        }
    }

    //this method gets a list of all users
    async getAll() {
        //open the file called this.filename and read its contents and return the parsed data
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8'}))
    }

    //this method creates a new set of user records
    async create(attributes) {
        attributes.id = this.randomId()
        //load the content of the file
        const records = await this.getAll();
        records.push(attributes)

        //add the updated records to our records array
        await this.writeAll(records)
    }

    //this method writes/saves all users to the users.json file
    async writeAll(records) {
        await fs.promises.writeFile(this.filename,
            JSON.stringify(records, null, 2))
    }

    //this method generates a random identifier
    randomId() {
        return crypto.randomBytes(5).toString('hex')
}

const test = async () => {
    const repo = new usersRepository('users.json')

    //quick test with the create method
    await repo.create({ email: 'heyya@gmail.com', password: 'asgdvydva'})

    const users = await repo.getAll()

    console.log(users)
}

test()